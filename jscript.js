// Declare global scope variables

let mpString = '';
let upperPanelText = document.querySelector('.text.output.history')
let middlePanelText = document.querySelector('.text.input.results');
let result;
let reduced;
let operator;

let reducedResult = [];
let combinedArray = [];
let operatorArray = [];
const integers = ['0','1','2','3','4','5','6','7','8','9'];

// Define basic mathematic operation functions

const add = function(a, b) {
    return Number(a + b);
}

const subtract = function(a, b) {
    return Number(a - b);
}

const multiply = function(a, b) {
    return Number(a * b);
}

const divide = function(a, b) {
    return Number(a / b);
}

const clear = function() {
    return '';
}

// Define a function for 1 single operation with 2 numbers

const oneOp = function(operatorArray, combinedArray) {

    operator = operatorArray[0];
    
        if(operator === '+') {
            return add(Number(combinedArray[0]), Number(combinedArray[1]));
        } else if(operator === '-') {
            return subtract(Number(combinedArray[0]), Number(combinedArray[1]))
        } else if(operator === '*') {
            return multiply(Number(combinedArray[0]), Number(combinedArray[1]));
        } else if(operator === '/') {
            return divide(Number(combinedArray[0]), Number(combinedArray[1]));
        };
};

// Define the reduce function which reduces an array of operators to a single value
// Uses the operatorArray (an array of operation symbols from input) and the combinedArray of numbers
// Ex: 80-2*5+20/2
// combinedArray = [80, 2, 5, 20, 2]
// operatorArray = ['-', '*', '+', '/']

const reduce = function(operatorArray, combinedArray) {
        
    // Check operatorArray for just 1 operation:

    if(operatorArray.length === 1) {
        operator = operatorArray[0];
        return oneOp(operator, combinedArray); 
    };
    
    // Check for multiplication or division operators and reduce the numbers operated on and replace the 2 numbers
    // from original array with the result

    while(operatorArray.includes('*')) {

        // check for single operator and if exists, find simple operation from oneOp

        if(operatorArray.length === 1) {
            operator = operatorArray[0];
            return oneOp(operator, combinedArray); 
        };

        // Multiply the 2 numbers and reduce the 2 numbers with result

        index = operatorArray.indexOf('*');
        reduced = Number(multiply(Number(combinedArray[index]), Number(combinedArray[index+1])));
        combinedArray.splice(index, 2, reduced);
        operatorArray.splice(index, 1);
    }

    while(operatorArray.includes('/')) {
        if(operatorArray.length === 1) {
            operator = operatorArray[0];
            return oneOp(operator, combinedArray); 
        };

        index = operatorArray.indexOf('/')
        reduced = Number(divide(Number(combinedArray[index]), Number(combinedArray[index+1])));
        combinedArray.splice(index, 2, reduced);
        operatorArray.splice(index, 1);
     }

    if(operatorArray.length === 1) {
        operator = operatorArray[0];
        return oneOp(operator, combinedArray); 
    };

    // Reduce operator array to a single value (should only be addition and subtraction operators now)

    for(operator of operatorArray) {
        if(operatorArray.length === 1) {
            operator = operatorArray[0];
            return oneOp(operator, combinedArray); 
        };
        
        // if operator is a subtraction sign, turn the corresponding number to a negative value

        if(operator === '-') {
            index = operatorArray.indexOf(operator)
            combinedArray[index+1] = -1 * combinedArray[index+1]
        }; 
    };
    
    // Reduce entire array to single value with for loop

    let sum = 0;
    for (let i = 0; i < combinedArray.length; i += 1) {
        sum += Number(combinedArray[i]);
    };
    return sum

};

const operate = function(mpString) {

    // Take operations keyed into calculator and turn into a string, then an array

    const splitArray = mpString.split(/\+|\-|\*|\/|\=/);
    const slicedArray = splitArray.slice(0, splitArray.length - 1);    
    const combinedArray = slicedArray;
    
    for (const char of mpString) {

        if(char === '+' || char === '-' || char === '*' || char === '/') {
            operatorArray.push(char);
        };
    };

    if(operatorArray.length === 1) {
        result = oneOp(operatorArray, combinedArray);
        return result;
    };
    
    result = reduce(operatorArray, combinedArray)  
    return result
};  

// Main loop for program

const buttonArray = document.querySelectorAll('button');

for (const button of buttonArray) {
    button.addEventListener("click", function() {

        mpString += button.textContent;

        if (button.textContent === '=') {
            upperPanelText.textContent = mpString;
            result = operate(mpString);
        };

        middlePanelText.textContent = mpString;

        if(result) {
            middlePanelText.textContent = result;
        };

        if(button.textContent === 'CE') {
            mpString = clear();
            middlePanelText.textContent = clear();
            combinedArray = [];
            result = 0;
            
        }

        if(button.textContent === 'C') {
            mpString = clear();
            middlePanelText.textContent = clear();
            upperPanelText.textContent = clear(); 
            window.location.reload();
        }
        
    });
};

middlePanelText.textContent = result;
