import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Game of Life</h1>
    <div class="my-4">
      <button
        id="start"
        type="button"
        class="px-4 py-2"
      >
        Start
      </button>
      <button
        id="stop"
        type="button"
        class="px-4 py-2"
      >
        Stop
      </button>
      <button
        id="reset"
        type="button"
        class="px-4 py-2"
      >
        Reset
      </button>
    </div>
    <div class="m-4">
      <canvas
        id="cv"
        width="800"
        height="800"
        class="border-1 border-solid"
      ></canvas>
    </div>
    <div class="h-8">
      <div class="text-center">
        <a href="https://github.com/sakihet/game-of-life">GitHub</a>
      </div>
    </div>
    <div class="text-center text-small h-6 flex-column">
      <div class="py-2">
        <a
          class="text-secondary text-decoration-none"
          href="https://sakih.net/"
        >
          Copyright ©︎ 2020-PRESENT saki
        </a>
      </div>
    </div>
  </div>
`

const WORLD_WIDTH: number = 200
const WORLD_HEIGHT: number = 200
let ary: number[][] = []
let timer: number | undefined

const randomInt = (min:number, max:number):number => {
  return min + Math.floor(Math.random() * (max - min))
}

const init = () => {
  for (let i = 0; i < WORLD_HEIGHT; i++) {
    ary.push([])
    for (let j = 0; j < WORLD_WIDTH; j++) {
      let v = randomInt(0, 2)
      ary[i][j] = v
    }
  }
}

const drawCanvas = () => {
  const cv = <HTMLCanvasElement> document.querySelector("#cv")
  const ctx = cv.getContext("2d")
  const size = 4
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      if (ctx) {
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
}

const sumOfNeighborLivingCells = (x:number, y:number):number => {
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
  return sum
}

const updateWorld = () => {
  let newAry: number[][] = []
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    newAry.push([])
    for (let x = 0; x < WORLD_WIDTH; x++) {
      if (ary[y][x] === 1) {
        let sum = sumOfNeighborLivingCells(x, y)
        if (sum === 2 || sum === 3) {
          newAry[y][x] = 1
        } else if (sum <= 1) {
          newAry[y][x] = 0
        } else if (4 <= sum) {
          newAry[y][x] = 0
        }
      } else if (ary[y][x] === 0) {
        let sum = sumOfNeighborLivingCells(x, y)
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

const skipDay = () => {
  ary = updateWorld()
  drawCanvas()
}

const startGame = () => {
  if (timer === undefined) {
    timer = setInterval(
      () => {skipDay()},
      50
    )
  }
}

const stopGame = () => {
  clearInterval(timer)
  timer = undefined
}

const resetGame = () => {
  stopGame()
  init()
  drawCanvas()
}

init()
drawCanvas()

document.querySelector<HTMLButtonElement>("#start")!.addEventListener("click", startGame)
document.querySelector<HTMLButtonElement>("#stop")!.addEventListener("click", stopGame)
document.querySelector<HTMLButtonElement>("#reset")!.addEventListener("click", resetGame)
