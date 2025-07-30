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
    type: 'choice',
    question: "Q1: Kya aapko mujh par trust hai?",
    options: [
      { text: "Hamesha se tha ❤️", value: 1 },
      { text: "Thoda kam ho gaya hai", value: 2 },
      { text: "Khud se bhi zyada hai ❤️‍🔥", value: 3 }
    ]
  },
  {
    type: 'choice',
    question: "Q2: Agar main superhero hota, to kaunsa hota?",
    options: [
      { text: "Fauji", value: 1 },
      { text: "Aap hamesha se mera superhero ho", value: 2 },
      { text: "Dramebaaz Man", value: 3 }
    ]
  },
  {
    type: 'choice',
    question: "Q3: Aapko mere mein sabse ajeeb ya annoying baat kya lagti hai?",
    options: [
      { text: "Har waqt bakbak karta rehta hoon", value: 1 },
      { text: "Har baat mein drama", value: 2 },
      { text: "Jaldi Emotional Ho Jata Hon 💔", value: 3 }
    ]
  },
  {
    type: 'choice',
    question: "Q4: Aapko mere mein sabse achhi baat kya lagti hai?",
    options: [
      { text: "Apko BEHNA Kahta Hon", value: 1 },
      { text: "Mujhe hassata hoon", value: 2 },
      { text: "Dil ka saaf hoon ❤️", value: 3 }
    ]
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
      <button onclick="nextPage()">Next Memory ➡</button>
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
  },

  {
    type: 'final'
  }
];

let currentPage = 0;
let answers = [];
let codeAnswers = [];

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

  if (page.type === 'choice') {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
      alert('Please select an option 💖');
      return;
    }
    codeAnswers.push(parseInt(selected.value));
  }

  currentPage++;
  renderPage();
}

function mapToAlphabetCode(answers) {
  const index = ((answers[0] - 1) * 27) + ((answers[1] - 1) * 9) + ((answers[2] - 1) * 3) + (answers[3] - 1);
  const codeList = generateCodeList();
  return codeList[index] || '??';
}

function generateCodeList() {
  const list = [];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          const idx = list.length;
          const first = letters[Math.floor(idx / 26)];
          const second = letters[idx % 26];
          list.push(first + second);
        }
      }
    }
  }
  return list;
}

function renderPage() {
  const page = pages[currentPage];
  if (!page) return;

  if (page.type === 'welcome' || page.type === 'memories') {
    app.innerHTML = page.content;
  } else if (page.type === 'question') {
    app.innerHTML = `
      <h2>${page.question}</h2>
      <div class="answer-label">ANSWER WITH ❤</div>
      <textarea rows="4" placeholder="Apna jawab yahan likhiye..."></textarea>
      <br />
      <button onclick="nextPage()">Next ➡</button>
    `;
  } else if (page.type === 'choice') {
    app.innerHTML = `
      <h2>${page.question}</h2>
      <div class="answer-label">ANSWER WITH ❤</div>
      ${page.options.map(opt => `
        <label style="display:block; margin: 10px 0;">
          <input type="radio" name="choice" value="${opt.value}" /> ${opt.text}
        </label>
      `).join('')}
      <button onclick="nextPage()">Next ➡</button>
    `;
  } else if (page.type === 'final') {
    const code = mapToAlphabetCode(codeAnswers);
   app.innerHTML = `
  <div id="gift-scene">
    <h1>🎁 Tap to Open Your Surprise!</h1>
    <img src="https://i.imgur.com/8GQmH1S.png" alt="Gift Box" id="gift-box" />
  </div>
`;


      <div id="final-message" style="display: none;">
        <h1>🎉 Happy Sister Day, Aapko! 🎂</h1>
        <div class="message-box">
          <p>
            Aap meri zindagi ki sabse khoobsurat gift hain. Main ne Allah se bohot mang kar aapko paaya hai.
            Meri dua hai ke humesha aap mere saath rahain. Kabhi aap mujh se naraz na ho. 
            Aap ke baghair meri family adhoori hai.
          </p>
        </div>

        <div style="margin: 30px auto; width: 100%; max-width: 100%; background: #f9f9f9; border-radius: 15px; overflow: hidden; box-shadow: 0 0 20px rgba(255,182,193,0.6);">
          <img src="final-sister.jpg" alt="Sister Photo" style="width: 100%; height: auto; object-fit: cover;" />
        </div>

        <h2 style="margin-top: 30px;" class="glitter-text">LOVE YOU BEHNA ❤</h2>
        <p style="margin-top: 10px; font-weight: bold;">— Aapka chhota bhai 💖</p>
        <p style="font-size: 1.2em; margin-top: 20px;">Your surprise code: <strong>${code}</strong></p>
        <br/>
        <button onclick="restart()">Watch Again 🔁</button>
      </div>
    `;

    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
      giftBox.addEventListener('click', () => {
        document.getElementById('gift-scene').style.display = 'none';
        document.getElementById('final-message').style.display = 'block';
      });
    }
  }
}

function restart() {
  currentPage = 0;
  answers = [];
  codeAnswers = [];
  renderPage();
}

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

let musicStarted = false;
function playMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  const iframe = document.getElementById('music');
  const src = iframe.getAttribute('src');
  iframe.setAttribute('src', src + '&auto_play=true');
}
document.addEventListener('click', playMusicOnce);
