function Supply(x, y){
    return [
        sprite("supplies"),
        layer("game"),
        pos(x, y),
        scale(0.5),
        z(1),
        area(),
        move(90, 250),
        cleanup(),
        "supplies"
    ]
}