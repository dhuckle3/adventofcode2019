const fs = require('fs');
const os = require('os');

const {
    fuelCalc,
    fuelCalcWithFuelMass
} = require('./calc');

const data = fs.readFileSync('../../data/input01.txt', 'utf-8');

console.log(
    data
        .split(os.EOL)
        .map(item => parseInt(item))
        .filter(num => !isNaN(num))
        .reduce((acc, val) => { return acc + fuelCalc(val)}, 0)
);

console.log(
    data
        .split(os.EOL)
        .map(item => parseInt(item))
        .filter(num => !isNaN(num))
        .reduce((acc, val) => { return acc + fuelCalcWithFuelMass(val)}, 0)
);
