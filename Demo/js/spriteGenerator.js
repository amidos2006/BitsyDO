class Position{
    constructor(x, y, ridx){
        this.x = x;
        this.y = y;
        this.ridx = ridx;
    }

    toString(){
        return "POS " + this.ridx + " " + this.x + "," + this.y;
    }
}

class Sprite{
    constructor(){
        this.index = spriteIndex;
        this.isAvatar = false;
        spriteIndex += 1;
        this.graphic_1 = [[0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 1, 1, 1, 1, 0, 0],
                            [0, 1, 1, 1, 1, 1, 1, 0],
                            [1, 0, 1, 1, 1, 1, 0, 1],
                            [0, 0, 1, 0, 0, 1, 0, 0],
                            [0, 0, 1, 0, 0, 1, 0, 0]];
        this.graphic_2 = [[0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 0, 1, 1, 0, 0, 0],
                            [0, 0, 1, 1, 1, 1, 0, 0],
                            [0, 1, 1, 1, 1, 1, 1, 0],
                            [1, 0, 1, 1, 1, 1, 0, 1],
                            [0, 0, 1, 0, 0, 1, 0, 0],
                            [0, 0, 1, 0, 0, 1, 0, 0]];
        this.position = new Position(4, 4, 0);
        this.associatedNoun = "";
        this.dialog = "";
    }

    hasDialog(){
        return this.dialog.trim().length > 0 && !this.isAvatar;
    }

    getDialogString(){
        return "DLG SPR_" + this.index.toString(36) + "\n" + this.dialog + "\n";
    }

    toString(){
        let output = "SPR " + (this.isAvatar?"A":this.index.toString(36)) + "\n";
        for (let y = 0; y < this.graphic_1.length; y++) {
            for (let x = 0; x < this.graphic_1[y].length; x++) {
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
        output += this.position.toString() + "\n";
        if(this.hasDialog()){
            output += "DLG SPR_" + this.index.toString(36) + "\n";
        }
        return output;
    }
}

function getAvatarSprite(){
    let avatar = new Sprite();
    avatar.graphic_1 = spriteGraphics[avatarNoun].graphic_1;
    avatar.graphic_2 = spriteGraphics[avatarNoun].graphic_2;
    return avatar;
}

function getSprites(lines){
    let spriteLines = {};
    let qIDX = randomInt(questionGraphics.length);

    let question = new Sprite();
    question.graphic_1 = questionGraphics[qIDX].graphic_1;
    question.graphic_2 = questionGraphics[qIDX].graphic_2;
    question.dialog = "I am {clr2}{wvy}" + nlp(avatarNoun).toTitleCase().out() + "{wvy}{clr2} and this is my story.";
    question.position.x = Math.floor(12 * Math.random() + 2);
    question.position.y = Math.floor(12 * Math.random() + 2);
    question.position.ridx = 0;
    spriteLines[-1] = [question];

    for(let i=0; i<lines.length; i++){
        spriteLines[i] = [];

        question = new Sprite();
        question.graphic_1 = questionGraphics[qIDX].graphic_1;
        question.graphic_2 = questionGraphics[qIDX].graphic_2;
        question.dialog = lines[i];
        question.position.x = Math.floor(12 * Math.random() + 2);
        question.position.y = Math.floor(12 * Math.random() + 2);
        question.position.ridx = i + 1;
        spriteLines[i].push(question);

        let sceneNouns = new Set(nlp(lines[i]).nouns().not(avatarNoun).out('array'));
        for(let n of sceneNouns){
            let sprite = new Sprite();
            sprite.graphic_1 = spriteGraphics[n].graphic_1;
            sprite.graphic_2 = spriteGraphics[n].graphic_2;
            sprite.position.x = Math.floor(12 * Math.random() + 2);
            sprite.position.y = Math.floor(12 * Math.random() + 2);
            sprite.position.ridx = i + 1;
            if(spritePossibleLines[n].length == 0){
                sprite.dialog = nomoreTracery.generate();
            }
            else{
                if (spritePossibleLines[n][0].indexOf("I am") == 0){
                    sprite.dialog = spritePossibleLines[n].splice(0, 1)[0];
                }
                else{
                    sprite.dialog = spritePossibleLines[n].splice(randomInt(spritePossibleLines[n].length), 1)[0];
                }
                for(let i=0; i<Math.min(2, spritePossibleLines[n].length); i++){
                    if(Math.random() < 0.7){
                        continue;
                    }
                    sprite.dialog += " " + spritePossibleLines[n].splice(randomInt(spritePossibleLines[n].length), 1)[0];
                }
            }
            spriteLines[i].push(sprite);
        }
    }

    return spriteLines;
}