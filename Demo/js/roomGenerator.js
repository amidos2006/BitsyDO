class Exit{
    constructor(rIdx, x1, y1, x2, y2){
        this.rIdx = rIdx;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    toString(){
        return "EXT " + this.x1 + "," + this.y1 + " " + this.rIdx + " " + this.x2 + "," + this.y2 + "\n";
    }
}

class Ending{
    constructor(x, y, text){
        this.index = endingIndex;
        endingIndex += 1;
        this.x = x;
        this.y = y;
        this.text = text;
    }

    toString(){
        return "END " + this.index.toString(36) + " " + this.x + "," + this.y + "\n";
    }
}

class Room{
    constructor(){
        this.index = roomIndex;
        roomIndex += 1;
        this.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0],
                    [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        this.pIdx = 0;
        this.exits = [];
        this.endings = [];
    }

    getEmptyTiles(){
        let result = [];
        for(let y=1; y<this.map.length-1; y++){
            for(let x=1; x<this.map[y].length-1; x++){
                if(this.map[y][x] == 0){
                    result.push({"x": x, "y": y});
                }
            }
        }
        return result;
    }

    hasEndings(){
        return this.endings.length > 0;
    }

    getEndingItem(){
        let gfx = chooseRandom(endingGraphics);
        let output = "ITM 0\n";
        for (let y = 0; y < gfx.graphic_1.length; y++) {
            for (let x = 0; x < gfx.graphic_1[y].length; x++) {
                output += gfx.graphic_1[y][x];
            }
            output += "\n"
        }
        output += ">\n";
        for (let y = 0; y < gfx.graphic_2.length; y++) {
            for (let x = 0; x < gfx.graphic_2[y].length; x++) {
                output += gfx.graphic_2[y][x];
            }
            output += "\n"
        }
        return output;
    }

    getEndingString(){
        let outputText = "";
        for(let e of this.endings){
            outputText += "\nEND " + e.index.toString(36) + "\n";
            outputText += e.text + "\n";
        }
        return outputText;
    }

    toString(){
        let outputText = "ROOM " + this.index.toString(36) + "\n";
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                outputText += this.map[y][x].toString(36) + ",";
            }
            outputText = outputText.substring(0, outputText.length - 1);
            outputText += "\n"
        }
        for (let e of this.endings) {
            outputText += "ITM 0 " + e.x + "," + e.y + "\n";
        }
        for(let e of this.exits){
            outputText += e.toString();
        }
        for (let e of this.endings) {
            outputText += e.toString();
        }
        outputText += "PAL " + this.pIdx + "\n";
        
        return outputText;
    }
}

let wallShift = 0;
let decorShift = 0;

function decorateMap(room, map, avatar, sprites, palletes, wallTiles, decorTiles, directionTiles, start, end, sentiValue){
    if(Math.random() < 0.2){
        wallShift = randomInt(wallTiles["neg"].length);
        decorShift = randomInt(decorTiles["neg"].length);
    }

    let key = "neutral";
    room.pIdx = palletes[1].index;
    if(sentiValue < -2){
        key = "neg";
        room.pIdx = palletes[0].index;
    }
    else if(sentiValue > 2){
        key = "pos";
        room.pIdx = palletes[2].index;
    }
    let wall = wallTiles[key][wallShift];
    let decor = decorTiles[key][wallShift];
    room.map = cloneMap(map);
    for(let y=0; y<room.map.length; y++){
        for(let x=0; x<room.map[y].length; x++){
            room.map[y][x] *= wall.index;
        }
    }
    fixSpriteLocations(room, map, avatar, sprites, start, end);

    let emptyTiles = room.getEmptyTiles();
    shuffleArray(emptyTiles);
    for(let t of emptyTiles){
        if(Math.random() < 0.1){
            room.map[t.y][t.x] = decor.index;
        }
    }
    if(start[0] == -1){
        room.map[7][0] = directionTiles[0].index;
        room.map[8][0] = directionTiles[0].index;
    }
    if(start[0] == 1){
        room.map[7][15] = directionTiles[2].index;
        room.map[8][15] = directionTiles[2].index;
    }
    if(start[1] == -1){
        room.map[0][7] = directionTiles[1].index;
        room.map[0][8] = directionTiles[1].index;
    }
    if(start[1] == 1){
        room.map[15][7] = directionTiles[3].index;
        room.map[15][8] = directionTiles[3].index;
    }

    if (end[0] == -1) {
        room.map[7][0] = directionTiles[2].index;
        room.map[8][0] = directionTiles[2].index;
    }
    if (end[0] == 1) {
        room.map[7][15] = directionTiles[0].index;
        room.map[8][15] = directionTiles[0].index;
    }
    if (end[1] == -1) {
        room.map[0][7] = directionTiles[3].index;
        room.map[0][8] = directionTiles[3].index;
    }
    if (end[1] == 1) {
        room.map[15][7] = directionTiles[1].index;
        room.map[15][8] = directionTiles[1].index;
    }
}

