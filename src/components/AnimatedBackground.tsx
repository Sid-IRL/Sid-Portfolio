import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulseOffset: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.opacity = 0.1 + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 45, 45, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 45, 45, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawGlowOrbs = (ctx: CanvasRenderingContext2D, time: number) => {
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 200 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 250 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, size: 180 },
      ];

      orbs.forEach((orb, i) => {
        const pulse = Math.sin(time * 0.001 + i) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size * pulse
        );
        gradient.addColorStop(0, 'rgba(255, 45, 45, 0.1)');
        gradient.addColorStop(0.5, 'rgba(212, 0, 0, 0.05)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    const animate = () => {
      time++;
      ctx.fillStyle = 'rgba(10, 8, 8, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGlowOrbs(ctx, time);

      particles.forEach(particle => {
        particle.update(time);
        particle.draw(ctx);
      });

      drawConnections(ctx);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, hsl(0 15% 6%) 0%, hsl(0 10% 4%) 100%)' }}
      />
      <div className="noise-overlay" />
    </>
  );
};

export default AnimatedBackground;
