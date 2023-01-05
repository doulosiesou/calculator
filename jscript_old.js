let mpString = '';
let upperPanelText = document.querySelector('.text.output.history')
let middlePanelText = document.querySelector('.text.input.results');
let result;
let reduced;
let operator;
let iter = 0;
let reducedResult = [];
let combinedArray = [];
let operatorArray = [];
const integers = ['0','1','2','3','4','5','6','7','8','9'];

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

const oneOp = function(operatorArray, combinedArray) {

    let operator = operatorArray[0];
    
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

const reduce = function(operatorArray, combinedArray) {
    console.log(`Entered reduce(): operatorArray is ${operatorArray}: combinedArray is ${combinedArray}`);
    
    if(operatorArray.length === 1) {
        return oneOp(operatorArray, combinedArray); 
    };
    
    // Check for multiplication or division

    let count = 0;

    while(operatorArray.includes('*') || operatorArray.includes('/')) {
        console.log('Entered into */ operations');
        operator = operatorArray[count];
        console.log(`operator is ${operatorArray[i]}`);


        if(operator === '*') {
            reduced = Number(multiply(combinedArray[count], combinedArray[count+1]));
            console.log(`reduced is ${reduced}`);
            combinedArray.splice(count, 2, reduced);
            operatorArray.splice(count, 1);
            console.log(`after 1 iteration combinedArray is ${combinedArray} and operatorArray is ${operatorArray}`);

        } else if(el === '/') {
            reduced = Number(divide(combinedArray[count], combinedArray[count+1]));
            console.log(`reduced is ${reduced}`);
            combinedArray.splice(count, 2, reduced);
            operatorArray.splice(count, 1);
        }
        count += 1;
    };           
        
    
    if(operatorArray.length === 1) {
        operator = operatorArray[0];
        return oneOp(operator, combinedArray); 
    };

    while(operatorArray.length > 1) {

        if(operatorArray[0] === '+') {
            reduced = add(combinedArray[0], combinedArray[1]);
            combinedArray.splice(0, 2, reduced);
            operatorArray.splice(0,1);
            if(operatorArray.length === 1 && operatorArray[0] === '+') {
                return Number(add(Number(combinedArray[0]), Number(combinedArray[1])));
            };

        } else if(operatorArray[0] === '-') {
            reduced = subtract(combinedArray[0], combinedArray[1]);
            combinedArray.splice(0, 2, reduced);
            operatorArray.splice(0,1);
            if(operatorArray.length === 1 && operatorArray[0] === '-') {
                return Number(subtract(Number(combinedArray[0]), Number(combinedArray[1])));
            };
        }
    };

    operator = operatorArray[0];
    return oneOp(operator, combinedArray); 
};



const operate = function(mpString) {

    let index;
        
    const splitArray = mpString.split(/\+|\-|\*|\/|\=/);
    const slicedArray = splitArray.slice(0, splitArray.length - 1);    
    const combinedArray = slicedArray;
    console.log(`combinedArray is equal to: ${combinedArray}`);

    for (const char of mpString) {

        if(char === '+' || char === '-' || char === '*' || char === '/') {
            operatorArray.push(char);
        };
    };
    
    if(operatorArray.length === 1) {
        
        result = oneOp(operatorArray, combinedArray);
        console.log(`result is equal to ${result}`);
        return result;
    };
    
    console.log(`calling the reduce method, operatorArray is ${operatorArray} and combinedArray is ${combinedArray}`);
    result = reduce(operatorArray, combinedArray)  
    console.log(`the reducedResult of the combinedArray ${combinedArray} is ${result}`);
    return result
    
};  
    
const buttonArray = document.querySelectorAll('button');

for (const button of buttonArray) {
    button.addEventListener("click", function() {

        mpString += button.textContent;

        if (button.textContent === '=') {
            upperPanelText.textContent = mpString;
            result = operate(mpString);
            console.log(`mpString is ${mpString} and result of operation is ${result}`);
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
