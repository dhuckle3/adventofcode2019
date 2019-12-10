const fs = require('fs');
const os = require('os');
const { Program } = require('./program');

test('part1, program result should be 3085697', () => {
    const data = fs.readFileSync('./data/input02.txt', 'utf-8');
    const source = data.split(',').map(item => parseInt(item))
    let program = new Program(source, 9, 2);
    program.run()
    program = new Program(source, 12, 2);
    program.run()
    expect(program.getOutput()).toBe(3085697);
});


test('part2, fine the program inputs that result in 19690720', () => {
    const data = fs.readFileSync('./data/input02.txt', 'utf-8');
    const source = data.split(',').map(item => parseInt(item))
    const program = new Program(source, 94, 25);
    program.run();
    expect(program.getOutput()).toBe(19690720);
});
