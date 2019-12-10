const {
    fuelCalc,
    fuelCalcWithFuelMass
} = require('./calc');

test('fuelCalc to lift nothing is 0', () => {
    expect(fuelCalc(0)).toBe(0);
});

test('fuelCalc divides the input mass by three and then subtracts two', () => {
    expect(fuelCalc(12)).toBe(2);
});

test('the mass in the fuel calc is rounded down before subtracting two', () => {
    expect(fuelCalc(14)).toBe(2);
});

test('fuelCalc divides the input mass by three and then subtracts two', () => {
    expect(fuelCalc(12)).toBe(2);
});

test('the mass 1969 requires 654 units of fuel', () => {
    expect(fuelCalc(1969)).toBe(654);
});

test('fuelCalcWithFuelMass acts the same as fuelCalc if the reulsting mass would not require any more fuel', () => {
    expect(fuelCalcWithFuelMass(12)).toBe(2);
});

test('module mass of 1969 requires 966 units of fuel', () => {
    expect(fuelCalcWithFuelMass(1969)).toBe(966);
});

