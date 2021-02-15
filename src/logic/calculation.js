export let calculate = (operations, numbers) => {
    operations = [...operations];
    numbers = [...numbers];
    numbers = parseToNumber(numbers); //convert string to number
    while (findPercent(operations) !== -1) {
        let index = findPercent(operations);
        if (numbers[index - 1] === undefined) {
            numbers[index] = numbers[index] / 100;
        } else {
            numbers[index] = numbers[index - 1] * numbers[index] / 100;
        }
        operations = filterAfterPercent(operations, index);
    }

    while (findMultiplication(operations) !== -1) { //while there is a multiplication it will run
        let index = findMultiplication(operations); //finding index of first multiplication
        numbers[index] = numbers[index] * numbers[index + 1];
        [operations, numbers] = filter(operations, numbers, index); //deleting operation
        // and putting numbers array in order
    }

    while (findDevision(operations) !== -1) {
        let index = findDevision(operations);
        numbers[index] = numbers[index] / numbers[index + 1];
        [operations, numbers] = filter(operations, numbers, index);
    }

    while (findSubtraction(operations) !== -1) {
        let index = findSubtraction(operations);
        numbers[index] = numbers[index] - numbers[index + 1];
        [operations, numbers] = filter(operations, numbers, index);
    }
    while (findAddition(operations) !== -1) {
        let index = findAddition(operations);
        numbers[index] = numbers[index] + numbers[index + 1];
        [operations, numbers] = filter(operations, numbers, index);
    }
    return numbers[0];
}

let parseToNumber = (numbers) => {
    return numbers.map((number) => {
        return Number(number)
    });
}

let filter = (operations, numbers, index) => {
    operations[index] = null;
    numbers[index + 1] = null;
    numbers = numbers.filter(number => number !== null);
    operations = operations.filter(operation => operation !== null);
    return [operations, numbers];
}
let filterAfterPercent = (operations, index) => {
    operations[index] = null;
    operations = operations.filter(operation => operation !== null);
    return operations;
}

let findMultiplication = (array) => {
    return array.findIndex(operation => operation === '*');
}
let findDevision = (array) => {
    return array.findIndex(operation => operation === '/');
}
let findAddition = (array) => {
    return array.findIndex(operation => operation === '+');
}
let findSubtraction = (array) => {
    return array.findIndex(operation => operation === '-');
}
let findPercent = (array) => {
    return array.findIndex(operation => operation === '%');
}