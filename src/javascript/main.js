// Auto-scroll keywords
const keywords = ['clear','friendly','minimal','playful','organized','thoughtful'];
const scrollEl = document.querySelector('.scroll-keywords');
let index = 0;
function scrollKeyword(){
  if (!scrollEl) return;
  scrollEl.textContent = keywords[index];
  index = (index + 1) % keywords.length;
}
if (scrollEl) {
  scrollKeyword();
  setInterval(scrollKeyword, 1500);
}

// Floating words on hero name hover
const popWords = ['おはよう','元気？','haluu~','awesome','✨Nice✨','こんにちは','good vibes','hello!'];
function createFloatingWord(el){
  for(let i = 0; i < 6; i++){
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = 'floating-word';
      span.textContent = popWords[Math.floor(Math.random() * popWords.length)];
      span.style.left = (Math.random() * 80 - 40) + '%';
      el.appendChild(span);
      setTimeout(() => { if (el.contains(span)) el.removeChild(span); }, 1200);
    }, i * 400);
  }
}

const heroHover = document.querySelector('.hero-hover');
if (heroHover) {
  heroHover.addEventListener('mouseenter', () => { createFloatingWord(heroHover); });
}

// Scroll-reveal for sections
const sections = document.querySelectorAll('section:not(.hero)');
function fadeInOnScroll(){
  const trigger = window.innerHeight * 0.88;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    const bottom = sec.getBoundingClientRect().bottom;
    if (top < trigger && bottom > 0) {
      sec.classList.add('visible');
    } else {
      sec.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll();


// ============================================================
// WHACK-A-CAT GAME (homepage only)
// ============================================================
const startBtn  = document.getElementById('startBtn');
const endBtn    = document.getElementById('endBtn');
const scoreEl   = document.getElementById('score');
const timeEl    = document.getElementById('time');
const messageEl = document.getElementById('gameMessage');
const holes     = document.querySelectorAll('.hole');

if (startBtn && endBtn && scoreEl && timeEl && messageEl) {
  let lastHole, timeUp = false, score = 0, timerId, gameTime = 20;

  function randomTime(min, max){ return Math.round(Math.random() * (max - min) + min); }

  function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
  }

  function peep(){
    const time = randomTime(800, 1500);
    const hole = randomHole(holes);
    const cat = document.createElement('div');
    cat.classList.add('cat');
    cat.textContent = '🐱';
    hole.appendChild(cat);
    setTimeout(() => { cat.classList.add('up'); }, 50);
    setTimeout(() => {
      cat.classList.remove('up');
      setTimeout(() => {
        if (hole.contains(cat)) hole.removeChild(cat);
        if (!timeUp) peep();
      }, 300);
    }, time);
  }

  function startGame(){
    resetGame();
    score = 0; scoreEl.textContent = score;
    gameTime = 20; timeEl.textContent = gameTime;
    messageEl.textContent = '';
    timeUp = false;
    peep();
    timerId = setInterval(() => {
      gameTime--;
      timeEl.textContent = gameTime;
      if (gameTime <= 0) endGame();
    }, 1000);
  }

  function endGame(){
    timeUp = true;
    clearInterval(timerId);
    holes.forEach(hole => {
      hole.querySelectorAll('.cat').forEach(c => hole.removeChild(c));
    });
    if (score >= 10) {
      messageEl.textContent = `🎉 Tahniah, tahniah! You scored ${score}! 🎉`;
    } else {
      messageEl.textContent = `😺 Ops! Let's get above 10 next time. You scored ${score}.`;
    }
  }

  function resetGame(){
    clearInterval(timerId);
    timeUp = true;
    holes.forEach(hole => {
      hole.querySelectorAll('.cat').forEach(c => hole.removeChild(c));
    });
    messageEl.textContent = '';
  }

  holes.forEach(hole => {
    hole.addEventListener('click', () => {
      const cat = hole.querySelector('.cat.up');
      if (cat) {
        score++;
        scoreEl.textContent = score;
        cat.classList.remove('up');
      }
    });
  });

  startBtn.addEventListener('click', startGame);
  endBtn.addEventListener('click', endGame);
}


// ============================================================
// CAT LOST GAME (homepage only)
// ============================================================
const catEl    = document.getElementById('cat_catlost');
const houseEl  = document.getElementById('house_catlost');
const thoughtEl= document.getElementById('catlost_thought');
const sceneEl  = document.getElementById('scene_catlost');

if (catEl && houseEl && thoughtEl && sceneEl) {
  let isDragging = false;
  let idleInterval;

  const idleMessages = ["helloo~", "im lost 🥺", "help me", "うち帰りたい"];

  function showThought(msg, duration = 2000){
    thoughtEl.textContent = msg;
    thoughtEl.style.opacity = 1;
    setTimeout(() => { thoughtEl.style.opacity = 0; }, duration);
  }

  function sparkleHouse(){
    for (let i = 0; i < 5; i++){
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = 20 + Math.random() * 50 + 'px';
      sparkle.style.bottom = 20 + Math.random() * 50 + 'px';
      sparkle.textContent = '✨';
      houseEl.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  }

  function startIdle(){
    clearInterval(idleInterval);
    idleInterval = setInterval(() => {
      if (!catEl.classList.contains('home') && !isDragging){
        showThought(idleMessages[Math.floor(Math.random() * idleMessages.length)]);
      }
    }, 3000);
  }

  startIdle();

  function startDrag(e){
    if (catEl.classList.contains('home')) return;
    isDragging = true;
    catEl.style.animation = 'none';
    catEl.style.cursor = 'grabbing';
    e.preventDefault();
  }

  function moveDrag(e){
    if (!isDragging) return;
    const rect = sceneEl.getBoundingClientRect();
    let x, y;
    if (e.touches){
      x = e.touches[0].clientX - rect.left - 35;
      y = e.touches[0].clientY - rect.top  - 35;
    } else {
      x = e.clientX - rect.left - 35;
      y = e.clientY - rect.top  - 35;
    }
    x = Math.max(0, Math.min(rect.width  - 70, x));
    y = Math.max(0, Math.min(rect.height - 70, y));
    catEl.style.left = x + 'px';
    catEl.style.top  = y + 'px';
    catEl.style.transform = x > rect.width / 2 ? 'scaleX(1)' : 'scaleX(-1)';
  }

  function endDrag(){
    if (!isDragging) return;
    isDragging = false;
    catEl.style.cursor = 'grab';
    const catRect   = catEl.getBoundingClientRect();
    const houseRect = houseEl.getBoundingClientRect();
    if (
      catRect.right  > houseRect.left &&
      catRect.left   < houseRect.right &&
      catRect.bottom > houseRect.top &&
      catRect.top    < houseRect.bottom
    ){
      showThought('Yeaay, thanks!', 2000);
      sparkleHouse();
      catEl.style.left = houseEl.offsetLeft + 'px';
      catEl.style.top  = houseEl.offsetTop  + 'px';
      catEl.classList.add('home');
      catEl.style.transform = 'scaleX(1)';
    } else {
      catEl.style.animation = 'bounce 1.2s ease-in-out infinite';
    }
  }

  catEl.addEventListener('mousedown',  startDrag);
  catEl.addEventListener('touchstart', startDrag);
  document.addEventListener('mousemove', moveDrag);
  document.addEventListener('touchmove', moveDrag);
  document.addEventListener('mouseup',   endDrag);
  document.addEventListener('touchend',  endDrag);
}


// ============================================================
// ASHIMA CHARACTER THOUGHT BUBBLE (homepage only)
// ============================================================
const hijab    = document.getElementById('ashima_character_svg');
const bubble_hc= document.getElementById('ashima-thoughtbubble');

if (hijab && bubble_hc) {
  const emotions = [
    { text: "Feeling happy 😄",   color: "#FFB3BA" },
    { text: "Let's focus",        color: "#BAE1FF" },
    { text: "Coffee break ☕",    color: "#BAFFC9" },
    { text: "Feeling creative",   color: "#FFD6A5" },
    { text: "Let's code! 👩‍💻",   color: "#FFC8DD" },
    { text: "Time to relax",      color: "#E2F0CB" }
  ];

  const greetings = [
    { text: "Hello! 😄",        color: "#FFB3BA" },
    { text: "こんにちは 👋",    color: "#BAE1FF" },
    { text: "Selamat pagi! ☀️", color: "#BAFFC9" },
    { text: "¡Hola! 🌟",        color: "#FFD6A5" },
    { text: "안녕하세요 👋",    color: "#FFC8DD" },
    { text: "வணக்கம் 🙏",     color: "#E2F0CB" },
    { text: "你好! 👋",         color: "#FFDAC1" }
  ];

  const funFacts = [
    "Did you know? Seutas spaghetti dipanggil Spaghetto!",
    "Did you know? You can't hum while holding your nose.",
    "You are too awesome to be forgotten! 🌟",
    "What do you call fake spaghetti? An impasta!",
  ];

  let idleTimer;
  function randomItem(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  function showBubble(text, color, duration = 2000, isFunFact = false){
    bubble_hc.textContent = text;
    bubble_hc.style.color = color;
    bubble_hc.style.opacity = 1;
    bubble_hc.style.whiteSpace = isFunFact ? 'normal' : 'nowrap';
    bubble_hc.style.maxWidth   = isFunFact ? '200px'  : 'none';
    bubble_hc.style.wordWrap   = isFunFact ? 'break-word' : 'normal';

    const side = Math.random() > 0.5 ? 'right' : 'left';
    bubble_hc.style[side] = '110%';
    bubble_hc.style[side === 'right' ? 'left' : 'right'] = 'auto';

    const x  = (Math.random() * 20 + 20) * (side === 'right' ? 1 : -1);
    const x2 = (Math.random() * 50 + 40) * (side === 'right' ? 1 : -1);
    bubble_hc.style.setProperty('--x2', `${x}px`);
    bubble_hc.style.setProperty('--x3', `${x2}px`);

    bubble_hc.style.animation = 'none';
    bubble_hc.offsetHeight;
    bubble_hc.style.animation = `floatOut ${duration / 1000}s ease-out forwards`;
  }

  function idleBounceAndEmotion(){
    hijab.style.animation = 'bounce ease';
    hijab.addEventListener('animationend', () => {
      hijab.style.animation = '';
      const emotion = randomItem(emotions);
      showBubble(emotion.text, emotion.color, 2000, false);
      idleTimer = setTimeout(idleBounceAndEmotion, 4000);
    }, { once: true });
  }

  function resetIdleTimer(){
    clearTimeout(idleTimer);
    idleTimer = setTimeout(idleBounceAndEmotion, 3000);
  }
  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('keydown', resetIdleTimer);
  resetIdleTimer();

  hijab.addEventListener('mouseenter', () => {
    hijab.style.animation = 'bounce 0.8s ease';
    hijab.addEventListener('animationend', () => { hijab.style.animation = ''; }, { once: true });
    const greeting = randomItem(greetings);
    showBubble(greeting.text, greeting.color, 2000, false);
  });

  hijab.addEventListener('click', () => {
    const fact = randomItem(funFacts);
    showBubble(fact, '#FFD6A5', 8000, true);
  });
}


// ============================================================
// SUN EFFECT (homepage only)
// ============================================================
const sun         = document.getElementById('sun-container');
const overlay     = document.getElementById('sun-overlay');
const candle      = document.getElementById('candle-popup');
const instruction = document.getElementById('sun-instruction');

if (sun && overlay && candle && instruction) {
  let isSunDragging = false;
  let startX = 0, startY = 0;

  sun.addEventListener('mouseenter', () => {
    if (!isSunDragging) instruction.style.opacity = '1';
  });
  sun.addEventListener('mouseleave', () => {
    instruction.style.opacity = '0';
  });

  function onSunStart(e){
    e.preventDefault();
    isSunDragging = true;
    sun.classList.add('dragging');
    instruction.style.opacity = '0';
    if (e.touches){
      startX = e.touches[0].clientX - sun.offsetLeft;
      startY = e.touches[0].clientY - sun.offsetTop;
    } else {
      startX = e.clientX - sun.offsetLeft;
      startY = e.clientY - sun.offsetTop;
    }
  }

  function onSunMove(e){
    if (!isSunDragging) return;
    let x, y;
    if (e.touches){
      x = e.touches[0].clientX - startX;
      y = e.touches[0].clientY - startY;
    } else {
      x = e.clientX - startX;
      y = e.clientY - startY;
    }
    sun.style.left = `${x}px`;
    sun.style.top  = `${y}px`;
    const sunRect = sun.getBoundingClientRect();
    if (
      sunRect.right  < 0 ||
      sunRect.left   > window.innerWidth ||
      sunRect.bottom < 0 ||
      sunRect.top    > window.innerHeight
    ){
      document.body.classList.add('sun_effect');
      overlay.style.display  = 'block';
      candle.style.display   = 'block';
      instruction.style.opacity = '0';
    }
  }

  function onSunEnd(){
    isSunDragging = false;
    sun.classList.remove('dragging');
  }

  sun.addEventListener('mousedown',  onSunStart);
  sun.addEventListener('touchstart', onSunStart);
  document.addEventListener('mousemove', onSunMove);
  document.addEventListener('touchmove', onSunMove, { passive: false });
  document.addEventListener('mouseup',   onSunEnd);
  document.addEventListener('touchend',  onSunEnd);

  candle.addEventListener('click', () => {
    document.body.classList.remove('sun_effect');
    overlay.style.display = 'none';
    candle.style.display  = 'none';
    sun.style.left = '20px';
    sun.style.top  = '20px';
    instruction.style.opacity = '0';
  });
}
