// ---- CURSOR ----
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursor-glow');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let glowX = 0, glowY = 0;

const discoColors = [
  '#7f5af0','#2cb67d','#ff6b6b','#ffd166','#00c9ff',
  '#ff79c6','#bd93f9','#50fa7b','#ffb86c','#8be9fd'
];

let colorIndex = 0;
let particleCount = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';

  // Spawn trail
  if (particleCount % 3 === 0) {
    spawnTrail(mouseX, mouseY);
  }
  particleCount++;
});

function lerp(a, b, t) { return a + (b - a) * t; }

function animate() {
  ringX = lerp(ringX, mouseX, 0.12);
  ringY = lerp(ringY, mouseY, 0.12);
  glowX = lerp(glowX, mouseX, 0.06);
  glowY = lerp(glowY, mouseY, 0.06);

  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  glow.style.left = glowX + 'px';
  glow.style.top = glowY + 'px';

  requestAnimationFrame(animate);
}
animate();

// Disco color cycling
setInterval(() => {
  colorIndex = (colorIndex + 1) % discoColors.length;
  const c = discoColors[colorIndex];
  ring.style.borderColor = c;
  glow.style.background = `radial-gradient(circle, ${c}30 0%, ${discoColors[(colorIndex+2)%discoColors.length]}18 35%, transparent 70%)`;
}, 200);

// Spawn trail particles
function spawnTrail(x, y) {
  const el = document.createElement('div');
  el.classList.add('trail');
  const size = Math.random() * 8 + 4;
  const color = discoColors[Math.floor(Math.random() * discoColors.length)];
  el.style.cssText = `
    left: ${x}px; top: ${y}px;
    width: ${size}px; height: ${size}px;
    background: ${color};
    opacity: 0.5;
    filter: blur(${size/2}px);
    box-shadow: 0 0 ${size*2}px ${color};
    transform: translate(-50%,-50%);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 500);
}

// Particle burst on click
document.addEventListener('click', (e) => {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.classList.add('disco-particle');
    const angle = (i / 12) * Math.PI * 2;
    const dist = 60 + Math.random() * 60;
    const tx = Math.cos(angle) * dist + 'px';
    const ty = Math.sin(angle) * dist + 'px';
    const size = Math.random() * 8 + 4;
    const color = discoColors[Math.floor(Math.random() * discoColors.length)];
    p.style.cssText = `
      left: ${e.clientX}px; top: ${e.clientY}px;
      width: ${size}px; height: ${size}px;
      background: ${color};
      box-shadow: 0 0 ${size*2}px ${color};
      transform: translate(-50%,-50%);
      --tx: ${tx}; --ty: ${ty};
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
});

// Hover effects
document.querySelectorAll('a, button, .skill-card, .looking-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width = '16px';
    dot.style.height = '16px';
    ring.style.width = '60px';
    ring.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width = '10px';
    dot.style.height = '10px';
    ring.style.width = '40px';
    ring.style.height = '40px';
  });
});
