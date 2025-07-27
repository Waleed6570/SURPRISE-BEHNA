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
    type: 'final',
    content: `
      <h1>🎉 Happy Sister Day, Aapko! 🎂</h1>
      <p class="celebration" style="font-size: 1.1em; line-height: 1.6;">
        Aap meri zindagi ki sabse khoobsurat gift hain. Main ne Allah se bohot mang kar aapko paaya hai.
        Meri dua hai ke humesha aap mere saath rahain. Kabhi aap mujh se naraz na ho. 
        Aap ke baghair meri family adhoori hai.
      </p>

      <div style="margin: 30px auto; width: 100%; max-width: 640px; aspect-ratio: 16 / 9; background: #f9f9f9; border-radius: 15px; overflow: hidden; box-shadow: 0 0 20px rgba(255,182,193,0.6);">
        <img src="final-sister.jpg" alt="Sister Photo" style="width: 100%; height: 100%; object-fit: contain;" />
      </div>

      <h2 style="margin-top: 30px; font-size: 2em; color: #ff1493;">LOVE YOU BEHNA ❤️</h2>
      <p style="margin-top: 10px; font-weight: bold;">— Aapka chhota bhai 💖</p>
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

 if (currentPage === 5) {
  const inputs = document.querySelectorAll('textarea');
  const answers = Array.from(inputs).map(input => input.value.trim());

  if (answers.some(ans => ans === '')) {
    alert("⚠ Please answer all questions before submitting.");
    return;
  }

  sendAnswersToEmail(answers); // ✅ Correctly send answers as array
  return;
}
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

function restart() {
  currentPage = 0;
  answers = [];
  renderPage();
}

// 🎈 FALLING EMOJIS
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

// 🔊 MUSIC: Play only once on first user click
let musicStarted = false;
function playMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  const iframe = document.getElementById('music');
  const src = iframe.getAttribute('src');
  iframe.setAttribute('src', src + '&auto_play=true');
}
document.addEventListener('click', playMusicOnce);

function sendAnswersToEmail(answers) {
  fetch("https://fed0e65f-8d43-4787-995d-1c76c822d31b-00-23cykt7p116kw.sisko.replit.dev/save-answers.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: q1=${encodeURIComponent(answers[0])}&q2=${encodeURIComponent(answers[1])}&q3=${encodeURIComponent(answers[2])}&q4=${encodeURIComponent(answers[3])}
  })
  .then(res => res.text())
  .then(data => {
    console.log("✅ Response from PHP:", data);
    alert("✅ Answers saved successfully!");
  })
  .catch(error => {
    console.error("❌ Error sending answers:", error);
    alert("❌ Failed to send answers. Try again later.");
  });
}
