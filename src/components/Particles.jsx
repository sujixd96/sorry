import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.6 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.5 + 0.1;
        this.fadeIn = true;
        // Color: violet or rose-gold
        const colors = [
          `rgba(124,58,237,`,
          `rgba(201,149,108,`,
          `rgba(232,180,160,`,
          `rgba(99,102,241,`,
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.fadeIn && this.opacity < this.maxOpacity) {
          this.opacity += 0.005;
        }
        if (this.y < canvas.height * 0.2) {
          this.opacity -= 0.008;
        }
        if (this.y < -10 || this.opacity <= 0) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.shadowColor = this.color + "0.8)";
        ctx.shadowBlur = 6;
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Init particles
    for (let i = 0; i < 80; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height; // spread initially
      p.opacity = Math.random() * p.maxOpacity;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
