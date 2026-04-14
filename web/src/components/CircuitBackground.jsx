import React, { useEffect, useRef } from 'react';

const CircuitBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width = canvas.width = window.innerWidth;
        // make sure it covers the whole screen height even if resized
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        const gridSize = 40; // Spacing of the circuit grid
        const lines = [];
        const maxLines = 18; // Amount of simultaneous data streams

        class Line {
            constructor() {
                this.reset();
                this.life = Math.random() * this.maxLife; // random start phase
            }

            reset() {
                // snap to grid intersection
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
                
                // initial direction
                const dirs = [
                    { vx: 1, vy: 0 }, { vx: -1, vy: 0 },
                    { vx: 0, vy: 1 }, { vx: 0, vy: -1 }
                ];
                const dir = dirs[Math.floor(Math.random() * dirs.length)];
                this.vx = dir.vx;
                this.vy = dir.vy;
                
                this.history = [{x: this.x, y: this.y}];
                this.maxLength = Math.floor(Math.random() * 12) + 6; // slightly longer tail for lux look
                this.speed = 0.6; // much slower, cinematic speed
                this.progress = 0; // pixels moved towards next grid node
                this.life = 0;
                this.maxLife = Math.random() * 350 + 200;
                
                // Colors: SIGIL green or Gold
                const isGreen = Math.random() > 0.3;
                this.baseColor = isGreen ? '74, 140, 106' : '212, 168, 75';
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= gridSize) {
                    this.progress = 0;
                    this.x += this.vx * gridSize;
                    this.y += this.vy * gridSize;
                    this.history.push({x: this.x, y: this.y});
                    
                    if (this.history.length > this.maxLength) {
                        this.history.shift();
                    }

                    // 90 degree turn logic at grid intersections (30% chance to turn)
                    if (Math.random() < 0.3) {
                        if (this.vx !== 0) {
                            this.vy = Math.random() < 0.5 ? 1 : -1;
                            this.vx = 0;
                        } else {
                            this.vx = Math.random() < 0.5 ? 1 : -1;
                            this.vy = 0;
                        }
                    }
                }

                this.life++;
                if (this.life > this.maxLife || 
                    this.x < -gridSize || this.x > width + gridSize || 
                    this.y < -gridSize || this.y > height + gridSize) {
                    this.reset();
                }
            }

            draw(ctx) {
                if (this.history.length < 1) return;
                
                // Calculate fade based on life
                let alpha = 1;
                const fadeMargin = 40;
                if (this.life < fadeMargin) {
                    alpha = this.life / fadeMargin;
                } else if (this.life > this.maxLife - fadeMargin) {
                    alpha = (this.maxLife - this.life) / fadeMargin;
                }
                
                const trailAlpha = alpha * 0.45; // dimmer trail
                const dotAlpha = alpha * 0.95;   // brighter head

                // Draw trail
                ctx.beginPath();
                ctx.moveTo(this.history[0].x, this.history[0].y);
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                
                const headX = this.x + this.vx * this.progress;
                const headY = this.y + this.vy * this.progress;
                ctx.lineTo(headX, headY);

                ctx.strokeStyle = `rgba(${this.baseColor}, ${trailAlpha})`;
                ctx.lineWidth = 1.8;
                ctx.stroke();

                // Draw glowing head/data packet
                ctx.beginPath();
                ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.baseColor}, ${dotAlpha})`;
                ctx.fill();
                
                // Pure premium soft radial glow for the head
                const glowGradient = ctx.createRadialGradient(headX, headY, 0, headX, headY, 18);
                glowGradient.addColorStop(0, `rgba(${this.baseColor}, ${dotAlpha * 0.5})`);
                glowGradient.addColorStop(1, `rgba(${this.baseColor}, 0)`);
                ctx.beginPath();
                ctx.arc(headX, headY, 18, 0, Math.PI * 2);
                ctx.fillStyle = glowGradient;
                ctx.fill();
            }
        }

        // Initialize lines
        for (let i = 0; i < maxLines; i++) {
            lines.push(new Line());
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            lines.forEach(line => {
                line.update();
                line.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-[2] opacity-80 mix-blend-screen pointer-events-none"
        />
    );
};

export default CircuitBackground;
