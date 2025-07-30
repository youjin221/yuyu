const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 화면 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 캐처(플레이어 바)
const catcher = {
  width: 100,
  height: 20,
  x: canvas.width / 2 - 50,
  y: canvas.height - 50,
  color: "hotpink"
};

// 하트 설정
const hearts = [];
const heartSize = 30;
let score = 0;

function createHeart() {
  const x = Math.random() * (canvas.width - heartSize);
  hearts.push({ x: x, y: -heartSize });
}

function drawCatcher() {
  ctx.fillStyle = catcher.color;
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
}

function drawHearts() {
  ctx.fillStyle = "red";
  hearts.forEach((heart) => {
    ctx.beginPath();
    ctx.arc(heart.x + heartSize / 2, heart.y + heartSize / 2, heartSize / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function moveHearts() {
  hearts.forEach((heart, index) => {
    heart.y += 5;

    // 충돌 감지
    if (
      heart.y + heartSize >= catcher.y &&
      heart.x + heartSize >= catcher.x &&
      heart.x <= catcher.x + catcher.width
    ) {
      hearts.splice(index, 1);
      score++;
    }

    // 하트가 화면 밖으로 나가면 삭제
    if (heart.y > canvas.height) {
      hearts.splice(index, 1);
    }
  });
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCatcher();
  drawHearts();
  moveHearts();
  drawScore();
  requestAnimationFrame(gameLoop);
}

// 조작 - 터치
canvas.addEventListener("touchmove", function (e) {
  const rect = canvas.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  catcher.x = touchX - catcher.width / 2;
});

// 조작 - 마우스
document.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  catcher.x = mouseX - catcher.width / 2;
});

// 게임 시작
setInterval(createHeart, 1000);
gameLoop();
