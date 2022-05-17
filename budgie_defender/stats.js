const ScoreDiv = document.querySelector("#scoreNumber");
const AmmoDiv = document.querySelector("#ammoNumber");
const LevelDiv = document.querySelector("#levelNumber");
const LivesDiv = document.querySelector("#livesNumber");

class Stats{
    constructor(level, ammo, lives, score){
        this.level = level;
        this.ammo = ammo;
        this.lives = lives;
        this.score = score;
    }
    setScore(score){
        this.score = score;
        ScoreDiv.innerText = this.score;
    }
    setAmmo(ammo){
        this.ammo = ammo;
        AmmoDiv.innerText = this.ammo;
    }
    setLevel(level){
        this.level = level;
        LevelDiv.innerText = this.level;
    }
    setLives(lives){
        this.lives = lives;
        LivesDiv.innerText = this.lives;
    }
}