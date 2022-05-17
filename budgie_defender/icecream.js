function IceCream(x, y){
    return [
        sprite("icecream"),
        layer("game"),
        pos(x, y),
        scale(0.2),
        area(),
        move(270, 600),      
        cleanup(),
        "icecream"
      ]
}