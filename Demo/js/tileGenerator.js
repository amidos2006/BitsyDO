class Tile{
    constructor(){
        this.index = tileIndex;
        tileIndex += 1;
        this.graphic_1 = [[1, 1, 1, 1, 1, 1, 1, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 0, 0, 1, 1, 0, 0, 1],
                            [1, 0, 0, 1, 1, 0, 0, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 1, 1, 1, 1, 1, 1, 1]];
        this.graphic_2 = [[1, 1, 1, 1, 1, 1, 1, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 0, 0, 1, 1, 0, 0, 1],
                            [1, 0, 0, 1, 1, 0, 0, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 0, 0, 0, 0, 0, 0, 1],
                            [1, 1, 1, 1, 1, 1, 1, 1]];
        this.wall = true;
    }

    toString(){
        let output = "TIL " + this.index.toString(36) + "\n";
        for(let y=0; y<this.graphic_1.length; y++){
            for (let x = 0; x < this.graphic_1[y].length; x++){
                output += this.graphic_1[y][x];
            }
            output += "\n"
        }
        output += ">\n";
        for (let y = 0; y < this.graphic_2.length; y++) {
            for (let x = 0; x < this.graphic_2[y].length; x++) {
                output += this.graphic_2[y][x];
            }
            output += "\n";
        }
        output += "WAL " + this.wall + "\n";
        return output;
    }
}

function getWallTiles(){
    let wallTiles = {
        "pos":[],
        "neg":[],
        "neutral":[]
    };
    for(let type in wallGraphics){
        for(let g of wallGraphics[type]){
           let wall = new Tile();
            wall.graphic_1 = g.graphic_1;
            wall.graphic_2 = g.graphic_2;
            wallTiles[type].push(wall);
        }
    }
    return wallTiles;
}

function getDirectionTiles(){
    let result = [];
    for (let g of directionGraphics){
        let dir = new Tile();
        dir.graphic_1 = g.graphic_1;
        dir.graphic_2 = g.graphic_2;
        dir.wall = false;
        result.push(dir);
    }
    return result;
}

function getDecorTiles() {
    let decorTiles = {
        "pos": [],
        "neg": [],
        "neutral": []
    };
    for (let type in decorationGraphics) {
        for (let g of decorationGraphics[type]) {
            let decor = new Tile();
            decor.graphic_1 = g.graphic_1;
            decor.graphic_2 = g.graphic_2;
            decor.wall = false;
            decorTiles[type].push(decor);
        }
    }
    return decorTiles;
}