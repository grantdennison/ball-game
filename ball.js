"use strict";

(function () {
  const ballContainer = document.getElementById("ball-container");
  const startGame = document.getElementById("start-game");
  const arrowLeft = document.getElementById("move-left");
  const arrowRight = document.getElementById("move-right");
  const arrowUp = document.getElementById("move-up");
  const arrowDown = document.getElementById("move-down");
  const textTopScore = document.getElementById("top-score");
  const textCurrentScore = document.getElementById("current-score");

  const canvas = ballContainer.getContext("2d");
  let topScore = 0;
  let currentScore = 0;

  //Check top score
  if (!localStorage.getItem("topscore")) {
    localStorage.setItem("topscore", 0);
  } else {
    topScore = Number(localStorage.getItem("topscore"));
  }
  //display top score and current score

  textTopScore.textContent = `=${topScore}`;
  textCurrentScore.textContent = `Current Score =${currentScore}`;
  // resize the canvas to fill browser window dynamically
  window.addEventListener("resize", resizeCanvas, false);
  function resizeCanvas() {
    ballContainer.width =
      window.innerWidth < 450 ? 450 : window.innerWidth - 21;
    ballContainer.height =
      window.innerHeight < 900 ? 900 : window.innerHeight - 23;

    draw();
  }

  resizeCanvas();

  function draw() {
    let raf = 0;
    let ballMove = false;
    const contW = ballContainer.width;
    const contH = ballContainer.height;
    const borderO = [0, 0, contW, contH];
    const topBanner = 70;
    const bottomBanner = 70;
    const borderClear = [
      5,
      topBanner,
      contW - 10,
      contH - bottomBanner - topBanner,
    ];
    let ballR, ballL, ballT, ballB;
    const objSpeed = 3;

    //ball Container border
    canvas.fillStyle = "green";
    canvas.fillRect(...borderO);
    canvas.clearRect(...borderClear);

    // ball initial setup
    let ball = {
      x: 100,
      y: 100,
      s: 4,
      vx: 4,
      vy: 0,
      radius: 15,
      color: "green",
      move: function () {
        // Ball
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = this.color;
        canvas.fill();
        //Object 1
        obj1.move();
        obj2.move();
        obj3.move();
        obj4.move();
        obj5.move();
        goal.move();
      },
    };

    //Reset if ball hits object
    function reset() {
      canvas.clearRect(...borderClear);
      raf = 0;
      ballMove = false;
      ball.x = 100;
      ball.y = 100;
      ball.s = 4;
      ball.vx = ball.s;
      ball.vy = 0;
      goal.m = 1;
      goal.x = contW - 100;
      goal.y = 800;
      window.cancelAnimationFrame(raf);
      ball.move();

      currentScore = 0;
      textCurrentScore.textContent = `Current Score =${currentScore}`;
    }

    //ball tail rgb(a) lower longer the tail
    function ballTail() {
      canvas.fillStyle = "rgba(255, 255, 255, 0.8 )";
      canvas.fillRect(...borderClear);
    }

    // Object's Draw
    let obj1 = {
      //start postions
      sx: 0,
      sy: 300,
      // end position
      ex: contW / 2,
      ey: 300,
      m: true,
      // line thickness
      l: 12,
      move: function () {
        canvas.beginPath();
        canvas.lineWidth = this.l;
        canvas.moveTo(this.sx, this.sy);
        canvas.lineTo(this.ex, this.ey);
        canvas.stroke();
      },
    };

    let obj2 = {
      //start postions
      sx: contW / 2,
      sy: 400,
      // end position
      ex: contW,
      ey: 400,
      m: true,
      // line thickness
      l: 12,
      move: function () {
        canvas.beginPath();
        canvas.lineWidth = this.l;
        canvas.moveTo(this.sx, this.sy);
        canvas.lineTo(this.ex, this.ey);
        canvas.stroke();
      },
    };

    let obj3 = {
      //start postions
      sx: 0,
      sy: 700,
      // end position
      ex: contW / 2,
      ey: 700,
      m: true,
      // line thickness
      l: 12,
      move: function () {
        canvas.beginPath();
        canvas.lineWidth = this.l;
        canvas.moveTo(this.sx, this.sy);
        canvas.lineTo(this.ex, this.ey);
        canvas.stroke();
      },
    };

    let obj4 = {
      //start postions
      sx: contW / 2,
      sy: 700,
      // end position
      ex: contW,
      ey: 700,
      m: true,
      // line thickness
      l: 12,
      move: function () {
        canvas.beginPath();
        canvas.lineWidth = this.l;
        canvas.moveTo(this.sx, this.sy);
        canvas.lineTo(this.ex, this.ey);
        canvas.stroke();
      },
    };

    let obj5 = {
      //start postions
      sx: contW / 2,
      sy: 400,
      // end position
      ex: contW / 2,
      ey: 500,
      m: true,
      // line thickness
      l: 12,
      move: function () {
        canvas.beginPath();
        canvas.lineWidth = this.l;
        canvas.moveTo(this.sx, this.sy);
        canvas.lineTo(this.ex, this.ey);
        canvas.stroke();
      },
    };

    let goal = {
      x: contW - 100,
      y: 800,
      //Goal location number
      m: 1,
      radius: 10,
      color: "red",
      move: function () {
        // Ball
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = this.color;
        canvas.fill();
      },
    };

    function goalLocation() {
      // Display score
      currentScore++;
      textCurrentScore.textContent = `Current Score =${currentScore}`;
      if (currentScore > topScore) {
        topScore = currentScore;
        localStorage.setItem("topscore", topScore);
        textTopScore.textContent = `=${topScore}`;
      }

      // Move ball position
      if (goal.m === 1) (goal.x = 150), (goal.y = 250);
      if (goal.m === 2) contW / 2 + 20, (goal.y = 600);
      if (goal.m === 3) (goal.x = 100), (goal.y = contH - 100);
      if (goal.m === 4) (goal.x = contW - 100), (goal.y = 350);
      if (goal.m === 5) {
        goal.x = contW - 100;
        goal.y = 800;
      }
      ball.s += 1;
      goal.m += goal.m > 4 ? -4 : 1;
    }

    //Motion of the ball in Straight line
    function move() {
      ballTail();
      ball.move();
      // Add ball motion
      ball.x += ball.vx;
      ball.y += ball.vy;
      ballB = ball.y + ball.radius;
      ballT = ball.y - ball.radius;
      ballR = ball.x + ball.radius;
      ballL = ball.x - ball.radius;
      // Check ball if hit border wall
      if (ballB > contH || ballT < topBanner || ballR > contW || ballL < 0) {
        reset();
        return;
      }
      // Add obj1 motion
      obj1.ex += obj1.m === true ? -objSpeed : objSpeed;
      if (obj1.ex < 5) obj1.m = false;
      if (obj1.ex > contW / 2) obj1.m = true;

      //check if ball hits obj1
      if (obj1.ey + 6 > ballT && ballB > obj1.ey - 6 && ballL < obj1.ex) {
        reset();
        return;
      }
      // Add obj2 motion
      obj2.sx += obj2.m === true ? -objSpeed : objSpeed;
      if (obj2.sx < contW / 2) obj2.m = false;
      if (obj2.sx > contW - 5) obj2.m = true;

      //check if ball hits obj2
      if (obj2.ey + 6 > ballT && ballB > obj2.ey - 6 && ballR > obj2.sx) {
        reset();
        return;
      }
      // Add obj3 motion
      obj3.ex += obj3.m === true ? -objSpeed : objSpeed;
      if (obj3.ex < 5) obj3.m = false;
      if (obj3.ex > contW / 2) obj3.m = true;

      //check if ball hits obj3
      if (obj3.ey + 6 > ballT && ballB > obj3.ey - 6 && ballL < obj3.ex) {
        reset();
        return;
      }
      // Add obj4 motion
      obj4.sx += obj4.m === true ? -objSpeed : objSpeed;
      if (obj4.sx < contW / 2) obj4.m = false;
      if (obj4.sx > contW - 5) obj4.m = true;

      //check if ball hits obj4
      if (obj4.ey + 6 > ballT && ballB > obj4.ey - 6 && ballR > obj4.sx) {
        reset();
        return;
      }

      // Add obj5 motion
      obj5.sy += obj5.m === true ? -objSpeed : objSpeed;
      obj5.ey += obj5.m === true ? objSpeed : -objSpeed;
      if (obj5.sy < 200) obj5.m = false;
      if (obj5.sy > 400) obj5.m = true;

      //check if ball hits obj5
      if (
        ballT < obj5.ey &&
        ballB > obj5.sy &&
        ballL < obj5.sx + 6 &&
        ballR > obj5.sx - 6
      ) {
        reset();
        return;
      }

      //Check if get the goall
      if (
        ballT < goal.y + 5 &&
        ballB > goal.y - 5 &&
        ballL < goal.x + 5 &&
        ballR > goal.x - 5
      ) {
        goalLocation();
      }

      //Restart loop
      raf = window.requestAnimationFrame(move);
    }

    // Change the ball direction
    // arrowLeft.addEventListener(`click`, () => {
    //   if (ball.vx <= 0 && raf !== 0) {
    //     ball.vx = -ball.s;
    //     ball.vy = 0;
    //   }
    // });
    // arrowRight.addEventListener(`click`, () => {
    //   if (ball.vx >= 0 && raf !== 0) {
    //     ball.vx = ball.s;
    //     ball.vy = 0;
    //   }
    // });
    // arrowUp.addEventListener(`click`, () => {
    //   if (ball.vy <= 0 && raf !== 0) {
    //     ball.vx = 0;
    //     ball.vy = -ball.s;
    //   }
    // });
    // arrowDown.addEventListener(`click`, () => {
    //   if (ball.vy >= 0 && raf !== 0) {
    //     ball.vx = 0;
    //     ball.vy = ball.s;
    //   }
    // });

    //Key press
    window.addEventListener("keydown", function (e) {
      let key = e.key;
      //   console.log(key);
      if (key === `ArrowUp` && ball.vy <= 0 && raf !== 0) {
        ball.vx = 0;
        ball.vy = -ball.s;
      }
      if (key === `ArrowDown` && ball.vy >= 0 && raf !== 0) {
        ball.vx = 0;
        ball.vy = ball.s;
      }
      if (key === `ArrowRight` && ball.vx >= 0 && raf !== 0) {
        ball.vx = ball.s;
        ball.vy = 0;
      }
      if (key === `ArrowLeft` && ball.vx <= 0 && raf !== 0) {
        ball.vx = -ball.s;
        ball.vy = 0;
      }
      //start ball game
      if (key === ` ` && raf === 0) {
        raf = window.requestAnimationFrame(move);
        ballMove = true;
      }
    });

    //Start the ball game
    startGame.addEventListener("click", function (e) {
      if (raf === 0) {
        raf = window.requestAnimationFrame(move);
        ballMove = true;
      }
    });

    ball.move();
  }
})();
