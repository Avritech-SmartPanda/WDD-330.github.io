//Requirement 1
function read() {
    let value1 = document.getElementById("first").value;
    if (parseInt(value1)) { //checks to see if the value is a number
        summation(value1);
    } else {
        //displays the value into the div in Html
        document.getElementById("results").innerHTML = `<p>Not a number.</p>`;
    }
}

//Requirement 2
function summation(value1) {
    let result = 0;
    // Adds all the numbers together
    for (let i = 0; i <= value1; i++) {
        result += i;
    }
    return document.getElementById("results").innerHTML = `<p>Summation: ${result} </p>`;
}



// This function is defined with an arrow function
const onAdd = () => {
    let num1 = document.getElementById("value1").value;
    let num2 = document.getElementById("value2").value;
    let sum = Number(num1) + Number(num2);
    display(num1, num2, sum);

}
// This function is defined with a function declaration 
function onSubtract() {
    let num1 = document.getElementById("value1").value;
    let num2 = document.getElementById("value2").value;
    let difference = Number(num1) - Number(num2);
    display(num1, num2, difference);
}

// This function is defined with a function expression
const onMultiply = function () {
    let num1 = document.getElementById("value1").value;
    let num2 = document.getElementById("value2").value;
    let result = Number(num1) * Number(num2);
    display(num1, num2, result);

}



// Callback
function solve(calculate) {
    // button calls this solve function while passing the operations (onMult, onSub, onAdd)
    // and displaying the results.
    calculate();
}

// Validate input and display result
function display(num1, num2, result) {
    const pattern = /[0-9]/g;
    let validValue1 = num1.match(pattern);
    let validValue2 = num2.match(pattern);
    if (validValue1 && validValue2) {
        return document.getElementById("result").innerHTML = `<p>Solved: ${result} </p>`;
    } else {
        return document.getElementById("result").innerHTML = "Please, input both values as numbers";
    }
}






//Requirement 3
// const onAdd = () => {
//     let value2 = document.getElementById("value2").value;
//     let value3 = document.getElementById("value3").value;
//     //Converting input value to numbers ... Number()
//     let result = Number(value2) + Number(value3);
//     document.getElementById("result2").innerHTML = `<p>answer: ${result} </p>`;

// }

// const onSub = () => {
//     let value2 = document.getElementById("value2").value;
//     let value3 = document.getElementById("value3").value;
//     let result = Number(value2) - Number(value3);
//     document.getElementById("result2").innerHTML = `<p>answer: ${result} </p>`;
// }

// const onMult = () => {
//     let value2 = document.getElementById("value2").value;
//     let value3 = document.getElementById("value3").value;
//     let result = Number(value2) * Number(value3);
//     return result;
// }