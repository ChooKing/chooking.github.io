function Snake(x, y, dir, speed){
    return [
        sprite("snake"),
        layer("game"),
        pos(x, y),
        scale(0.25),
        area(),
        z(0),
        body(),
        move(dir, speed*0.9),
        cleanup(),
        "snake"
    ]

}