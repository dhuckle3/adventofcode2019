const fuelCalc = (mass) => {
    return Math.max(0, Math.floor(mass / 3) - 2);
}

const fuelCalcWithFuelMass = (mass) => {
    var fuel = fuelCalc(mass);
    if (fuel === 0) {
        return 0;
    }
    else {
        return fuel + fuelCalcWithFuelMass(fuel);
    }
}

module.exports = {
    fuelCalc,
    fuelCalcWithFuelMass
};
