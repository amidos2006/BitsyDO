function createMap(value, width, height) {
    let map = [];
    for (let y = 0; y < height; y++) {
        map.push([])
        for (let x = 0; x < width; x++) {
            map[y].push(value);
        }
    }
    return map;
}

function cloneMap(map) {
    let result = [];
    for (let y = 0; y < map.length; y++) {
        result.push([])
        for (let x = 0; x < map[y].length; x++) {
            result[y].push(map[y][x]);
        }
    }
    return result;
}

function getCells(map, x, y, label) {
    let queue = [{ "x": x, "y": y, "label": label }];
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let cells = [];
    while (queue.length > 0) {
        let current = queue.splice(0, 1)[0];
        if (map[current.y][current.x] == 0) {
            map[current.y][current.x] = current.label;
            cells.push(current);
            for (let dir of directions) {
                let newNode = { "x": current.x + dir[0], "y": current.y + dir[1], "label": current.label };
                if (newNode.x >= 1 && newNode.y >= 1 && newNode.x < map[0].length - 1 && newNode.y < map.length - 1) {
                    queue.push(newNode);
                }
            }
        }
    }
    return cells;
}

function connectUnconnectedAreas(map) {
    let newMap = cloneMap(map);
    let groups = [];
    for (let y = 1; y < map.length - 1; y++) {
        for (let x = 1; x < map[y].length - 1; x++) {
            if (newMap[y][x] == 0) {
                groups.push(getCells(newMap, x, y, groups.length + 1));
            }
        }
    }
    while (groups.length > 1) {
        let g1 = groups.splice(randomInt(groups.length),1)[0];
        let g2 = groups.splice(randomInt(groups.length),1)[0];
        let c1 = chooseRandom(g1);
        let c2 = chooseRandom(g2);
        connectCells(map, c1.x, c1.y, c2.x, c2.y);
        groups.push(g1.concat(g2));
    }
}

function digHorizontal(map, startX, endX, y) {
    for (let x = startX; x < endX; x++) {
        map[y][x] = 0;
    }
    for (let x = endX; x < startX; x++) {
        map[y][x] = 0;
    }
}

function digVertical(map, startY, endY, x) {
    for (let y = startY; y < endY; y++) {
        map[y][x] = 0;
    }
    for (let y = endY; y < startY; y++) {
        map[y][x] = 0;
    }
}

function connectCells(map, startX, startY, endX, endY) {
    if (Math.random() < 0.5) {
        digHorizontal(map, startX, endX, startY);
        digVertical(map, startY, endY, endX);
    }
    else {
        digVertical(map, startY, endY, startX);
        digHorizontal(map, startX, endX, endY);
    }
}

function getSurroundingCells(map, x, y) {
    let value = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (Math.abs(dx) + Math.abs(dy) == 0) {
                continue;
            }
            let newX = x + dx; let newY = y + dy;
            if (newX < 0 || newY < 0 || newX > map[0].length - 1 || newY > map.length - 1) {
                value += 1;
            }
            else if (map[newY][newX] == 1) {
                value += 1;
            }
        }
    }
    return value;
}

function generateCellularMap(startX, startY, endX, endY, start, iterations) {
    let map = [];
    for (let y = 0; y < 16; y++) {
        map.push([])
        for (let x = 0; x < 16; x++) {
            if (Math.random() < start) {
                map[y].push(1);
            }
            else {
                map[y].push(0);
            }
        }
    }
    for (let i = 0; i < iterations; i++) {
        let newMap = createMap(0, map[0].length, map.length);
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                let value = getSurroundingCells(map, x, y);
                if (map[y][x] == 1) {
                    if (value < 2) {
                        newMap[y][x] = 0;
                    }
                    else {
                        newMap[y][x] = 1;
                    }
                }
                else {
                    if (value > 4) {
                        newMap[y][x] = 1;
                    }
                    else {
                        newMap[y][x] = 0;
                    }
                }
            }
        }
        map = newMap;
    }
    for (let y = 0; y < map.length; y++) {
        map[y][0] = 1;
        map[y][15] = 1;
    }
    for (let x = 0; x < map[0].length; x++) {
        map[0][x] = 1;
        map[15][x] = 1;
    }
    if (startX == -1 || endX == -1) {
        for (let x = 0; x < 8; x++) {
            map[7][x] = 0;
            map[8][x] = 0;
        }
    }
    if (startX == 1 || endX == 1) {
        for (let x = 15; x > 7; x--) {
            map[7][x] = 0;
            map[8][x] = 0;
        }
    }
    if (startY == -1 || endY == -1) {
        for (let y = 0; y < 8; y++) {
            map[y][7] = 0;
            map[y][8] = 0;
        }
    }
    if (startY == 1 || endY == 1) {
        for (let y = 15; y > 7; y--) {
            map[y][7] = 0;
            map[y][8] = 0;
        }
    }
    connectUnconnectedAreas(map);
    return map;
}

function calculateDijkstra(actualMap, x, y) {
    let map = createMap(-1, 16, 16);
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let queue = [{ "x": x, "y": y, "label": 0 }];
    while (queue.length > 0) {
        let current = queue.splice(0, 1)[0];
        if ((map[current.y][current.x] == -1 || map[current.y][current.x] > current.label) && actualMap[current.y][current.x] != 1) {
            map[current.y][current.x] = current.label;
            for (let dir of directions) {
                let newNode = {
                    "x": current.x + dir[0],
                    "y": current.y + dir[1],
                    "label": current.label + 1
                }
                if (newNode.x >= 0 && newNode.y >= 0 && newNode.x < map[0].length && newNode.y < map.length) {
                    queue.push(newNode);
                }
            }
        }
    }
    return map;
}