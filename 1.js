document.addEventListener('DOMContentLoaded', function () {
    const numberInput = document.getElementById('numberInput');
    const buttons = document.querySelectorAll('.allButtons');
    const clearButton = document.getElementById('c');
    const equalButton = document.querySelector('.equal');
    const decimalButton = document.querySelector('.decimal');

    let currentInput = '0';
    let currentOperation = null;
    let previousInput = null;
    let afterEqual = false;

    // Add click event listeners to number buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
        //if current input is other than 0, it shows up as an error and that i true, it needs to be changed
            if (currentInput === '0' || currentInput === 'Error' || afterEqual) {
                currentInput = button.textContent;
                // Reset afterEqual flag
                afterEqual = false; 
            } else {
                //If is false, then allows user to put in multiple digits
                currentInput += button.textContent;
            }
            //update the display
            updateDisplay();
        });
    });

    // Add click event listener to equal button
    equalButton.addEventListener('click', () => {
        //when clicked it will preform the equal function and update display
        performOperation();
        updateDisplay();
        afterEqual = true; // Set afterEqual flag to true after pressing equal
    });

    function performOperation() {
        if (previousInput !== null && currentOperation !== null) {
            let previousValue = parseFloat(previousInput);
            let currentValue = parseFloat(currentInput);

            //check type of operation selected
            //if it's addition, preform it
            if (currentOperation === '+') {
                currentInput = (previousValue + currentValue).toString();
            //if it's addition, preform it
            } else if (currentOperation === '-') {
                currentInput = (previousValue - currentValue).toString();
            //if it's subtraction, preform it
            } else if (currentOperation === '*') {
                currentInput = (previousValue * currentValue).toString();
            //if it's division, preform it
            } else if (currentOperation === '/') {
                //if divided by 0, show error
                if (currentValue !== 0) {
                    currentInput = (previousValue / currentValue).toString();
                } else {
                    currentInput = 'Error';
                }
            }
        // Reset previous input and current operation after performing the operation
            previousInput = null;
            currentOperation = null;
        }
    }

    // Add click event listener to operation buttons
    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener('click', () => {
            performOperation();
            currentOperation = button.textContent.trim();
            previousInput = currentInput;
            currentInput = '0';
            updateDisplay();
        });
    });

    //add the decimal button
    decimalButton.addEventListener('click', () => {
        handleDecimalInput();
    });
    
    // Function to handle decimal input
    function handleDecimalInput() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    // Function to update the display
    function updateDisplay() {
        numberInput.innerHTML = `<p>${currentInput}</p>`;
    }

    // Add click event listener to clear button
    clearButton.addEventListener('click', () => {
        currentInput = '0';
        currentOperation = null;
        previousInput = null;
        afterEqual = false; 
        // Reset afterEqual flag
        updateDisplay();
    });
});
