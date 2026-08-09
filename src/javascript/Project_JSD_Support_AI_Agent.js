const mockupMessages = document.querySelectorAll('.mockup-message');
let mockupIndex = 0;

function animateMockupMessages() {
  mockupMessages.forEach((msg, idx) => {
    setTimeout(() => {
      msg.classList.add('visible');
    }, idx * 300 + 200);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (mockupMessages.length) {
    animateMockupMessages();
  }
});
