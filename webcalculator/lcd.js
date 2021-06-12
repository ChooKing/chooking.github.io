let lcd={
    display: document.querySelector('#LCD'),
    update: function(str){
        this.display.innerText=str;        
    }
}