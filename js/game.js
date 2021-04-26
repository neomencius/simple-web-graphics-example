import SimpleWebGraphics from './simple-web-graphics.js'

class Graphics extends SimpleWebGraphics {
  setup = () => {
    this.x = this.canvasWidth / 2
    this.y = this.canvasHeight - 25
    this.yVel = 0
  }

  update = () => {
    if (this.isKeyDown('left')) {
      this.x -= 3
    }

    if (this.isKeyDown('right')) {
      this.x += 3
    }

    if (this.y <= this.canvasHeight - 25) {
      this.yVel += 1
    }

    if (this.isKeyDown('space') && this.y === this.canvasHeight - 25) {
      this.yVel = -15
    }

    this.y += this.yVel

    if (this.y > this.canvasHeight - 25) {
      this.y = this.canvasHeight - 25
    }
  }

  draw = () => {
    this.fillRect(this.x, this.y, 25, 25)
  }
}

const graphics = new Graphics('root')
graphics.runGraphics()