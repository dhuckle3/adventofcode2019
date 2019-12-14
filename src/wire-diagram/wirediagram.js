class WireDiagram {
    constructor() {
        this.grid = {};
        this.cursor = '0,0';
        this.wires = []
    }

    walk(vector, operation) {
        const direction = vector[0];
        const length = parseInt(vector.substring(1));
        const x = parseInt(this.cursor.split(',')[0]);
        const y = parseInt(this.cursor.split(',')[1]);

        for (var i = 0; i < length; i++) {
            switch(direction) {
                case 'U':
                    this.cursor = x + ',' + (y + i + 1);
                    break;
                case 'D':
                    this.cursor = x + ',' + (y - i - 1);
                    break;
                case 'L':
                    this.cursor = (x - i - 1) + ',' + y;
                    break;
                case 'R':
                    this.cursor = (x + i + 1) + ',' + y;
                    break;
            }
            this.addSpaceToGrid();
            operation(this.grid, this.cursor);
        } 
    }

    addSpaceToGrid() {
        if (!this.grid[this.cursor]) {
            this.grid[this.cursor] = []
        }
        this.grid[this.cursor].push(this.wires.length);
        this.grid[this.cursor] = Array.from(new Set(this.grid[this.cursor]));
    }

    addWire(segments) {
        let wire = []
        this.cursor = '0,0';
        const addCursorToWire = (wire) => { 
            wire.push(this.cursor)
        };
        segments.split(',').forEach((segment) => {
            this.walk(segment, () => {
                this.addSpaceToGrid.bind(this);
                addCursorToWire(wire);
            });
        });
        wire.push(this.cursor); this.wires.push(wire); 
    }

    manhattenDist(x, y) { 
        return Math.abs(x) + Math.abs(y);
    }

    findIntersections() {
        let intersections = []
        Object.keys(this.grid)
            .filter(location => this.grid[location].length > 1)
            .forEach(location => {
                const [x,y] = location.split(','); 
                const mDist = this.manhattenDist(parseInt(x), parseInt(y));
                intersections.push({location: location, distance: mDist});
            });
        intersections = intersections.sort((a, b) => {
            return a.distance > b.distance
        });
        return intersections;
    }

    findSmallestTravelDistance() {
        const ints = this.findIntersections();
        let closest = Infinity
        let location = undefined

        ints.forEach(intersection => {
            const len1 = this.followWireToIntersection(intersection.location, 0);
            const len2 = this.followWireToIntersection(intersection.location, 1);
            let distance = len1 + len2;
            if (distance <= closest) {
                closest = distance;
                location = intersection.location;
            }
        });
        return location;
    }

    followWireToIntersection(location, wireIndex) {
        const [ x, y ] = location.split(',');
        let distance = 0;
        const wire = this.wires[wireIndex];
        for (var i = 0; i < wire.length; i++) {
            distance += 1;
            const [ xi, yi ] = wire[i].split(',');
            if (x == xi && y == yi) {
                break;
            }
        }
        return distance;
    }

    getBounds(grid) {
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
}

module.exports = WireDiagram
