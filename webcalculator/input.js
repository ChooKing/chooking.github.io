//Use a single event handler for all button clicks instead of a separate handler for each
let btnContainer=document.querySelector('#ButtonsContainer');
btnContainer.addEventListener('click',(e)=>{
    //Strip btn from the id of the element that triggered the click listener only if it starts with btn    
    let btnName=/^btn/.test(e.target.id) ? e.target.id.substring(3) : null;    
    //Safari does not support regex look around
    //let btnName=e.target.id.match(/(?<=btn)\S*/)[0]; 
    
    //All digits and decimals are processed by the same function  
    if (/^[\d.]$/.test(btnName)){
        operand.appendDigit(btnName);
        calculator.newNumber=false;
    }
    else 
    {        
        //Clicking in the gap between buttons generates an id that does not begin with btn. This results in btnName being null.
        if (btnName!==null)
        {
            //Only store the operator if it uses two operands            
            if(/[\/\*\-\+\=]/.test(btnName))  calculator.setOperator(btnName);
            else{
                //process operators that use only one operand
                switch (btnName){
                    case 'Negate':
                        calculator.doNegate();
                    break;
                    case 'Inverse':
                        calculator.doInverse();
                    break;
                    case 'Square':
                        calculator.doSquare();
                    break;
                    case 'Sqrt':
                        calculator.doRoot();
                    break;
                }
            }
        }
    }
});

//Listen for keyboard input
document.addEventListener('keypress',(e)=>{
    if (/[\d\.]/.test(e.key)){
        operand.appendDigit(e.key);
        calculator.newNumber=false;
    }
    else{        
        if(/[\/\*\-\+\=]/.test(e.key))  calculator.setOperator(e.key);
        else{
            switch (e.key.toLowerCase()){
                case 'n':
                    calculator.doNegate();
                break;
                case 'i':
                    calculator.doInverse();
                break;
                case 's':
                    calculator.doSquare();
                break;
                case 'r':
                    calculator.doRoot();
                break;
            }
        }
    }
});