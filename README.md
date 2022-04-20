# Start
```
npm install
npm start
```
# game.js
just like from Intro to CS~
```
import {
  makeGraphicsWindow,
  runGraphics,
  fillCircle,
  fillRectangle,
  isKeyPressed
} from 'simple-web-graphics'

makeGraphicsWindow(document.getElementById('canvas'))

const paddleHeight = 80
const windowWidth = 480
const windowHeight = 320

function isBallHittingPaddle(ballX, ballY, ballXVel, paddleX, paddleY) {
  const inVerticalBounds = ballY >= paddleY && ballY <= paddleY + paddleHeight
  const crossesPaddle = (ballX - paddleX) * (ballX + ballXVel - paddleX) <= 0

  return inVerticalBounds && crossesPaddle
}

////////////////////////////////////////////////////////////
// this function is called once to initialize your new world

function startWorld(world) {
  world.paddle1X = 15
  world.paddle1Y = windowHeight / 2

  world.paddle2X = windowWidth - 15
  world.paddle2Y = windowHeight / 2

  const randomAngle = 2 * Math.PI * Math.random()

  world.ballX = windowWidth / 2
  world.ballY = windowHeight / 2
  world.ballXVel = 3 * Math.cos(randomAngle)
  world.ballYVel = 3 * Math.sin(randomAngle),

  world.gameOver = false
}

////////////////////////////////////////////////////////////
// this function is called every frame to update your world

function updateWorld(world) {
  if (world.gameOver) return

  // player 1 controls
  if (isKeyPressed('q') && world.paddle1Y > 0) {
    world.paddle1Y -= 3
  }
  if (isKeyPressed('w') && world.paddle1Y < windowHeight - paddleHeight) {
    world.paddle1Y += 3
  }

  // player 2 controls
  if (isKeyPressed('o') && world.paddle2Y > 0) {
    world.paddle2Y -= 3
  }
  if (isKeyPressed('p') && world.paddle2Y < windowHeight - paddleHeight) {
    world.paddle2Y += 3
  }

  const hitPaddle1 = isBallHittingPaddle(world.ballX, world.ballY, world.ballXVel, world.paddle1X, world.paddle1Y)
  const hitPaddle2 = isBallHittingPaddle(world.ballX, world.ballY, world.ballXVel, world.paddle2X, world.paddle2Y)
  if (hitPaddle1 || hitPaddle2) {
    world.ballXVel *= -1
  }

  if (world.ballY <= 0 || world.ballY >= windowHeight) {
    world.ballYVel *= -1
  }

  if (world.ballX <= 0 || world.ballX >= windowWidth) {
    world.gameOver = true
  }

  world.ballX += world.ballXVel
  world.ballY += world.ballYVel
}

////////////////////////////////////////////////////////////
// this function is called every frame to draw your world

function drawWorld(world) {
  fillRectangle(world.paddle1X, world.paddle1Y, 5, paddleHeight, 'blue')
  fillRectangle(world.paddle2X, world.paddle2Y, 5, paddleHeight, 'green')
  fillCircle(world.ballX, world.ballY, 5, 'red')
}

////////////////////////////////////////////////////////////

runGraphics(startWorld, updateWorld, drawWorld)
```
