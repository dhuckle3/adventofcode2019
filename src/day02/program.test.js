const { Program } = require('./program');

test('program address starts at 0', () => {
    const program = new Program([1, 2, 4, 0]);
    expect(program.address).toBe(0);
});

test('program accepts two inputs and places them in positions one and two', () => {
    const program = new Program([0, 0, 0, 0], 3, 7);
    expect(program.memory).toEqual([0, 3, 7, 0]);
});

test('program halts when instruction 99 is encountered', () => {
    const memory = [
         1, 0, 0, 0,
         1, 0, 0, 0, 
        99, 0, 0, 0, 
         1, 0, 0, 0
    ];
    const program = new Program(memory);
    program.run()
    expect(program.address).toBe(8);
    expect(program.getOutput()).toBe(4)
});

test('op1 adds in1 and in2 and writes it to out1', () => {
    const memory = [
        1, 1, 3, 4,
        0, 0, 0, 0
    ];

    const program = new Program(memory)
    program.op1()

    expect(program.memory).toEqual([
        1, 1, 3, 4,
        5, 0, 0, 0
    ]);
});

test('op2 multiplies in1 and in2 and writes it to out1', () => {
    const memory = [
        1, 4, 5, 6,
        5, 7, 0, 0
    ];
    const program = new Program(memory)
    program.op2();
    expect(program.memory).toEqual([
        1, 4,  5, 6,
        5, 7, 35, 0
    ]);
});

test('sample program 1 produces correct result', () => {
    const program = new Program([1,0,0,0,99]);
    program.run()
    expect(program.memory).toEqual([2,0,0,0,99]);
});

test('sample program 2 produces correct result', () => {
    const program = new Program([2,3,0,3,99])
    program.run()
    expect(program.memory).toEqual([2,3,0,6,99]);
});

test('sample program 3 produces correct result', () => {
    const program = new Program([2,4,4,5,99,0])
    program.run()
    expect(program.memory).toEqual([2,4,4,5,99,9801]);

});

test('sample program 4 produces correct result', () => {
    const program = new Program([1,1,1,4,99,5,6,0,99])
    program.run()
    expect(program.memory).toEqual([30,1,1,4,2,5,6,0,99]);
});
