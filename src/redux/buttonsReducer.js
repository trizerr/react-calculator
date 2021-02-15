import {calculate} from "../logic/calculation";
import {current} from "@reduxjs/toolkit";

let FUNCTIONAL = 'functional';
let OPERATION = 'operation';
let NUMBER = 'number';
let BUTTON_PRESSED = 'BUTTON_PRESSED';
let DELETE = 'C';
let CLEAR = 'AC';
let EQUAL = '=';


let initialState = {
    numbers: [],
    operations: [],
    numberIndex: 0,
    lastSymbol: null,
    lastSymbolType: 'none',
    field: '',
    isOperationAllowed: false,
    currentNumber: null,
    result: '',
    resultCalculated: false,
    isDotAllowed: false,
    isNumberAllowed: true
}

export let buttonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUTTON_PRESSED:
            switch (action.buttonType) {
                case NUMBER: {
                    return numberEntered(state, action.button)
                }
                case OPERATION: {
                    return operationEntered(state, action.button)
                }
                case FUNCTIONAL: {
                    return functionalEntered(state, action.button)
                }
            }
            return {
                ...state,
                ...action.data,
                isLoggedIn: true,
                wrongPassword: false
            }
        default:
            return state;
    }
}

export let buttonPressed = (button, buttonType) => ({type: BUTTON_PRESSED, button, buttonType});

let numberEntered = (state, number) => {
    let newNumber;
    if (state.resultCalculated)
        state = functionalEntered(state, CLEAR); //when result is shown and number entered

    state.currentNumber === null ?//check if current number is not empty
        newNumber = number :
        newNumber = state.currentNumber + number;

    state.numbers[state.numberIndex] = newNumber; //add number to array
    let result = calculate(state.operations, state.numbers); //find result
    let newField = state.field + number;

    return {
        ...state,
        currentNumber: newNumber,
        numbers: [...state.numbers],
        field: newField,
        result: result,
        isOperationAllowed: isOperationAllowed(newField),
        isDotAllowed: isDotAllowed(newNumber),
        isNumberAllowed: isNumberAllowed(newField)
    }
}
let operationEntered = (state, operation) => {
    let result = state.result;
    let newField = state.field + operation;
    if (operation === '%') {
        state.operations.push(operation); //push and pop operation for calculating result
        result = calculate(state.operations, state.numbers);
        state.operations.pop();
        return {
            ...state,
            operations: [...state.operations, operation],
            field: newField,
            currentNumber: null,
            isOperationAllowed: isOperationAllowed(newField),
            resultCalculated: false,
            result: result,
            isDotAllowed: false,
            isNumberAllowed: isNumberAllowed(newField)
        }
    }
    return {
        ...state,
        operations: [...state.operations, operation],
        numberIndex: state.numberIndex + 1,
        field: newField,
        currentNumber: null,
        isOperationAllowed: isOperationAllowed(newField),
        resultCalculated: false,
        result: result,
        isDotAllowed: false,
        isNumberAllowed: isNumberAllowed(newField)
    }
}
let functionalEntered = (state, button) => {
    switch (button) {
        case EQUAL: {
            let result = calculate(state.operations, state.numbers); //find result
            return {
                ...state,
                field: result.toString(),
                numbers: [result.toString()],
                operations: [],
                numberIndex: 0,
                result: '',
                currentNumber: result.toString(),
                isOperationAllowed: true,
                resultCalculated: true,
                isDotAllowed: false,
                isNumberAllowed: true
            }
        }
        case CLEAR: {
            return {
                ...state,
                field: '',
                numbers: [],
                operations: [],
                numberIndex: 0,
                result: '',
                currentNumber: null,
                isOperationAllowed: false,
                resultCalculated: false,
                isDotAllowed: false,
                isNumberAllowed: true
            }
        }
        case DELETE: {
            let newField = state.field.slice(0, -1);
            let isLastCharNumeric = Number(state.field.slice(-1)); //check is last character is numeric

            if (isLastCharNumeric || state.field.slice(-1) === '.' || state.field.slice(-1) === '0') {
                //check if last symbol is not operation
                state.currentNumber = state.currentNumber.slice(0, -1);
                state.numbers[state.numberIndex] = state.currentNumber; //delete number
                let result;
                if (state.currentNumber === '') {
                    state.numbers.pop() //delete from array if number is fully cleared
                    let temp = state.operations.pop();
                    result = calculate(state.operations, state.numbers);
                    state.operations.push(temp);
                } else {
                    result = calculate(state.operations, state.numbers);
                }
                return {
                    ...state,
                    field: newField,
                    numbers: [...state.numbers],
                    result: result,
                    isOperationAllowed: isOperationAllowed(newField),
                    resultCalculated: false,
                    isDotAllowed: isDotAllowed(state.currentNumber),
                    isNumberAllowed: isNumberAllowed(newField)
                }
            } else {
                state.operations.pop(); //delete operation
                let newNumberIndex;
                if (state.field.slice(-1) === '%') {
                    newNumberIndex = state.numberIndex
                } else {
                    newNumberIndex = state.numberIndex - 1;
                }
                let result = calculate(state.operations, state.numbers);
                return {
                    ...state,
                    field: newField,
                    numberIndex: newNumberIndex,
                    currentNumber: state.numbers[newNumberIndex],
                    operations: [...state.operations],
                    result: result,
                    isOperationAllowed: isOperationAllowed(newField),
                    resultCalculated: false,
                    isDotAllowed: isDotAllowed(state.numbers[newNumberIndex]),
                    isNumberAllowed: isNumberAllowed(newField)
                }
            }
        }
        default:
            return {...state}
    }
}

let isOperationAllowed = (field) => Number(field.slice(-1)) || field.slice(-1) === '0' || field.slice(-1) === '%';
let isDotAllowed = (number) => !Array.from(number).some(symbol => symbol === '.');
let isNumberAllowed = (currentNumber) => currentNumber.slice(-1) !== '%';
