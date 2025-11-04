// content.js

// 1) Hide everything in the transitions grid immediately (no flash).
(function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* Container you provided */
    #\\@edit-container .sc-fkWdzS.fSNRyQ > .sc-hcxbON { display: none !important; }
    /* Re-show allowlisted tiles */
    #\\@edit-container .sc-fkWdzS.fSNRyQ > .veed-keep { display: block !important; }
  `;
  (document.head || document.documentElement).appendChild(style);
})();

// Allowlist by visible label
const ALLOW = new Set(['none', 'push right']);

const norm = s => (s || '')
  .toLowerCase()
  .replace(/\u00a0/g, ' ')
  .replace(/[’‘']/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

/** Find the overall tile element for any descendant node */
function findTile(el) {
  // usual card wrapper
  let t = el.closest('.sc-hcxbON');
  if (t) return t;

  // fallback: climb from the drag wrapper to its tile
  const w = el.closest('[data-testid="@dragAndDrop/wrapper"], [id^="dragWrapper-"]');
  if (w) {
    t = w.closest('.sc-hcxbON') || w.parentElement;
  }
  return t || null;
}

/** Re-show allowlisted tiles; keep others hidden */
function applyAllowlist() {
  const container =
    document.querySelector('#\\@edit-container .sc-fkWdzS.fSNRyQ');

  if (!container) return;

  // scan labels inside the grid
  container.querySelectorAll('span.sc-hCxA-dw, .sc-hCxA-dw span, .sc-hCxA-dw').forEach(label => {
    const text = norm(label.textContent);
    const tile = findTile(label);
    if (!tile) return;

    if (ALLOW.has(text)) {
      tile.classList.add('veed-keep');
      tile.style.display = ''; // safety
    } else {
      tile.classList.remove('veed-keep');
    }
  });
}

function init() {
  applyAllowlist();

  // observe the grid only; debounce with rAF
  const grid = document.querySelector('#\\@edit-container .sc-fkWdzS.fSNRyQ') || document.documentElement;

  let raf = null;
  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; applyAllowlist(); });
  };

  new MutationObserver(muts => {
    if (muts.some(m => m.addedNodes && m.addedNodes.length)) schedule();
  }).observe(grid, { childList: true, subtree: true });

  // virtualized list support
  grid.addEventListener('scroll', schedule, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
