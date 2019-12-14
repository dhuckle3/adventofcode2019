const walkSegment = function(grid, cursor, segment, operation) {
    const direction = segment[0];
    const length = parseInt(segment.substring(1));
    const x = parseInt(cursor.split(',')[0]);
    const y = parseInt(cursor.split(',')[1]);

    for (var i = 0; i < length; i++) {
        switch(direction) {
            case 'U':
                cursor = x + ',' + (y + i + 1);
                break;
            case 'D':
                cursor = x + ',' + (y - i - 1);
                break;
            case 'L':
                cursor = (x - i - 1) + ',' + y;
                break;
            case 'R':
                cursor = (x + i + 1) + ',' + y;
                break;
        }
        operation(grid, cursor);
    } 
    return cursor;
}

const addLine = function(grid, marker, segments) {
    let cursor = '0,0';
    let line = []
    segments.split(',').forEach((segment) => {
        walkSegment(grid, cursor, segment, (grid, operation) => {
            if (!grid[cursor]) {
                grid[cursor] = []
            }
            grid[cursor].push(marker);
            grid[cursor] = Array.from(new Set(grid[cursor]));
        });
        console.log(segment, grid);
    });
}

const addSegment = function(grid, cursor, marker, operation) {
    return walkSegment(grid, cursor, operation, (grid, cursor) => {
        if (!grid[cursor]) {
            grid[cursor] = []
        }
        grid[cursor].push(marker);
        grid[cursor] = Array.from(new Set(grid[cursor]));
    });
}

const manhattenDist = function(x, y) {
    return Math.abs(x) + Math.abs(y);
}

const getAllIntersections = function(grid) {
    var intersections = []
    let intersectionPoint = '0,0';
    let distance = Infinity;
    Object.keys(grid)
        .filter(location => grid[location].length > 1)
        .forEach(location => {
            const [x,y] = location.split(','); 
            const mDist = manhattenDist(parseInt(x), parseInt(y));
            intersections.push({location: location, distance: mDist});
        });
    intersections = intersections.sort((a, b) => {
        return a.distance > b.distance
    });
    return intersections;
}

const getIntersection = function(grid) {
    let intersectionPoint = '0,0';
    let distance = Infinity;
    Object.keys(grid)
        .filter(location => grid[location].length > 1)
        .forEach(location => {
            const mDist = Math.abs(parseInt(location.split(',')[0])) + Math.abs(parseInt(location.split(',')[1]));
            if (mDist < distance) {
                intersectionPoint = location;
                distance = mDist;
            }
        });

    return [intersectionPoint, distance];
}

const getBounds = function(grid) {
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    Object.keys(grid).forEach(element => {
        let x = parseInt(element.split(',')[0]);
        let y = parseInt(element.split(',')[1]);
        if (x < minX) { minX = x; }
        if (x > maxX) { maxX = x; }
        if (y < minY) { minY = y; }
        if (y > minY) { maxY = y; }
    });
    return [ minX, maxX, minY, maxY ];
}

module.exports = { 
    addSegment,
    addLine,
    getAllIntersections,
    getBounds,
    getIntersection
};
