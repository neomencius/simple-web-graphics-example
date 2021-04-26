const keyNameMap = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
  ' ': 'space',
}

export default class SimpleWebGraphics {
  constructor(canvasElemId) {
    const canvas = document.getElementById(canvasElemId);
    this._ctx = canvas.getContext("2d");
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height

    this._keysDown = {}

    this.mouseX = 0
    this.mouseY = 0

    document.addEventListener("keydown", this._keyDownHandler, false);
    document.addEventListener("keyup", this._keyUpHandler, false);
    document.addEventListener("mousemove", this._mouseMoveHandler, false);
  }

  // user override methods
  setup = () => {}
  update = () => {}
  draw = () => {}

  _keyDownHandler = (e) => {
    console.log(e)
    const key = keyNameMap[e.key] || e.key
    this._keysDown[key] = true
  }

  _keyUpHandler = (e) => {
    const key = keyNameMap[e.key] || e.key
    this._keysDown[key] = false
  }

  isKeyDown = (key) => {
    if (!(key in this._keysDown)) {
      return false
    }

    return this._keysDown[key]
  }

  _mouseMoveHandler = () => {}

  fillRect = (x, y, width, height) => {
    this._ctx.fillRect(x, y, width, height)
  }

  _clearCanvas = () => {
    this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  _iterateGraphics = () => {
    this.update()
    this._clearCanvas()
    this.draw()
  }

  runGraphics = () => {
    this.setup()
    setInterval(this._iterateGraphics, 10)
  }
}
