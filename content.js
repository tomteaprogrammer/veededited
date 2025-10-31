// content.js

// VEED transitions container you mentioned
const TRANSITIONS_CONTAINER_SEL =
  '#\\@edit-container > div > div.sc-cYrCKJ.jgwPRz > div.sc-bkgRFv.ekAvJL > div > div > div > div > div > div.sc-jhVUyh.gshlFH';

// names we want to block
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

function removeBlockedInRoot(root = document) {
  const cards = root.querySelectorAll('.sc-ceplVk');
  cards.forEach(card => {
    const label = card.querySelector('.sc-jIpqle, span');
    if (!label) return;
    const text = label.textContent.trim();
    if (BLOCKED_NAMES.includes(text)) {
      card.remove();
    }
  });
}

function removeBlockedGlobal() {
  removeBlockedInRoot(document);
}

function removeBlockedInContainer() {
  const container = document.querySelector(TRANSITIONS_CONTAINER_SEL);
  if (!container) return;

  removeBlockedInRoot(container);

  const second = container.querySelector(':scope > div:nth-child(2)');
  if (second) removeBlockedInRoot(second);
}

function runAll() {
  removeBlockedGlobal();
  removeBlockedInContainer();
}

// run once
runAll();

// watch for re-renders
new MutationObserver(runAll).observe(document.body, {
  childList: true,
  subtree: true
});
