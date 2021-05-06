   

 
     // This function is defined with an arrow function
     const onAdd = () => {
        let value1 = document.getElementById("value1").value; 
        let value2 = document.getElementById("value2").value; 
        const pattern = /[0-9]/g;
        let validValue1 = value1.match(pattern);
        let validValue2 = value2.match(pattern);
        if(validValue1 && validValue2){
        let sum = Number(value1) + Number(value2);
        document.getElementById("result").innerHTML = sum; 
        } else {
            document.getElementById("result").innerHTML = "Please, input both values as numbers";
        }         
    } 
    // This function is defined with a function declaration 
    function onSubtract() {
        let value1 = document.getElementById("value1").value; 
        let value2 = document.getElementById("value2").value; 
        const pattern = /[0-9]/g;
        let validValue1 = value1.match(pattern);
        let validValue2 = value2.match(pattern);
        if(validValue1 && validValue2){
        let difference = Number(value1) - Number(value2);
        document.getElementById("result").innerHTML = difference; 
        } else {
            document.getElementById("result").innerHTML = "Please, input both values as numbers";
        }         
    }  
    
    // This function is defined with a function expression
    const onMultiply = function() {
        let value1 = document.getElementById("value1").value; 
        let value2 = document.getElementById("value2").value; 
        const pattern = /[0-9]/g;
        let validValue1 = value1.match(pattern);
        let validValue2 = value2.match(pattern);
        if(validValue1 && validValue2){
        let product = Number(value1) * Number(value2);
        document.getElementById("result").innerHTML = product; 
        } else {
            document.getElementById("result").innerHTML = "Please, input both values as numbers";
        }         
    }   