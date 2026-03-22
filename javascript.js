// Auto-scroll keywords
const keywords = ['clear','friendly','minimal','playful','organized', 'thoughtful']
const scrollEl = document.querySelector('.scroll-keywords');
let index=0;
function scrollKeyword(){scrollEl.textContent=keywords[index];index=(index+1)%keywords.length;}
scrollKeyword();setInterval(scrollKeyword,1500);

// Floating words phrases
const popWords = ['おはよう','元気？','haluu~','awesome','✨Nice✨','こんにちは','good vibes','hello!'];
function createFloatingWord(el){
  for(let i=0; i<6; i++){
    setTimeout(()=>{
      const span = document.createElement('span');
      span.className='floating-word';
      span.textContent=popWords[Math.floor(Math.random()*popWords.length)];
      span.style.left = (Math.random()*80-40)+'%';
      el.appendChild(span);
      setTimeout(()=>{el.removeChild(span)},1200);
    }, i*400);
  }
}

//Delete top hover
//const topHover = document.querySelector('.top-hover');
// topHover.addEventListener('mouseenter', ()=>{ createFloatingWord(topHover); });
const heroHover = document.querySelector('.hero-hover');
heroHover.addEventListener('mouseenter', ()=>{ createFloatingWord(heroHover); });

// Fade-in sections both directions
const sections = document.querySelectorAll('section');
function fadeInOnScroll(){
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    const bottom = sec.getBoundingClientRect().bottom;
    if(top < trigger && bottom > 0){
      sec.classList.add('visible');
    } else {
      sec.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll();


//Whack-a-cat
const holes = document.querySelectorAll('.hole');
let lastHole, timeUp = false, score = 0, timerId, gameTime = 20;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('endBtn');
const messageEl = document.getElementById('gameMessage');

function randomTime(min,max){ return Math.round(Math.random()*(max-min)+min); }

function randomHole(holes){
  const idx = Math.floor(Math.random()*holes.length);
  const hole = holes[idx];
  if(hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

function peep(){
  const time = randomTime(800,1500); // cat visible duration
  const hole = randomHole(holes);
  const cat = document.createElement('div');
  cat.classList.add('cat');
  cat.textContent='🐱';
  hole.appendChild(cat);
  setTimeout(()=>{ cat.classList.add('up'); },50);

  setTimeout(()=>{
    cat.classList.remove('up');
    setTimeout(()=>{
      if(hole.contains(cat)) hole.removeChild(cat);
      if(!timeUp) peep();
    },300);
  }, time);
}

function startGame(){
  resetGame();
  score=0; scoreEl.textContent=score;
  gameTime=20; timeEl.textContent=gameTime;
  messageEl.textContent='';
  timeUp=false;
  peep();

  timerId = setInterval(()=>{
    gameTime--;
    timeEl.textContent=gameTime;
    if(gameTime <= 0){
      endGame();
    }
  },1000);
}

function endGame(){
  timeUp=true;
  clearInterval(timerId);
  // Remove all cats
  holes.forEach(hole=>{
    const cats = hole.querySelectorAll('.cat');
    cats.forEach(c=>hole.removeChild(c));
  });

  // Result message inside Playground section
  if(score >=10){
    messageEl.textContent = `🎉 Tahniah, tahniah! You scored ${score}! 🎉`;
  } else {
    messageEl.textContent = `😺 Ops! Let's get above 10 next time. You scored ${score}.`;
  }
}

function resetGame(){
  clearInterval(timerId);
  timeUp=true;
  holes.forEach(hole=>{
    const cats = hole.querySelectorAll('.cat');
    cats.forEach(c=>hole.removeChild(c));
  });
  messageEl.textContent='';
}

// Clicking cat or hole with cat counts as score
holes.forEach(hole=>{
  hole.addEventListener('click', e=>{
    const cat = hole.querySelector('.cat.up');
    if(cat){
      score++;
      scoreEl.textContent=score;
      cat.classList.remove('up');
    }
  });
});

startBtn.addEventListener('click', startGame);
endBtn.addEventListener('click', endGame);





//LOST CAT GAME

const cat = document.getElementById("cat_catlost");
const house = document.getElementById("house_catlost");
const thought = document.getElementById("catlost_thought");
const scene = document.getElementById("scene_catlost");

let isDragging = false;
let idleInterval;

// Idle messages
const idleMessages = [
  "helloo~",
  "im lost 🥺",
  "help me",
  "うち帰りたい"
];

// show cat thought
function showThought(msg, duration=2000){
  thought.textContent = msg;
  thought.style.opacity = 1;
  setTimeout(() => {
    thought.style.opacity = 0;
  }, duration);
}

// sparkle effect
function sparkleHouse(){
  for(let i=0; i<5; i++){
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = 20 + Math.random()*50 + "px";
    sparkle.style.bottom = 20 + Math.random()*50 + "px";
    sparkle.textContent = "✨";
    house.appendChild(sparkle);
    setTimeout(()=> sparkle.remove(), 800);
  }
}

// start idle thoughts
function startIdle(){
  clearInterval(idleInterval);
  idleInterval = setInterval(()=>{
    if(!cat.classList.contains("home") && !isDragging){
      const msg = idleMessages[Math.floor(Math.random()*idleMessages.length)];
      showThought(msg);
    }
  }, 3000);
}

startIdle();

// Drag logic
function startDrag(e){
  if(cat.classList.contains("home")) return;
  isDragging = true;
  cat.style.animation = "none"; 
  cat.style.cursor = "grabbing";
  e.preventDefault();
}

function moveDrag(e){
  if(!isDragging) return;
  const rect = scene.getBoundingClientRect();
  let x, y;
  if(e.touches){
    x = e.touches[0].clientX - rect.left - 35;
    y = e.touches[0].clientY - rect.top - 35;
  } else {
    x = e.clientX - rect.left - 35;
    y = e.clientY - rect.top - 35;
  }

  x = Math.max(0, Math.min(rect.width - 70, x));
  y = Math.max(0, Math.min(rect.height - 70, y));

  cat.style.left = x + "px";
  cat.style.top = y + "px";

  // flip cat facing
  if(x > rect.width/2){
    cat.style.transform = "scaleX(1)";
  } else {
    cat.style.transform = "scaleX(-1)";
  }
}

function endDrag(e){
  if(!isDragging) return;
  isDragging = false;
  cat.style.cursor = "grab";

  const catRect = cat.getBoundingClientRect();
  const houseRect = house.getBoundingClientRect();

  if (
    catRect.right > houseRect.left &&
    catRect.left < houseRect.right &&
    catRect.bottom > houseRect.top &&
    catRect.top < houseRect.bottom
  ) {
    showThought("Yeaay, thanks!", 2000);
    sparkleHouse();

    const houseX = house.offsetLeft;
    const houseY = house.offsetTop;
    cat.style.left = houseX + "px";
    cat.style.top = houseY + "px";
    cat.classList.add("home");
    cat.style.transform = "scaleX(1)";
  } else {
    cat.style.animation = "bounce 1.2s ease-in-out infinite";
  }
}

cat.addEventListener("mousedown", startDrag);
cat.addEventListener("touchstart", startDrag);

document.addEventListener("mousemove", moveDrag);
document.addEventListener("touchmove", moveDrag);

document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);


//END OF LOST CAT GAME


// Ashima Thought Bubble
// ---------- Setup ----------
const hijab = document.getElementById('ashima_character_svg');
const bubble_hc = document.getElementById('ashima-thoughtbubble');

const emotions = [
  { text: "Feeling happy 😄", color: "#FFB3BA" },
  { text: "Let's focus", color: "#BAE1FF" },
  { text: "Coffee break ☕", color: "#BAFFC9" },
  { text: "Feeling creative", color: "#FFD6A5" },
  { text: "Let's code! 👩‍💻", color: "#FFC8DD" },
  { text: "Time to relax", color: "#E2F0CB" }
];

const greetings = [
  { text: "Hello! 😄", color: "#FFB3BA" },
  { text: "こんにちは 👋", color: "#BAE1FF" },
  { text: "Selamat pagi! ☀️", color: "#BAFFC9" },
  { text: "¡Hola! 🌟", color: "#FFD6A5" },
  { text: "안녕하세요 👋", color: "#FFC8DD" },
  { text: "வணக்கம் 🙏", color: "#E2F0CB" },
  { text: "你好! 👋", color: "#FFDAC1" }
];

const funFacts = [
  "Did you know? Seutas spaghetti dipanggil Spaghetto!",
  "Did you know? You can't hum while holding your nose.",
  "You are too awesome to be forgotten! 🌟",
  "What do you call fake spaghetti? An impasta!",
];

let idleTimer;

// ---------- Functions ----------
function randomItem(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

function showBubble(text, color, duration=2000, isFunFact=false) {
  bubble_hc.textContent = text;
  bubble_hc.style.color = color;
  bubble_hc.style.opacity = 1;

  // Text wrapping only for fun facts
  if (isFunFact) {
    bubble_hc.style.whiteSpace = 'normal';
    bubble_hc.style.wordWrap = 'break-word';
    bubble_hc.style.maxWidth = '200px';
  } else {
    bubble_hc.style.whiteSpace = 'nowrap';
    bubble_hc.style.maxWidth = 'auto';
  }

  // Randomly show left or right side
  const side = Math.random() > 0.5 ? 'right' : 'left';
  bubble_hc.style[side] = '110%';
  bubble_hc.style[side === 'right' ? 'left' : 'right'] = 'auto';

  // Random horizontal floating distance: start 0 → x → x2 (inside → outside)
  const x = (Math.random()*20 + 20) * (side === 'right' ? 1 : -1);
  const x2 = (Math.random()*50 + 40) * (side === 'right' ? 1 : -1);
  bubble_hc.style.setProperty('--x2', `${x}px`);
  bubble_hc.style.setProperty('--x3', `${x2}px`);

  bubble_hc.style.animation = 'none';
  bubble_hc.offsetHeight; // reflow
  bubble_hc.style.animation = `floatOut ${duration/1000}s ease-out forwards`;
}

// Idle bounce + emotion
function idleBounceAndEmotion() {
  hijab.style.animation = 'bounce ease';
  hijab.addEventListener('animationend', () => {
    hijab.style.animation = '';
    const emotion = randomItem(emotions);
    showBubble(emotion.text, emotion.color, 2000, false);

    // Restart idle timer after bounce + emotion
    idleTimer = setTimeout(idleBounceAndEmotion, 2000 + 2000);
  }, { once: true });
}

// Idle detection
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(idleBounceAndEmotion, 2000);
}
document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);
resetIdleTimer();

// Hover greeting
hijab.addEventListener('mouseenter', () => {
  hijab.style.animation = 'bounce 0.8s ease';
  hijab.addEventListener('animationend', () => hijab.style.animation='', {once:true});

  const greeting = randomItem(greetings);
  showBubble(greeting.text, greeting.color, 2000, false);
});

// Click fun fact
hijab.addEventListener('click', () => {
  const fact = randomItem(funFacts);
  showBubble(fact, "#FFD6A5", 8000, true); // 8 seconds, wrap if too long
});

// End of Ashima Thought Bubble

// Sun Effect
/// Sun drag effect
const sun = document.getElementById('sun-container');
const overlay = document.getElementById('sun-overlay');
const candle = document.getElementById('candle-popup');
const instruction = document.getElementById('sun-instruction');

let isSunDragging = false;
let startX = 0, startY = 0;

// Show tooltip only on hover
sun.addEventListener('mouseenter', () => {
  if(!isSunDragging) instruction.style.opacity = '1';
});

sun.addEventListener('mouseleave', () => {
  instruction.style.opacity = '0';
});

// Start drag
function onSunStart(e){
  e.preventDefault();
  isSunDragging = true;
  sun.classList.add('dragging');
  instruction.style.opacity = '0'; // hide tooltip immediately when drag starts

  if(e.touches){
    startX = e.touches[0].clientX - sun.offsetLeft;
    startY = e.touches[0].clientY - sun.offsetTop;
  } else {
    startX = e.clientX - sun.offsetLeft;
    startY = e.clientY - sun.offsetTop;
  }
}

// Move drag
function onSunMove(e){
  if(!isSunDragging) return;
  let x, y;
  if(e.touches){
    x = e.touches[0].clientX - startX;
    y = e.touches[0].clientY - startY;
  } else {
    x = e.clientX - startX;
    y = e.clientY - startY;
  }

  sun.style.left = `${x}px`;
  sun.style.top = `${y}px`;

  const sunRect = sun.getBoundingClientRect();

  // Show effect only when sun fully leaves viewport
  if(
    sunRect.right < 0 || 
    sunRect.left > window.innerWidth || 
    sunRect.bottom < 0 || 
    sunRect.top > window.innerHeight
  ){
    document.body.classList.add('sun_effect');
    overlay.style.display = 'block';
    candle.style.display = 'block';
    instruction.style.opacity = '0';
  }
}

// End drag
function onSunEnd(){
  isSunDragging = false;
  sun.classList.remove('dragging');
}

// Events
sun.addEventListener('mousedown', onSunStart);
sun.addEventListener('touchstart', onSunStart);

document.addEventListener('mousemove', onSunMove);
document.addEventListener('touchmove', onSunMove, {passive:false});

document.addEventListener('mouseup', onSunEnd);
document.addEventListener('touchend', onSunEnd);

// Candle click restores site
candle.addEventListener('click', () => {
  document.body.classList.remove('sun_effect');
  overlay.style.display = 'none';
  candle.style.display = 'none';
  sun.style.left = '20px';
  sun.style.top = '20px';
  instruction.style.opacity = '0'; // hide tooltip initially, show on hover
});
// End of Sun Effect



