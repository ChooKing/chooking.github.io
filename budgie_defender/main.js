import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

const AMMO_SIZE = 50;
const STATUS_HEIGHT = 100;
const POINTS_PER_LEVEL = 10;
const INITIAL_GRAVITY = 150;
const GRAVITY_PER_LEVEL = 20;
const Game = {
  level: 1,
  lives: 4,
  ammo: AMMO_SIZE,
  score: 0,
  targetCount: 0 //Used for determining when to drop new supplies
};
const stats = new Stats(Game.level, Game.ammo, Game.lives, Game.score);
let shootCounter = 0;
let ufoRequestCounter = 0;


window.onload = ()=>{
  canvas.focus();
}

function updateScore(score){
  Game.score = score;
  stats.setScore(Game.score);
  if (Game.level -1 != Math.floor(score / POINTS_PER_LEVEL)){
    Game.level = Math.floor(score / POINTS_PER_LEVEL) + 1;
    stats.setLevel(Game.level);
    ctx.gravity(INITIAL_GRAVITY + GRAVITY_PER_LEVEL * Game.level);
  }  
}
function incrementTargetCount(){
  Game.targetCount += 1;
}

const ctx = kaboom({
  canvas: document.querySelector("#game"),
  height: window.innerHeight - STATUS_HEIGHT,
  width: window.innerWidth  
});
LoadSprites();

scene("game", () => {  
  gravity(150);
  layers(["bg","game","stats",], "game");
  const bg = add(background());  
  bg.scaleTo(Math.max(
    width() / bg.width,
    height() / bg.height
  ))
  let budgie = add(Player());
  budgie.pos.x = width()/2 - budgie.width/10;  
  budgie.pos.y = height() - (budgie.height * 0.2)

  function shoot(){
    Game.ammo -= 1;
    stats.setAmmo(Game.ammo);
    const icecream = add(IceCream(budgie.pos.x + budgie.width/10 - 12, budgie.pos.y + 20));
  }
  function addSupplies(){
    const supply = add(Supply(rand(width() - budgie.width) + budgie.width/2, -20));
  }
  function addUFO(){
    ufoRequestCounter += 1;
    if((Game.level > 35)||(ufoRequestCounter >35 - Game.level)){
      Game.targetCount += 1;
      if(Game.targetCount > AMMO_SIZE/4){
        Game.targetCount = 0;
        addSupplies();
      }
      let ufoDir = rand(2) >= 1 ? 0 : 180;
      let ufoSpeed = Math.min(Game.level * 20, 800)
      const ufo = add(UFO(rand(width() - budgie.width) + budgie.width/2, rand(height()/2)+50, ufoDir, ufoSpeed, incrementTargetCount));      
      ufoRequestCounter = 0;
    }    
  }
  function rotateBudgie(x, y, angle){
    if(angle<=90){
      console.log("rotating");
      const deadBudgie = add([
        sprite("deadbudgie"),
        scale(0.2),
        origin("bot"),
        pos(x, y),        
        rotate(angle)
      ]);
      wait(0.05, ()=>{
        destroy(deadBudgie);
        rotateBudgie(x+3, y-9, angle + 10);
      })
    }
    else if(Game.lives > 0){
      wait(0.5, ()=>{
        budgie = add(Player());
        budgie.pos.x = width()/2 - budgie.width/10;  
        budgie.pos.y = height() - (budgie.height * 0.2)
      })      
    }
  }
  function playerDies(){
    Game.lives -= 1;
    stats.setLives(Game.lives);
    every("icecream", destroy);
      every("supplies", destroy);
      const x = budgie.pos.x;
      const y = budgie.pos.y;
      const h = budgie.height * 0.2;
      destroy(budgie);
      rotateBudgie(x+25, y + h, 0);
      every("ufo", (ufo)=>{
        ufo.alive = false;
        destroy(ufo);
      });
      every("snake", destroy);
    if(Game.lives < 1){      
      console.log("GAME OVER");      
    }  
  }
  onCollide("ufo", "icecream", (a, b)=>{            
    if (a.alive) updateScore(Game.score + 5);
    a.alive = false;
    const explosion = add(Explosion(b.pos.x + 9, b.pos.y));
    explosion.play("explode");
    setTimeout(()=>{
      destroy(a);
    }, 250);
    destroy(b);
  });
  onCollide("icecream", "snake", (a, b)=>{
    updateScore(Game.score + 1);
    destroy(a);
    destroy(b);
  })
  onCollide("budgie", "supplies", (a, b)=>{
    Game.ammo += AMMO_SIZE;
    stats.setAmmo(Game.ammo);
    destroy(b);
  })
  onCollide("snake", "budgie", (a)=>{
    destroy(a);
    playerDies();
  })
  onKeyDown("left", ()=>{
    budgie.speed -= 2
  });
  onKeyDown("right", ()=>{
    budgie.speed += 2
  });
  onKeyDown("space", ()=>{
    shootCounter += 1;
    if(shootCounter > 5){
      shoot();
      shootCounter = 0;
    }    
  });
  onKeyRelease("left", ()=>{
    budgie.speed = 0
  });
  onKeyRelease("right", ()=>{
    budgie.speed = 0
  });  
  loop(0.1, ()=>{
    if(Game.lives>0){
      addUFO();
    }    
  })
})
go("game");