function fixSpriteLocations(room, map, avatar, sprites, start, end){
    let startPos = chooseRandom(getLocationsFromDirection(start[0], start[1]));
    let endPos = chooseRandom(getLocationsFromDirection(end[0], end[1]));
    if(room.index == avatar.position.ridx){
        avatar.position.x = startPos.x;
        avatar.position.y = startPos.y;
    }
    let currentEmpty = room.getEmptyTiles();
    shuffleArray(currentEmpty);
    let newMap = cloneMap(map);
    for(let i=0; i<sprites.length; i++){
        if(currentEmpty.length == 0){
            break;
        }
        let randomPos = currentEmpty.splice(0,1)[0];
        newMap[randomPos.y][randomPos.x] = 1;
        let dik = calculateDijkstra(newMap, startPos.x, startPos.y);
        if(dik[endPos.y][endPos.x] != -1){
            sprites[i].position.x = randomPos.x;
            sprites[i].position.y = randomPos.y;
        }
        else{
            i-=1;
        }
    }
}

function addExits(room, exit, entrance){
    let exitLocs = getLocationsFromDirection(exit[0], exit[1]);
    let entranceLocs = getLocationsFromDirection(entrance[0], entrance[1]);
    room.exits.push(new Exit(room.index + 1, exitLocs[0].x, exitLocs[0].y, entranceLocs[0].x, entranceLocs[0].y));
    room.exits.push(new Exit(room.index + 1, exitLocs[1].x, exitLocs[1].y, entranceLocs[1].x, entranceLocs[1].y));
}

function getRooms(lines, avatar, palletes, spriteLines, wallTiles, decorTiles, directionTiles){
    wallShift = randomInt(wallTiles["neg"].length);
    decorShift = randomInt(decorTiles["neg"].length);

    let direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let result = [];
    let sentiValue = getSentiScore(lines);
    let startIdx = randomInt(direction.length);
    let endIdx = (startIdx + 1 + randomInt(direction.length - 1)) % direction.length;
    let map = generateCellularMap(direction[startIdx][0], direction[startIdx][1],
        direction[endIdx][0], direction[endIdx][1],
        0.2 + 0.2 * (Math.abs(sentiValue) - 2) / 3, 4 * (Math.abs(sentiValue) - 2) / 3);
    if (sentiValue < -2){
        map = generateCellularMap(direction[startIdx][0], direction[startIdx][1],
            direction[endIdx][0], direction[endIdx][1],
            0.4 + 0.2 * (Math.abs(sentiValue) - 2) / 3, 2 + 4 * (Math.abs(sentiValue) - 2) / 3);
    }
    else if (sentiValue > 2){
        map = generateCellularMap(direction[startIdx][0], direction[startIdx][1],
            direction[endIdx][0], direction[endIdx][1],
            0.2 * (Math.abs(sentiValue) - 2) / 3, 2 * (Math.abs(sentiValue) - 2) / 3);
    }
    let room = new Room();
    decorateMap(room, map, avatar, spriteLines[-1], palletes, wallTiles, decorTiles, directionTiles,
        direction[startIdx], direction[endIdx], sentiValue);
    result.push(room);
    for(let i=0; i<lines.length; i++){
        if(endIdx % 2 == 0){
            startIdx = endIdx + 1;
        }
        else{
            startIdx = endIdx - 1;
        }
        addExits(room, direction[endIdx], direction[startIdx]);
        endIdx = (startIdx + 1 + randomInt(direction.length - 1)) % direction.length;
        sentiValue = senti.analyze(lines[i]).comparative;
        map = generateCellularMap(direction[startIdx][0], direction[startIdx][1],
            direction[endIdx][0], direction[endIdx][1],
            0.2 + 0.2 * (Math.abs(sentiValue) - 2) / 3, 4 * (Math.abs(sentiValue) - 2) / 3);
        room = new Room();
        if (sentiValue < -2) {
            map = generateCellularMap(direction[startIdx][0], direction[startIdx][1],
                direction[endIdx][0], direction[endIdx][1],
                0.4 + 0.2 * (Math.abs(sentiValue) - 2) / 3, 2 + 4 * (Math.abs(sentiValue) - 2) / 3);
        }
        else if (sentiValue > 2) {
            map = generateCellularMap(direction[startIdx][0], direction[startIdx][1],
                direction[endIdx][0], direction[endIdx][1],
                0.2 * (Math.abs(sentiValue) - 2) / 3, 2 * (Math.abs(sentiValue) - 2) / 3);
        }
        decorateMap(room, map, avatar, spriteLines[i], palletes, wallTiles, decorTiles, directionTiles, 
            direction[startIdx], direction[endIdx], sentiValue);
        result.push(room);
    }
    let endLocs = getLocationsFromDirection(direction[endIdx][0], direction[endIdx][1]);
    for(let l of endLocs){
        result[result.length - 1].endings.push(new Ending(l.x, l.y, "This is the end."));
    }
    
    return result;
}