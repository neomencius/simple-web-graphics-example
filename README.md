# Start
```
npm install
npm start
```

# Live Demo
[https://simple-web-graphics-example-8mjtnrzvi-neomencius.vercel.app/](https://simple-web-graphics-example-8mjtnrzvi-neomencius.vercel.app/)

# Andrew Merrill's graphics.py Reference
[http://inside.catlin.edu/site/compsci/resources/python/graphics/PythonGraphics.html](http://inside.catlin.edu/site/compsci/resources/python/graphics/PythonGraphics.html)

# game.js
just like from Intro to CS~
```
import {
  makeGraphicsWindow,
  runGraphics,
  getWindowWidth,
  getWindowHeight,
  fillCircle,
  fillRectangle,
  isKeyPressed
} from 'simple-web-graphics'

makeGraphicsWindow(document.getElementById('canvas'))

const paddleHeight = 80

function isBallHittingPaddle(ballX, ballY, ballXVel, paddleX, paddleY) {
  const inVerticalBounds = ballY >= paddleY && ballY <= paddleY + paddleHeight
  const crossesPaddle = (ballX - paddleX) * (ballX + ballXVel - paddleX) <= 0

  return inVerticalBounds && crossesPaddle
}

////////////////////////////////////////////////////////////
// this function is called once to initialize your new world

function startWorld(world) {
  world.windowWidth = getWindowWidth()
  world.windowHeight = getWindowHeight()

  world.paddle1X = 15
  world.paddle1Y = world.windowHeight / 2

  world.paddle2X = world.windowWidth - 15
  world.paddle2Y = world.windowHeight / 2

  const randomAngle = 2 * Math.PI * Math.random()

  world.ballX = world.windowWidth / 2
  world.ballY = world.windowHeight / 2
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
  if (isKeyPressed('w') && world.paddle1Y < world.windowHeight - paddleHeight) {
    world.paddle1Y += 3
  }

  // player 2 controls
  if (isKeyPressed('o') && world.paddle2Y > 0) {
    world.paddle2Y -= 3
  }
  if (isKeyPressed('p') && world.paddle2Y < world.windowHeight - paddleHeight) {
    world.paddle2Y += 3
  }

  const hitPaddle1 = isBallHittingPaddle(world.ballX, world.ballY, world.ballXVel, world.paddle1X, world.paddle1Y)
  const hitPaddle2 = isBallHittingPaddle(world.ballX, world.ballY, world.ballXVel, world.paddle2X, world.paddle2Y)
  if (hitPaddle1 || hitPaddle2) {
    world.ballXVel *= -1
  }

  if (world.ballY <= 0 || world.ballY >= world.windowHeight) {
    world.ballYVel *= -1
  }

  if (world.ballX <= 0 || world.ballX >= world.windowWidth) {
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
