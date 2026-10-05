import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type CrowdCanvasProps = {
  src: string;
  rows?: number;
  cols?: number;
};

type Peep = {
  rect: [number, number, number, number];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk?: gsap.core.Timeline;
};

export default function CrowdCanvas({ src, rows = 15, cols = 7 }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const image = new Image();
    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pixelRatio = 1;
    let isDisposed = false;

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      crowd.forEach((peep) => {
        ctx.save();
        ctx.translate(peep.x, peep.y);
        ctx.scale(peep.scaleX, 1);
        ctx.drawImage(image, ...peep.rect, 0, 0, peep.width, peep.height);
        ctx.restore();
      });
      ctx.restore();
    };

    const createPeep = (index: number): Peep => {
      const width = image.naturalWidth / rows;
      const height = image.naturalHeight / cols;
      return {
        rect: [(index % rows) * width, Math.floor(index / rows) * height, width, height],
        width,
        height,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
      };
    };

    const addPeep = () => {
      if (!availablePeeps.length || isDisposed) return;
      const index = Math.floor(Math.random() * availablePeeps.length);
      const peep = availablePeeps.splice(index, 1)[0];
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      const startX = direction === 1 ? -peep.width : stage.width + peep.width;
      const endX = direction === 1 ? stage.width : 0;
      const duration = randomRange(8, 14);

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      peep.scaleX = direction;
      crowd.push(peep);
      crowd.sort((first, second) => first.anchorY - second.anchorY);

      peep.walk = gsap.timeline({
        onComplete: () => {
          const crowdIndex = crowd.indexOf(peep);
          if (crowdIndex !== -1) crowd.splice(crowdIndex, 1);
          availablePeeps.push(peep);
          addPeep();
        },
      });
      peep.walk.to(peep, { x: endX, duration, ease: "none" });
      peep.walk.to(
        peep,
        { y: startY - 10, duration: 0.25, repeat: duration / 0.25, yoyo: true },
        0,
      );
    };

    const resize = () => {
      if (isDisposed || !image.complete || !image.naturalWidth) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(stage.width * pixelRatio);
      canvas.height = Math.round(stage.height * pixelRatio);

      crowd.forEach((peep) => peep.walk?.kill());
      crowd.length = 0;
      availablePeeps.splice(0, availablePeeps.length, ...allPeeps);

      if (reduceMotion) {
        allPeeps.forEach((peep, index) => {
          peep.x = (index % rows) * (stage.width / rows);
          peep.y = stage.height - peep.height;
          peep.scaleX = 1;
          crowd.push(peep);
        });
        render();
        return;
      }

      while (availablePeeps.length) addPeep();
    };

    const handleLoad = () => {
      if (isDisposed) return;
      for (let index = 0; index < rows * cols; index += 1) {
        allPeeps.push(createPeep(index));
      }
      resize();
      if (!reduceMotion) gsap.ticker.add(render);
    };

    image.addEventListener("load", handleLoad);
    image.src = src;
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      isDisposed = true;
      image.removeEventListener("load", handleLoad);
      resizeObserver.disconnect();
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
    };
  }, [cols, rows, src]);

  return <canvas ref={canvasRef} className="crowd-canvas" aria-hidden="true" />;
}