const {
    getBounds,
    addSegment
} = require('./diagram');

test('getBounds finds the outside edges of the diagram', () => {
    expect(getBounds({})).toEqual([0,0,0,0]);
    expect(getBounds({'0,1': ''})).toEqual([0, 0, 0, 1]);
    expect(getBounds({'0,1': '', '-1,2': ''})).toEqual([-1, 0, 0, 2]);
});

test('addSegment updates the grid correctly', () => {
    let grid = {}
    addSegment(grid, '0,0', 'l', 'U1');
    expect(grid).toEqual({
        '0,1': ['l']
    });
});

test('addSegment draw lines', () => {
    let grid = {}
    addSegment(grid, '1,1', 1, 'U3');
    expect(grid).toEqual({
        '1,2': [1],
        '1,3': [1],
        '1,4': [1]
    });
});

test('addSegment returns the new location of the cursor', () => {
    let cursor = '1,1'
    cursor = addSegment({}, cursor, 1, 'U3');
    expect(cursor).toEqual('1,4');
});

test('addSegment takes the start position in to account', () => {
    let grid = {}
    addSegment(grid, '9,-3', 'l', 'U1');
    expect(grid).toEqual({
        '9,-2': ['l']
    });
});

test('addSegment handles all directions', () => {
    let grid = {}
    addSegment(grid, '1,1', '1', 'U1');
    addSegment(grid, '1,1', '1', 'D1');
    addSegment(grid, '1,1', '1', 'R1');
    addSegment(grid, '1,1', '1', 'L1');

    expect(grid).toEqual({
        '1,2': ['1'],
        '1,0': ['1'],
        '2,1': ['1'],
        '0,1': ['1']
    });
});

