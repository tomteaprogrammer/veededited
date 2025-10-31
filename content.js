// content.js

// VEED transitions container
const TRANSITIONS_CONTAINER_SEL =
  '#\\@edit-container > div > div.sc-cYrCKJ.jgwPRz > div.sc-bkgRFv.ekAvJL > div > div > div > div > div > div.sc-jhVUyh.gshlFH';

// transition names to hide
const BLOCKED_NAMES = [
  'Blast',
  'Zoom In & Out',
  'Rotate and Pull Out',
  'Re-arrange',
  'Build',
  'Paper',
  'Fly',
  'Orbit',
  'Track Slowly',
  'Dissolve',
  'Fade to Black',
  'Fade to White',
  'Gradient Fade',
  'Zoom In',
  'Cross Warp'
];

// add a CSS rule once
(function addStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .veed-hide-transition {
      display: none !important;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
})();

function hideBlockedInRoot(root = document) {
  const cards = root.querySelectorAll('.sc-ceplVk');
  cards.forEach(card => {
    const label = card.querySelector('.sc-jIpqle, span');
    if (!label) return;
    const text = label.textContent.trim();
    if (BLOCKED_NAMES.includes(text)) {
      // instead of remove(), just add a class
      card.classList.add('veed-hide-transition');
    }
  });
}

function runOnce() {
  hideBlockedInRoot(document);
  const container = document.querySelector(TRANSITIONS_CONTAINER_SEL);
  if (container) hideBlockedInRoot(container);
}

// initial pass
runOnce();

// observe only the transitions area if we can
const target = document.querySelector(TRANSITIONS_CONTAINER_SEL) || document.body;

new MutationObserver(muts => {
  // only do work when new nodes are added
  if (muts.some(m => m.addedNodes && m.addedNodes.length)) {
    runOnce();
  }
}).observe(target, {
  childList: true,
  subtree: true
});
