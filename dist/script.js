//
// what seems so scattered
// may correlate to what we
// cannot perceive — lines

let img1, img2;
let stars;
let stars2;
let nStars = 50;

function preload() {
  img1 = loadImage("https://assets.codepen.io/4559259/regression.jpg");
  img2 = loadImage("https://assets.codepen.io/4559259/star.png");
}

function setup() {
  createCanvas(600, 600);

  angleMode(DEGREES);
  stroke(255);
  imageMode(CENTER);
  stars = [];
  tmp2 = random(-2, 2);
  for (let i = 0; i < nStars; i++) {
    tmp = randomGaussian(0, width / 20);
    stars[i] = createVector(
      tmp,
      tmp * tmp2 + randomGaussian(0, 10),
      randomGaussian(20, 5)
    );
  }
  strokeWeight(0.5);
  stars2 = stars;
}

function draw() {
  translate(width / 2, height / 2);
  t1 = frameCount;
  // rotate(t1);

  sumX = 0;
  sumY = 0;
  sumXY = 0;
  sumX2 = 0;
  sumY2 = 0;

  for (let i = 0; i < nStars; i++) {
    stars[i].x = stars2[i].x + (stars[i].x * sin((t1 / stars[i].z) * 2)) / 1200;
    stars[i].y = stars2[i].y + ((stars[i].z + stars[i].y) * cos(t1)) / 1200;
  }

  for (let i = 0; i < stars.length; i++) {
    sumX = sumX + stars[i].x;
    sumY = sumY + stars[i].y;
    sumXY = sumXY + stars[i].x * stars[i].y;
    sumX2 = sumX2 + stars[i].x * stars[i].x;
    sumY2 = sumY2 + stars[i].y * stars[i].y;
  }

  b = (sumY * sumX2 - sumX * sumXY) / (nStars * sumX2 - sumX * sumX);
  m = (nStars * sumXY - sumX * sumY) / (nStars * sumX2 - sumX * sumX);

  x1 = -width / 2;
  y1 = m * x1 + b;
  x2 = width / 2;
  y2 = m * x2 + b;
  push();
  rotate(atan(m));
  image(img1, 0, 0, 900, 900);
  pop();
  line(x1, y1, x2, y2);
  drawStars();
}
function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    image(img2, stars[i].x, stars[i].y, stars[i].z, stars[i].z);
  }
}

function mousePressed() {
  setup();
  draw();
}