<script>
	import { onMount } from 'svelte';

	let canvas;

	const colors = ['#4454a4', '#5a6bc0', '#3da0da'];
	const particleCount = 80;
	const connectionDistance = 150;
	const mouseInfluence = 100;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		const hero = canvas.parentElement;
		const mouse = { x: null, y: null, radius: 150 };
		let particles = [];
		let raf;

		function resize() {
			canvas.width = hero.offsetWidth;
			canvas.height = hero.offsetHeight;
			particles = Array.from({ length: particleCount }, () => ({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				radius: Math.random() * 3 + 2,
				color: colors[Math.floor(Math.random() * colors.length)]
			}));
		}

		function line(x1, y1, x2, y2, color, alpha) {
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.strokeStyle = color;
			ctx.globalAlpha = alpha;
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.globalAlpha = 1;
		}

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
					if (d < connectionDistance) {
						line(particles[i].x, particles[i].y, particles[j].x, particles[j].y, '#4454a4', (1 - d / connectionDistance) * 0.3);
					}
				}
			}

			if (mouse.x !== null) {
				for (const p of particles) {
					const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
					if (d < mouse.radius) line(p.x, p.y, mouse.x, mouse.y, '#3da0da', (1 - d / mouse.radius) * 0.5);
				}
			}

			for (const p of particles) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = p.color;
				ctx.globalAlpha = 0.8;
				ctx.fill();
				ctx.globalAlpha = 1;
			}
		}

		function update() {
			for (const p of particles) {
				if (mouse.x !== null) {
					const dx = p.x - mouse.x;
					const dy = p.y - mouse.y;
					const d = Math.hypot(dx, dy);
					if (d < mouseInfluence) {
						const force = (mouseInfluence - d) / mouseInfluence;
						const angle = Math.atan2(dy, dx);
						p.x += Math.cos(angle) * force * 2;
						p.y += Math.sin(angle) * force * 2;
					}
				}

				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
				if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
				p.x = Math.max(0, Math.min(canvas.width, p.x));
				p.y = Math.max(0, Math.min(canvas.height, p.y));
			}
		}

		function animate() {
			draw();
			update();
			raf = requestAnimationFrame(animate);
		}

		function onMove(e) {
			const rect = hero.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		}

		function onLeave() {
			mouse.x = mouse.y = null;
		}

		hero.addEventListener('mousemove', onMove);
		hero.addEventListener('mouseleave', onLeave);
		window.addEventListener('resize', resize);

		resize();
		// reduced motion: one still frame instead of the animation loop
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
		else animate();

		return () => {
			cancelAnimationFrame(raf);
			hero.removeEventListener('mousemove', onMove);
			hero.removeEventListener('mouseleave', onLeave);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas} class="hero-background"></canvas>
