const counters = [...document.querySelectorAll('.k-value')];

function runCounters() {
  counters.forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const start = performance.now();
    const duration = 1300;

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString() + '+';
      if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

const path = document.getElementById('track');
const pills = [...document.querySelectorAll('.pill')];
const QA_SPLIT = 0.49;

function stylePill(pill, pos) {
  // Before human verification -> risky packets (red)
  if (!isOk) {
    pill.setAttribute('fill', '#ff7f9a');
    pill.style.filter = 'drop-shadow(0 0 10px rgba(255, 98, 142, 0.95))';
    return;
  }

  // After verification -> packet turns green once it passes QA checkpoint
  if (pos >= QA_SPLIT) {
    pill.setAttribute('fill', '#71efbe');
    pill.style.filter = 'drop-shadow(0 0 10px rgba(113, 239, 190, 0.95))';
  } else {
    pill.setAttribute('fill', '#8ec8ff');
    pill.style.filter = 'drop-shadow(0 0 8px rgba(112, 195, 255, 0.8))';
  }
}

function animatePills() {
  if (!path || !pills.length) return;
  const total = path.getTotalLength();

  function frame(ms) {
    const t = ms * 0.00006;
    pills.forEach((pill, i) => {
      const pos = (t + i * 0.24) % 1;
      const point = path.getPointAtLength(pos * total);
      pill.setAttribute('x', (point.x - 9).toFixed(1));
      pill.setAttribute('y', (point.y - 5).toFixed(1));
      stylePill(pill, pos);
    });
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const flagText = document.getElementById('flagText');
const flagBadge = document.querySelector('.flag-badge');
let isOk = false;

function toggleFlag() {
  isOk = !isOk;
  if (isOk) {
    flagText.textContent = '✓ Fixed';
    flagText.setAttribute('fill', '#d8ffea');
    flagBadge.setAttribute('fill', 'rgba(86, 211, 155, 0.2)');
    flagBadge.setAttribute('stroke', 'rgba(86, 211, 155, 0.56)');
  } else {
    flagText.textContent = '⚠ Flag';
    flagText.setAttribute('fill', '#ffd9de');
    flagBadge.setAttribute('fill', 'rgba(255, 111, 131, 0.17)');
    flagBadge.setAttribute('stroke', 'rgba(255, 111, 131, 0.55)');
  }
}

runCounters();
animatePills();
setInterval(toggleFlag, 3200);
