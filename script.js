const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 플레이어 바
const catcher = {
  width: 80,
  height: 20,
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  color: "hotpink"
};

// 하트 배열과 기본 설정
const hearts = [];
const heartSize = 30;
let score = 0;

// 하트 생성
function createHeart() {
  const x = Math.random() * (canvas.width - heartSize);
  hearts.push({ x: x, y: -heartSize });
}

// 바 그리기
function drawCatcher() {
  ctx.fillStyle = catcher.color;
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
}

// 하트 그리기
function drawHearts() {
  ctx.fillStyle = "red";
  hearts.forEach((heart) => {
    ctx.beginPath();
    ctx.arc(heart.x + heartSize / 2, heart.y + heartSize / 2, heartSize / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// 하트 이동 및 충돌 체크
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

    // 하트가 바닥까지 도달하면 제거
    if (heart.y > canvas.height) {
      hearts.splice(index, 1);
    }
  });
}

// 점수 표시
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// 게임 루프
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCatcher();
  drawHearts();
  moveHearts();
  drawScore();
  requestAnimationFrame(gameLoop);
}

// 터치 조작
document.addEventListener("touchmove", function (e) {
  const touchX = e.touches[0].clientX;
  catcher.x = touchX - catcher.width / 2;
});

// 마우스 조작 (PC)
document.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX;
  catcher.x = mouseX - catcher.width / 2;
});

// 게임 시작
window.onload = () => {
  setInterval(createHeart, 1000);
  gameLoop();
};



