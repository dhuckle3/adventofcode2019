const fs = require('fs');
const os = require('os');

const {
    addSegment,
    addLine,
    getAllIntersections,
    getIntersection
} = require('./wire-diagram/diagram'); 

const WireDiagram = require('./wire-diagram/wirediagram');

test('day3 sample input 1 produces correct results', () => {
    const line1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
    const line2 = 'U62,R66,U55,R34,D71,R55,D58,R83';

    const grid = {}
    let cursor = '0,0';

    line1.split(',').forEach((operation) =>{
        cursor = addSegment(grid, cursor, 1, operation);
    });
    cursor = '0,0';
    line2.split(',').forEach((operation) =>{
        cursor = addSegment(grid, cursor, 2, operation);
    });

    const [ point, distance ] = getIntersection(grid);    
    expect(distance).toBe(159);
});

test('day3 sample input 2 produces correct results', () => {
    const line1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
    const line2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'; 
    
    const grid = {}
    let cursor = '0,0';

    line1.split(',').forEach((operation) =>{
        cursor = addSegment(grid, cursor, 1, operation);
    });
    cursor = '0,0';
    line2.split(',').forEach((operation) =>{
        cursor = addSegment(grid, cursor, 2, operation);
    });

    const [ point, distance ] = getIntersection(grid);    
    expect(distance).toBe(135);
});

test('part 1 input', () => {
    const data = fs.readFileSync('./data/input03.txt', 'utf-8');
    const source = data.split(os.EOL);

    const grid = {}
    cursor = '0,0';

    source[0].split(',').forEach((operation) =>{ 
        cursor = addSegment(grid, cursor, 1, operation);
    }); 
    cursor = '0,0';
    source[1].split(',').forEach((operation) =>{ 
        cursor = addSegment(grid, cursor, 2, operation);
    }); 

    const [ point, distance ] = getIntersection(grid);    
    expect(distance).toBe(3247);
});

test('part 2 input', () => {
    const data = fs.readFileSync('./data/input03.txt', 'utf-8');
    const source = data.split(os.EOL);

    const grid = {}
    cursor = '0,0';

    source[0].split(',').forEach((operation) =>{ 
        cursor = addSegment(grid, cursor, 1, operation);
    }); 
    cursor = '0,0';
    source[1].split(',').forEach((operation) =>{ 
        cursor = addSegment(grid, cursor, 2, operation);
    }); 

    const intersections = getAllIntersections(grid);    
});

test('part 2 wirediagram', () => {
    const data = fs.readFileSync('./data/input03.txt', 'utf-8');
    const source = data.split(os.EOL);
    const grid = {};
    let cursor = '0,0';
    var wd = new WireDiagram();
    wd.addWire(source[0]);
    wd.addWire(source[1]);
    expect(wd.findSmallestTravelDistance()).toBe('4537,-1239');
});

