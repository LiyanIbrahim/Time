let d = 800, //main diameter
    r = d/2, //radius
    h = d + 20,  
    w = h,
    h2 = h/2,
    w2 = w/2;

let now = new Date();
let glitch = false;
let glitchDuration = 0;

function setup() {
  frameRate(60);
  createCanvas(w, h);
}

function draw() {
  // Y2K Glitch Effect Random Trigger
  if (int(random(1000)) === 1) {
    glitch = true;
    glitchDuration = 120; // glitch lasts for 120 frames
  }

  if (glitch) {
    glitchDuration--;
    if (glitchDuration <= 0) glitch = false;
  }

  now = new Date();
  background(glitch ? color(random(32, 128), random(32, 128), random(32, 128)) : 32);

  push();
  translate(h2, w2);
  rotate(-PI/2);
  ellipse(0, 0, d, d);

  // Hour and minute marks
  push();
  stroke(glitch ? color(random(255), random(255), random(255)) : 0);
  let steps = 60,
      stepAngle = TWO_PI / steps;
  let innerR = 0.85 * r,
      outerR = 0.95 * r;

  for (let i = 0; i < steps; i++) {
    strokeWeight(i % 5 == 0 ? 5 : 1);
    if (i == 0) strokeWeight(10);
    line(innerR, 0, outerR, 0);
    rotate(stepAngle);
  }
  pop();

  // Hands - Hours
  let hoursR = innerR * 0.75;
  let jumpingHours = false;
  let hoursAngle = (now.getHours() % 12) * TWO_PI / 12;
  if (!jumpingHours) {
    hoursAngle += (TWO_PI / 12) * (now.getMinutes() / 60.0);
  }
  push();
  stroke(glitch ? color(random(255), 0, 0) : 32);
  fill(32);
  strokeWeight(25);
  rotate(glitch ? hoursAngle + random(-0.1, 0.1) : hoursAngle);
  line(0, 0, hoursR, 0);
  pop();

  // Hands - Minutes
  let minutesR = innerR * 0.95;
  let jumpingMinutes = false;
  let minutesAngle = now.getMinutes() * TWO_PI / 60;
  if (!jumpingMinutes) {
    minutesAngle += (TWO_PI / 60) * (now.getSeconds() / 60.0);
  }
  push();
  stroke(glitch ? color(0, random(255), random(255)) : 0);
  fill(0);
  strokeWeight(10);
  ellipse(0, 0, 30, 30);
  rotate(glitch ? minutesAngle + random(-0.1, 0.1) : minutesAngle);
  line(0, 0, minutesR, 0);
  pop();

  // Hands - Seconds
  let secondsR = outerR;
  let sweepSeconds = true;
  let secondsAngle = now.getSeconds() * TWO_PI / 60;
  if (sweepSeconds) {
    secondsAngle += (TWO_PI / 60) * (now.getMilliseconds() / 1000.0);
  }
  push();
  stroke(glitch ? color(255, random(255), 0) : color(255, 0, 0));
  fill(255, 0, 0);
  strokeWeight(4);
  ellipse(0, 0, 20, 20);
  rotate(glitch ? secondsAngle + random(-0.2, 0.2) : secondsAngle);
  line(-20, 0, secondsR, 0);
  pop();

  pop();

  // Display the date with Y2K emphasis on the year
  noStroke();
  fill(255);
  textSize(24);
  text(`Year: ${now.getFullYear() % 100 == 0 ? "00" : now.getFullYear() % 100}`, 20, 50); // Simulate Y2K glitch around the year 2000
  textSize(16);
  text(timeString(now), 20, 80);

  // Freeze the clock for a brief moment during the glitch
  if (glitch && random(100) < 10) {
    noLoop();
    setTimeout(loop, random(500, 1000)); // Freeze for 0.5 to 1 second to simulate software crash
  }
}

function timeString(d) {
  return (
    d.getHours() +
    ":" +
    nf(d.getMinutes(), 2, 0) +
    ":" +
    nf(d.getSeconds(), 2, 0) +
    ":" +
    nf(d.getMilliseconds(), 3, 0)
  );
}
