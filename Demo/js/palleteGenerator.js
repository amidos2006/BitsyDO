class Color{
    constructor(r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    loadFromObject(obj){
        this.r = obj.r;
        this.g = obj.g;
        this.b = obj.b;
    }

    toString(){
        return this.r + "," + this.g + "," + this.b;
    }
}

class Palette{
    constructor(){
        this.index = palleteIndex;
        palleteIndex += 1;
        this.background = new Color(0, 82, 204);
        this.tile = new Color(128, 159, 255);
        this.sprites = new Color(255, 255, 255);
    }

    toString(){
        return "PAL " + this.index.toString(36) + "\n" +
                this.background.toString() + "\n" +
                this.tile.toString() + "\n" +
                this.sprites.toString() + "\n";
    }
}

function getPalletes(){
    let negPal = new Palette();
    let mainColor = Math.random() * 0.25;
    negPal.background.loadFromObject(HSVtoRGB(mainColor, 1, 0.4));
    negPal.tile.loadFromObject(HSVtoRGB(mainColor, Math.random() * 0.2 + 0.4, 1));
    let neutralPal = new Palette();
    mainColor = Math.random() * 0.25 + 0.25;
    if(Math.random() < 0.5){
        mainColor = Math.random() * 0.25 + 0.75;
    }
    neutralPal.background.loadFromObject(HSVtoRGB(mainColor, 1, 0.6));
    neutralPal.tile.loadFromObject(HSVtoRGB(mainColor, Math.random()*0.2 + 0.4, 0.8));
    let posPal = new Palette();
    mainColor = 0.5 + Math.random() * 0.25;
    posPal.background.loadFromObject(HSVtoRGB(mainColor, 1, 0.75));
    posPal.tile.loadFromObject(HSVtoRGB(mainColor, Math.random() * 0.2 + 0.4, 1));
    return [negPal, neutralPal, posPal];
}