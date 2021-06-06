//Define all operators that require more than one operand. 
//Operators that require only one operand do not require storage because the operation is executed immediately without waiting for further input.
const Op={
    None: 'None',
    Add: 'Add',
    Subtract: 'Subtract',
    Divide: 'Divide',
    Multiply: 'Multiply',
    Equal: 'Equal' //Allow chaining calculations after equals. Op.None does not allow chaining.
};

let operand={
    numStr: '',
    clear: function(){
        this.numStr='';
    },
    getValue:function()
    {
        if(this.numStr=='') return 0;
        return parseFloat(this.numStr);
    },
    setValue:function(str)
    {
        this.numStr=str;
    },
    appendDigit: function(n){
        if(n=='.')
        {
            //Do not allow more than one decimal
            if((/\./).test(this.numStr)) return;
        }    
        this.numStr+=n;             
        lcd.update(this.numStr);
    }
};

let calculator={
    subtotal: 0,
    operator: Op.None, //Start with no operator active
    newNumber: true, //Single operand operators affect either the current operand being entered or the answer to the previous calculation.
    //The choice depends on if any new digit or decimal has been entered yet or not.
    doAdd: function(){
        this.subtotal+=operand.getValue(); 
    },
    doSubtract: function(){
        this.subtotal-=operand.getValue();  
    },
    doMultiply: function(){
        this.subtotal*=operand.getValue();   
    },
    doDivide: function(){
        //Prevent division by zero
        if (operand.getValue()!=0){
            this.subtotal/=operand.getValue();
        }
        else
        {
            alert('Error: Divide by zero');
            operand.clear();
        }        
    },
    doNegate: function(){
        if (this.newNumber){
            this.subtotal=0-parseFloat(this.subtotal);
            lcd.update(this.subtotal);            
        }
        else{
            operand.setValue((0-parseFloat(operand.getValue())).toString());
            lcd.update(operand.numStr);
        }                       
    },
    doInverse: function(){        
        if (this.newNumber){
            if(this.subtotal!=0){
                this.subtotal=1/parseFloat(this.subtotal);
                lcd.update(this.subtotal);            
            }
            else{
                alert('Error: Divide by zero');                
            }
        }
        else{
            if(operand.getValue()!=0){
                operand.setValue((1/parseFloat(operand.getValue())).toString());
                lcd.update(operand.numStr);
            }
            else{
                alert('Error: Divide by zero');                
            }
        }                       
    },
    doSquare: function(){
        if (this.newNumber){
            this.subtotal=parseFloat(this.subtotal)**2;
            lcd.update(this.subtotal);            
        }
        else{
            operand.setValue((parseFloat(operand.getValue())**2).toString());
            lcd.update(operand.numStr);
        }                       
    },
    doRoot: function(){
        if (this.newNumber){
            this.subtotal=parseFloat(this.subtotal)**0.5;
            lcd.update(this.subtotal);            
        }
        else{
            operand.setValue((parseFloat(operand.getValue())**0.5).toString());
            lcd.update(operand.numStr);
        }                       
    },
    setOperator: function(o){
        //At the start of a new calculation, the operator is Op.None and the subtotal is 0. 
        //The subtotal is set to the value of the current operand only when it's a new calculation.       
        if(this.operator==Op.None) this.subtotal=operand.getValue();    
        switch (o){
            case '+':
                this.calculate();                
                this.operator=Op.Add;
            break;
            case '-':
                this.calculate();                
                this.operator=Op.Subtract;
            break;
            case '*':
                this.calculate();                
                this.operator=Op.Multiply;
            break;
            case '/':
                this.calculate();                
                this.operator=Op.Divide;
            break;              
            case '=':
                this.calculate();                
                //To allow chaining of calculations, Op.Equal is handled differently from Op.None
                this.operator=Op.Equal;
            break;
        }
        //The operand is cleared to prepare for entry of the next operand.
        //It is no longer needed since it is either used in a calculation or the subtotal's value is set equal to it.
        operand.clear(); 
        this.newNumber=true;
    },
    calculate: function(){
        switch(this.operator){
            case Op.Add:
                this.doAdd();
            break;
            case Op.Subtract:
                this.doSubtract();
            break;
            case Op.Multiply:
                this.doMultiply();
            break;
            case Op.Divide:
                this.doDivide();
            break;
        }
        lcd.update(this.subtotal);        
    }
};