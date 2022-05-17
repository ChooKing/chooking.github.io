function LoadSprites(){
    loadSprite("background", "./background.bmp");
    loadSprite("budgie", "./budgie.bmp");
    loadSprite("deadbudgie", "./deadbudgie.bmp");
    loadSprite("icecream", "./icecream.bmp");
    loadSprite("supplies", "./bigicecream.bmp",{
    sliceX: 3,
    anims: {
        "sparkle":{
        from: 0, 
        to: 2,
        speed: 5,
        loop: true
        }
    }
    })
    loadSprite("snake", "./python.bmp",{
    sliceX: 2,
    anims: {
        "slither": {
        from: 0,
        to: 1,
        speed: 5,
        loop: true
        }
    }
    });
    loadSprite("explosion", "./explosion.bmp", {	
        sliceX: 5,	
        anims: {
            "explode": {			
                from: 0,
                to: 4,
                speed: 20,      
                loop: false,
            }
        }
    });
    loadSprite("ufo", "./ufo.bmp");
}