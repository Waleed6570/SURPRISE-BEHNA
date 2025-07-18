const app = document.getElementById('app');

const pages = [
  {
    type: 'welcome',
    content: `
      <h1>Welcome My Pyari Behna 🌸</h1>
      <p>Meri Taraf Sa Ap Kaliya Aik Chota Sa Surprise... 🥰</p>
      <button onclick="nextPage()">Next ➡</button>
    `
  },
  {
    type: 'question',
    question: "🌸 Aapko mujh mein sabse achi baat kya lagti hai?",
  },
  {
    type: 'question',
    question: "💭 Aapki koi ek yaad mere saath jo aap kabhi nahi bhoolengi?",
  },
  {
    type: 'question',
    question: "😄 Agar aap mujhe koi pyaara sa nickname dena chahein, to kya hoga?",
  },
  {
    type: 'question',
    question: "🤝 Kya aapko mujh par pura bharosa hai? Agar haan, to kyun?",
  },
  {
    type: 'memories',
    content: `
      <h1>✨ Yaadein ✨</h1>
      <p>Yeh woh pal hain jo hamesha mere dil ke kareeb rahenge... ❤</p>
      <div style="margin-top: 20px;">
        <img src="batain.jpg" alt="Memory 1" style="width:100%;border-radius:15px;" />
        <p>Hamari hasi... hamari baatein... 😄</p>
      </div>
      <button onclick="nextPage()">Next Memory ➡</button>
    `
  },
  {
    type: 'memories',
    content: `
      <div style="margin-top: 20px;">
        <img src="ludo.jpg" alt="Memory 2" style="width:100%;border-radius:15px;" />
        <p>Ludo ka match... aur aapka naraz hona! 😂🎲</p>
      </div>
      <button onclick="nextPage()">Next Memory ➡</button>
    `
  },
  {
    type: 'memories',
    content: `
      <div style="margin-top: 20px;">
        <img src="chai.jpg" alt="Chai" style="width:100%;border-radius:15px;" />
        <p>Raat ki chai aur gupshup... ☕✨</p>
      </div>
      <button onclick="nextPage()">Final Surprise 🎁</button>
    `
  },
  {
  type: 'memories',
  content: `
    <div style="margin-top: 20px;">
      <img src="picnic-memory.jpg" alt="Picnic" style="width:100%;border-radius:15px;" />
      <p>Wo picnic jo humne saath enjoy kiya tha... 🌳🍃</p>
    </div>
    <button onclick="nextPage()">Next Memory ➡</button>
  `
}
 {
  type: 'final',
  content: `
    <h1>🎉 Happy Sister Day, Aapko! 🎂</h1>
    <p class="celebration">Aap meri zindagi ka sabse pyara hissa hain... 🥹</p>

    <!-- Final Photo (landscape style and smaller) -->
    <div style="margin: 20px auto;">
      <img src="final-sister.jpg" alt="Sister Photo" style="width: 80%; max-height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 0 15px rgba(255,182,193,0.7);" />
    </div>

    <!-- Heartfelt Message (smaller text) -->
    <p style="
      margin: 30px auto 20px;
      padding: 15px;
      background: #ffe6f0;
      border: 2px solid #ff1493;
      border-radius: 12px;
      font-size: 1em;
      color: #d81b60;
      max-width: 90%;
      font-weight: 500;
      line-height: 1.4em;
      white-space: pre-wrap;
    ">
      Aap meri zindagi ki sabse khoobsurat gift hain.
      Main Na Allah Sa Bohat Mang Kar Apko Liya Hai.
      Meri Allah Sa Dua Hai Hum Hamesha Saath Rahain.
      Kabhi Aap Mujh Se Naraz Na Ho.
      Aap Ke Bina Meri Family Incomplete Hai.
      Happy Sister Day, meri pyari behna!
    </p>

    <!-- Love You Message -->
    <h2 style="
      margin-top: 30px;
      color: #ff1493;
      font-size: 2.2em;
      font-family: 'Pacifico', cursive;
      text-shadow: 2px 2px 4px #ffb6c1;
    ">
      LOVE YOU BEHNA ❤️
    </h2>

    <p style="margin-top: 25px; font-weight: bold;">Aapka chhota bhai 💖</p>
    <br/>
    <button onclick="restart()">Watch Again 🔁</button>
  `
}
];

let currentPage = 0;
let answers = [];

function nextPage() {
  const page = pages[currentPage];
  if (page.type === 'question') {
    const input = document.querySelector('textarea');
    const val = input.value.trim();
    if (val === '') {
      alert('Please answer with ❤ before moving forward!');
      return;
    }
    answers.push(val);
  }
  currentPage++;
  renderPage();
}

function renderPage() {
  const page = pages[currentPage];
  if (!page) return;

  if (page.type === 'welcome' || page.type === 'memories' || page.type === 'final') {
    app.innerHTML = page.content;
  } else if (page.type === 'question') {
    app.innerHTML = `
      <h2>${page.question}</h2>
      <div class="answer-label">ANSWER WITH ❤</div>
      <textarea rows="4" placeholder="Apna jawab yahan likhiye..."></textarea>
      <br />
      <button onclick="nextPage()">Next ➡</button>
    `;
  }
}

// Falling emoji animation
function createFallingEmoji() {
  const emojiArray = ['🎈', '🌸', '🎉'];
  const emoji = document.createElement('div');
  emoji.classList.add('falling-emoji');
  emoji.innerText = emojiArray[Math.floor(Math.random() * emojiArray.length)];
  emoji.style.left = Math.random() * 100 + 'vw';
  emoji.style.fontSize = (Math.random() * 20 + 25) + 'px';
  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 5000);
}

window.onload = () => {
  renderPage();
  setInterval(createFallingEmoji, 300);
};
