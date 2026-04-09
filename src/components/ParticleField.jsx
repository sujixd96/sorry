import { useEffect, useRef } from "react";

export default function ParticleField() {
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
        this.y = canvas.height + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.5 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        // Color: violet or rose
        this.hue = Math.random() > 0.5 ? "139, 92, 246" : "244, 63, 94";
      }

      update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        this.life++;

        if (this.life < 50) {
          this.opacity = (this.life / 50) * this.maxOpacity;
        } else if (this.life > this.maxLife - 50) {
          this.opacity = ((this.maxLife - this.life) / 50) * this.maxOpacity;
        } else {
          this.opacity = this.maxOpacity;
        }

        if (this.life >= this.maxLife || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.hue}, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.hue}, 0.8)`;
        ctx.fill();
      }
    }

    // Init particles
    for (let i = 0; i < 60; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height; // Spread initially
      p.life = Math.random() * p.maxLife;
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
      style={{ opacity: 0.7 }}
    />
  );
}
