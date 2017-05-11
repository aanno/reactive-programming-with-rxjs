/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
 ***/
import Rx from "rx"

interface ITarget {
  x: number,
  y: number,
}

interface IShip extends ITarget {
  shots: ITarget[],
}

interface IEnemy extends ITarget {
  shots: IShot[],
  isDead: boolean,
}

interface IShot extends ITarget {
  timestamp: number,
}

interface IStar extends ITarget {
  size: number,
}

interface IActors {
  stars: any[],
  spaceship: IShip,
  enemies: IEnemy[],
  heroShots: ITarget[],
  score: number,
}

const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function isVisible(obj: ITarget): boolean {
  return obj.x > -40 && obj.x < canvas.width + 40 &&
    obj.y > -40 && obj.y < canvas.height + 40
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function paintStars(stars: IStar[]): void {
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  stars.forEach(function (star: IStar) {
    ctx.fillRect(star.x, star.y, star.size, star.size)
  })
}

function gameOver(ship: IShip, enemies: IEnemy[]): boolean {
  return enemies.some(function (enemy: IEnemy) {
    if (collision(ship, enemy)) {
      return true
    }

    return enemy.shots.some(function (shot: IShot) {
      return collision(ship, shot)
    })
  })
}

function collision(target1: ITarget, target2: ITarget): boolean {
  return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
    (target1.y > target2.y - 20 && target1.y < target2.y + 20)
}

function paintScore(score: number): void {
  // console.log("score", score)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 26px sans-serif'
  ctx.fillText('Score: ' + score, 40, 43)
}

function drawTriangle(x: number, y: number, width: number, color: string, direction: "up" | "down"): void {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x - width, y)
  ctx.lineTo(x, direction === 'up' ? y - width : y + width)
  ctx.lineTo(x + width, y)
  ctx.lineTo(x - width, y)
  ctx.fill()
}

function paintSpaceShip(x: number, y: number): void {
  drawTriangle(x, y, 20, '#ff0000', 'up')
}

function paintEnemies(enemies: IEnemy[]): void {
  enemies.forEach(function (enemy: IEnemy) {
    enemy.y += 5
    enemy.x += getRandomInt(-15, 15)

    if (!enemy.isDead) {
      drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down')
    }

    enemy.shots.forEach(function (shot: IShot) {
      shot.y += SHOOTING_SPEED
      drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down')
    })
  })
}

const SHOOTING_SPEED = 15
const SCORE_INCREASE = 10

function paintHeroShots(heroShots: ITarget[], enemies: IEnemy[]): void {
  heroShots.forEach(function (shot: ITarget, i: number) {
    let enemies_length
    try {
      enemies_length = enemies.length
    }
    catch (err) {
      enemies_length = 0
    }
    for (let l = 0; l < enemies_length || 0; l++) {
      const enemy = enemies[l]
      if (!enemy.isDead && collision(shot, enemy)) {
        ScoreSubject.onNext(SCORE_INCREASE)
        enemy.isDead = true
        shot.x = shot.y = -100
        break
      }
    }

    shot.y -= SHOOTING_SPEED
    drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up')
  })
}

const SPEED: number = 40
const STAR_NUMBER: number = 250

const StarStream: Rx.Observable<IStar[]> = Rx.Observable.range(1, STAR_NUMBER)
  .map(function () {
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1,
    }
  })
  .toArray()
  .flatMap(function (starArray: IStar[]) {
    return Rx.Observable.interval(SPEED).map(function () {
      starArray.forEach(function (star: IStar) {
        if (star.y >= canvas.height) {
          star.y = 0
        }
        star.y += 3
      })
      return starArray
    })
  })

const HERO_Y = canvas.height - 30

const mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove')
const SpaceShip: Rx.Observable<IShip> = mouseMove
  .map(function (event: MouseEvent) {
    return {x: event.clientX, y: HERO_Y}
  })
  .startWith({x: canvas.width / 2, y: HERO_Y})

/*
function isVisible(obj) {
  return obj.x > -40 && obj.x < canvas.width + 40 &&
    obj.y > -40 && obj.y < canvas.height + 40
}
 */

const ENEMY_FREQ = 1500
const ENEMY_SHOOTING_FREQ = 750

const Enemies: Rx.Observable<IEnemy[]> = Rx.Observable.interval(ENEMY_FREQ)
  .scan(function (enemyArray: IEnemy[]) {
    const enemy: IEnemy = {
      x: parseInt(Math.random() * canvas.width),
      y: -30,
      shots: [],
    }

    Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(function () {
      if (!enemy.isDead) {
        enemy.shots.push({x: enemy.x, y: enemy.y})
      }
      enemy.shots = enemy.shots.filter(isVisible)
    })

    enemyArray.push(enemy)
    return enemyArray
      .filter(isVisible)
      .filter(function (enemy: IEnemy) {
        return !(enemy.isDead && enemy.shots.length === 0)
      })
  }, [])

const playerFiring = Rx.Observable
  .merge(
    Rx.Observable.fromEvent(canvas, 'click'),
    Rx.Observable.fromEvent(canvas, 'keydown')
      .filter(function (evt: KeyboardEvent) {
        return evt.keyCode === 32
      }),
  )
  .sample(200)
  .timestamp()

const HeroShots: Rx.Observable<ITarget[]> = playerFiring
  .map(() => ([]))

const ScoreSubject: Rx.Subject<number> = new Rx.BehaviorSubject(0)
const score = ScoreSubject.scan(function (prev: number, cur: number) {
  return prev + cur
}, 0).concat(Rx.Observable.return(0))

function renderScene(actors: IActors) {
  paintStars(actors.stars)
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y)
  paintEnemies(actors.enemies)
  paintHeroShots(actors.heroShots, actors.enemies)
  paintScore(actors.score)
}

Rx.Observable.combineLatest(
  StarStream, SpaceShip, Enemies, HeroShots, score,
  function (stars: IStar[], spaceship: IShip, enemies: IEnemy[], heroShots: IShot[]): IActors {
    // console.log("score", score)
    return {
      stars: stars,
      spaceship: spaceship,
      enemies: enemies,
      heroShots: heroShots,
      score: score,
    }
  })
  .sample(SPEED)
  .takeWhile(function (actors: IActors) {
    return gameOver(actors.spaceship, actors.enemies) === false
  })
  .subscribe(renderScene)
