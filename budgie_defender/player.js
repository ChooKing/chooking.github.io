function Player(){        
   return [
    sprite("budgie"),
    layer("game"),
    pos(width()/2, height() - 250),
    scale(0.2),
    area(),    
    {
        id: "budgie",    
        speed: 0,           
        update(){
            this.pos.x += this.speed;
            if(this.pos.x < 0) this.pos.x = 0;
            if(this.pos.x + (this.width * 0.2) > width()) this.pos.x = width() - (this.width * 0.2);
        }
    }
  ]   
}