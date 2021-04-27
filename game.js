import SimpleWebGraphics from 'simple-web-graphics'

const paddleHeight = 80

const isBallHittingPaddle = (ball, paddle) => {
  const inVerticalBounds = ball.y >= paddle.y && ball.y <= paddle.y + paddleHeight
  const crossesPaddle = (ball.x - paddle.x) * (ball.x + ball.xVel - paddle.x) <= 0
  return inVerticalBounds && crossesPaddle
}

class Graphics extends SimpleWebGraphics {
  setup = () => {
    this.paddle1 = {
      x: 15,
      y: this.canvasHeight / 2
    }

    this.paddle2 = {
      x: this.canvasWidth - 15,
      y: this.canvasHeight / 2
    }

    const randomAngle = 2 * 3.14159 * Math.random()

    this.ball = {
      x: this.canvasWidth / 2,
      y: this.canvasHeight / 2,
      xVel: 3 * Math.cos(randomAngle),
      yVel: 3 * Math.sin(randomAngle),
    }

    this.gameOver = false
  }

  update = () => {
    if (this.gameOver) return

    // player 1 controls
    if (this.isKeyDown('q') && this.paddle1.y > 0) {
      this.paddle1.y -= 3
    }
    if (this.isKeyDown('w') && this.paddle1.y < this.canvasHeight - paddleHeight) {
      this.paddle1.y += 3
    }

     // player 2 controls
    if (this.isKeyDown('o') && this.paddle2.y > 0) {
      this.paddle2.y -= 3
    }
    if (this.isKeyDown('p') && this.paddle2.y < this.canvasHeight - paddleHeight) {
      this.paddle2.y += 3
    }

    if (isBallHittingPaddle(this.ball, this.paddle1) || isBallHittingPaddle(this.ball, this.paddle2)) {
      this.ball.xVel *= -1
    }

    if (this.ball.y <= 0 || this.ball.y >= this.canvasHeight) {
      this.ball.yVel *= -1
    }

    if (this.ball.x <= 0 || this.ball.x >= this.canvasWidth) {
      this.gameOver = true
    }

    this.ball.x += this.ball.xVel
    this.ball.y += this.ball.yVel
  }

  draw = () => {
    this.fillRect(this.paddle1.x, this.paddle1.y, 5, paddleHeight)
    this.fillRect(this.paddle2.x, this.paddle2.y, 5, paddleHeight)
    this.fillRect(this.ball.x, this.ball.y, 5, 5)
  }
}

const graphics = new Graphics(document.getElementById('root'))
graphics.runGraphics()