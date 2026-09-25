controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (projectileCount < maxProjectiles) {
        fireSprite = sprites.create(lab2imgs.flame, SpriteKind.Projectile)
        fireSprite.setPosition(flamethrower.x, flamethrower.y)
        fireSprite.setVelocity(0, -200)
        fireSprite.setFlag(SpriteFlag.AutoDestroy, true)
        projectileCount += 1
    }
})
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    projectileCount += -1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.spray, 500)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    enemyVelocity += 5
    if (enemyVelocity > maxEnemyVY) {
        enemyVelocity = maxEnemyVY
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
})
let fireSprite: Sprite = null
let maxEnemyVY = 0
let enemyVelocity = 0
let projectileCount = 0
let maxProjectiles = 0
let flamethrower: Sprite = null
scene.setBackgroundColor(11)
flamethrower = sprites.create(lab2imgs.flamethrower, SpriteKind.Player)
flamethrower.setPosition(80, 110)
controller.moveSprite(flamethrower)
flamethrower.setStayInScreen(true)
info.setScore(0)
info.setLife(3)
maxProjectiles = 2
projectileCount = 0
enemyVelocity = 25
maxEnemyVY = 150
let iceSprite = 0
game.onUpdateInterval(1000, function () {
    iceSprite = sprites.create(lab2imgs.icecube, SpriteKind.Enemy)
    iceSprite.setVelocity(0, enemyVelocity)
    iceSprite.setPosition(randint(8, 152), 0)
    iceSprite.setFlag(SpriteFlag.AutoDestroy, true)
})
