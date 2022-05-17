function UFO(x, y, dir, speed, incCount){
    return [
        sprite("ufo"),
        layer("game"),
        pos(x, y),
        scale(0.25),
        z(1),
        area(),
        move(dir, speed),        
        cleanup(),        
        {
            id: "ufo",    
            speed: speed,
            waiting: false,    
            alive: true,         
            update(){
               let attackTime = rand(1000) + (40000/speed);
                if (!this.waiting){
                    this.waiting = true;
                    setTimeout(()=>{
                       this.waiting = false;
                       if (this.alive) this.launchSnake();
                     }, attackTime);
                }            
            },
            launchSnake(){
               const snake = add(Snake(this.pos.x + 50, this.pos.y + 35, dir, speed));
               snake.play("slither");
               snake.onCollide("icecream", ()=>{
                   setTimeout(()=>{
                       destroy(snake);
                     }, 50);
               });                                   
            }
        }
      ]
 }