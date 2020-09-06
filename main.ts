const WORLD_WIDTH = 200
const WORLD_HEIGHT = 200
const DISP_CELL_ALIVE = "<span style='background-color: cyan;'> </span>"
const DISP_CELL_DEAD = " "
let ary = []
let timer = undefined

let randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

let init = () => {
  for (let i = 0; i < WORLD_HEIGHT; i++) {
    ary.push([])
    for (let j = 0; j < WORLD_WIDTH; j++) {
      let v = randomInt(0, 2)
      ary[i][j] = v
    }
  }
}

let draw = () => {
  let dom = []
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      if (ary[y][x] === 1) {
        dom.push(DISP_CELL_ALIVE)
      } else if (ary[y][x] === 0) {
        dom.push(DISP_CELL_DEAD)
      }
    }
    dom.push('\n')
  }
  document.querySelector("#world").innerHTML = dom.join('')
}

let drawCanvas = () => {
  const cv = <HTMLCanvasElement> document.querySelector("#cv")
  const ctx = cv.getContext("2d")
  const size = 4
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      if (ary[y][x] === 1) {
        ctx.fillStyle = 'black'
        ctx.fillRect(x * size, y * size, size, size)
      } else if (ary[y][x] === 0) {
        ctx.fillStyle = 'white'
        ctx.fillRect(x * size, y * size, size, size)
      }
    }
  }
}

let updateWorld = () => {
  let newAry = []
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    newAry.push([])
    for (let x = 0; x < WORLD_WIDTH; x++) {
      if (ary[y][x] === 1) {
        let sum = 0
        if (y === 0 && x === 0) {
          sum = 
            ary[y][x+1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (y === 0 && 1 <= x && x < (WORLD_WIDTH - 1) ){
          sum =
            ary[y][x-1] +
            ary[y][x+1] +
            ary[y+1][x-1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (y === 0 && x === (WORLD_WIDTH - 1)) {
          sum =
            ary[y][x-1] +
            ary[y+1][x-1] +
            ary[y+1][x]
        } else if (1 <= y && y < (WORLD_HEIGHT - 1) && x === 0) {
          sum =
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x+1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (1 <= y && y < (WORLD_HEIGHT - 1) && 1 <= x && x < (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x-1] +
            ary[y][x+1] +
            ary[y+1][x-1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (1 <= y && y < (WORLD_HEIGHT - 1) && x === (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y][x-1] +
            ary[y+1][x-1] +
            ary[y+1][x]
        } else if (y === (WORLD_HEIGHT - 1) && x === 0) {
          sum =
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x+1]
        } else if (y === (WORLD_HEIGHT - 1) && 1 <= x && x < (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x-1] +
            ary[y][x+1]
        } else if (y === (WORLD_HEIGHT - 1) && x === (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y][x-1]
        }
        if (sum === 2 || sum === 3) {
          newAry[y][x] = 1
        } else if (sum <= 1) {
          newAry[y][x] = 0
        } else if (4 <= sum) {
          newAry[y][x] = 0
        }
      } else if (ary[y][x] === 0) {
        let sum = 0
        if (y === 0 && x === 0) {
          sum = 
            ary[y][x+1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (y === 0 && 1 <= x && x < (WORLD_WIDTH - 1) ){
          sum =
            ary[y][x-1] +
            ary[y][x+1] +
            ary[y+1][x-1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (y === 0 && x === (WORLD_WIDTH - 1)) {
          sum =
            ary[y][x-1] +
            ary[y+1][x-1] +
            ary[y+1][x]
        } else if (1 <= y && y < (WORLD_HEIGHT - 1) && x === 0) {
          sum =
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x+1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (1 <= y && y < (WORLD_HEIGHT - 1) && 1 <= x && x < (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x-1] +
            ary[y][x+1] +
            ary[y+1][x-1] +
            ary[y+1][x] +
            ary[y+1][x+1]
        } else if (1 <= y && y < (WORLD_HEIGHT - 1) && x === (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y][x-1] +
            ary[y+1][x-1] +
            ary[y+1][x]
        } else if (y === (WORLD_HEIGHT - 1) && x === 0) {
          sum =
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x+1]
        } else if (y === (WORLD_HEIGHT - 1) && 1 <= x && x < (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y-1][x+1] +
            ary[y][x-1] +
            ary[y][x+1]
        } else if (y === (WORLD_HEIGHT - 1) && x === (WORLD_WIDTH - 1)) {
          sum =
            ary[y-1][x-1] +
            ary[y-1][x] +
            ary[y][x-1]
        }
        if (sum === 3) {
          newAry[y][x] = 1
        } else {
          newAry[y][x] = 0
        }
      }
    }
  }
  return newAry
}

let skipDay = () => {
  ary = updateWorld()
  // draw()
  drawCanvas()
}

let startGame = () => {
  if (timer === undefined) {
    timer = setInterval(
      () => {skipDay()},
      50
    )
  }
}

let stopGame = () => {
  clearInterval(timer)
  timer = undefined
}

let resetGame = () => {
  stopGame()
  init()
  // draw()
  drawCanvas()
}

window.onload = () => {
  init()
  // draw()
  drawCanvas()
  document.querySelector("#start").addEventListener("click", startGame)
  document.querySelector("#stop").addEventListener("click", stopGame)
  document.querySelector("#reset").addEventListener("click", resetGame)
}
