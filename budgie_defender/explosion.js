function Explosion(x, y){
    return [
        sprite("explosion"),
        layer("game"),
        pos(x, y),
        origin("center"),
        scale(0.5),
        lifespan(0.25)
      ]
}