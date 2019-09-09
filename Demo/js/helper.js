function makeHorizontalSymmetry(image) {
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[y].length / 2; x++) {
            image[y][image.length - x - 1] = image[y][x];
        }
    }
}

function makeVerticalSymmetry(image) {
    for (let y = 0; y < image.length / 2; y++) {
        for (let x = 0; x < image[y].length; x++) {
            image[image.length - y - 1][x] = image[y][x];
        }
    }
}

function makeCornerSymmetry(image) {
    for (let y = 0; y < image.length / 2; y++) {
        for (let x = 0; x < image[y].length / 2; x++) {
            image[y][image.length - x - 1] = image[y][x];
            image[image.length - y - 1][x] = image[y][x];
            image[image.length - y - 1][image.length - x - 1] = image[y][x];
        }
    }
}

function makeLeftCornerSymmetry(image){
    for (let y = 0; y < image.length / 2; y++) {
        for (let x = 0; x < image[y].length / 2; x++) {
            image[y][image.length - x - 1] = image[y][x];
            image[image.length - y - 1][x] = image[y][x];
            image[image.length - y - 1][image.length - x - 1] = image[y][x];
        }
    }
    for (let y = 0; y < image.length / 2; y++) {
        for (let x = 0; x < image[y].length / 2; x++) {
            image[y][image.length - x - 1] = 0;
            image[image.length - y - 1][x] = 0;
        }
    }
}

function makeRightCornerSymmetry(image) {
    for (let y = 0; y < image.length / 2; y++) {
        for (let x = 0; x < image[y].length / 2; x++) {
            image[y][image.length - x - 1] = image[y][x];
            image[image.length - y - 1][x] = image[y][x];
            image[image.length - y - 1][image.length - x - 1] = image[y][x];
        }
    }
    for (let y = 0; y < image.length / 2; y++) {
        for (let x = 0; x < image[y].length / 2; x++) {
            image[y][x] = 0;
            image[image.length - y - 1][image.length - x - 1] = 0;
        }
    }
}

function fixLine(line){
    return nlp(line).sentences().toPresentTense().out()
}

function fixDialog(dialog){
    return dialog.replace(/[\[\]']+/g, '');
}

function randomInt(maxValue){
    return Math.floor(Math.random() * maxValue);
}

function chooseRandom(array){
    return array[randomInt(array.length)];
}

function shuffleArray(array){
    for(let i=0; i<array.length; i++){
        let randIndex = randomInt(array.length);
        let temp=array[i];
        array[i] = array[randIndex];
        array[randIndex] = temp;
    }
}

function getTextFromEdge(edge, noun){
    let output = fillingTracery.generate({"start":["{clr2}{wvy}" + nlp(noun).toTitleCase().out() + "{wvy}{clr2}"],
        "end": [nlp(edge["end"]["label"]).toTitleCase().out()]}, edge["rel"]["label"]);
    if(noun == edge["end"]["label"].toLowerCase()){
        output = fillingTracery.generate({"end":["{clr2}{wvy}" + nlp(noun).toTitleCase().out() + "{wvy}{clr2}"],
            "start": [nlp(edge["start"]["label"]).toTitleCase().out()]}, edge["rel"]["label"]);
    }
    if(output.trim().length >= 0 && Math.random() > 0.75){
        return output;
    }
    if (edge["surfaceText"] != null){
        return cleanLine(edge.surfaceText, noun);
    }
    return "";
}

function getTextFromUrban(item, noun){
    let output = item["definition"];
    return cleanLine(output, noun);
}

function cleanLine(line, noun){
    let output = line + "";
    output = output.replace(/\[/g, "");
    output = output.replace(/\]/g, "");
    let multiLines = output.split("\n");
    output = "";
    for(let l of multiLines){
        let cleanLine = l.trim();
        if(cleanLine.length == 0){
            continue;
        }
        output += cleanLine[0].toUpperCase() + cleanLine.slice(1);
        if (cleanLine[cleanLine.length - 1] != "."){
            output += ". ";
        }
    }
    if(noun != null && noun.trim().length > 0){
        if (output.indexOf(noun[0].toUpperCase() + noun.slice(1))){
            output = output.replace(noun[0].toUpperCase() + noun.slice(1), "{clr2}{wvy}" + nlp(noun).toTitleCase().out() + "{clr2}{wvy}");
        }
        while(output.indexOf(noun) > -1){
            output = output.replace(noun, "{clr2}{wvy}" + nlp(noun).toTitleCase().out() + "{clr2}{wvy}");
        }
    }
    return output;
}

function addScript(u) {
    var s = document.createElement('script');
    s.src = u;
    document.getElementsByTagName('*')[1].appendChild(s);
}

function getQueryWiki(term, callback) {
    var id = "i" + Math.random().toString(36).slice(2);
    getQueryWiki[id] = function (data) { callback(data); delete getQueryWiki[id]; };
    addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fen.wikipedia.org%2Fw%2Fapi.php%3Faction%3Dopensearch%26search%3D" +
        encodeURIComponent(term) +
        "%26namespace%3D0%22%20&format=json&callback=getQueryWiki." + id);
}

function getQueryGoogle(term, callback) {
    var id = "i" + Math.random().toString(36).slice(2);
    getQueryGoogle[id] = function (data) { callback(data); delete getQueryGoogle[id]; };
    addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26q%3D" +
        encodeURIComponent(term) +
        "%22%20&format=json&callback=getQueryGoogle." + id);
}

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function parseImage(string){
    let img = [];
    let lines = string.split("\n");
    for(let l of lines){
        if(l.trim().length == 0){
            continue;
        }
        img.push([]);
        for(let c of l){
            if(c == "0"){
                img[img.length - 1].push(0);
            }
            else{
                img[img.length - 1].push(1);
            }
        }
    }
    return img;
}

function readImageFile(filename, done){
    let results = [];
    $.get(filename, (data) => {
        let graphics = data.split("#")
        for(let g of graphics){
            let g1 = g.split(">")[0];
            let g2 = g.split(">")[1];
            results.push(
                {
                    "graphic_1":parseImage(g1), 
                    "graphic_2":parseImage(g2)
                }
            );
        }
        if(done){
            done();
        }
    });
    return results;
}

function generateGraphics(markov, low, high, symFun, minEntropy=0, maxEntropy=1, animationMarkov=null){
    let result = {}
    result["graphic_1"] = markov.generateAreaBased2DImage(low, high, symFun, minEntropy, maxEntropy);
    result["graphic_2"] = result.graphic_1;
    if(animationMarkov){

    }    
    return result;
}

function getSentiScore(sentences){
    let result = "";
    for(let s of sentences){
        result += s + " ";
    }
    return senti.analyze(result).comparative;
}

function getLocationsFromDirection(dirX, dirY){
    if(dirX == -1){
        return [{ "x": 0, "y": 7 }, { "x": 0, "y": 8 }];
    }
    if(dirX == 1){
        return [{ "x": 15, "y": 7 }, { "x": 15, "y": 8 }];
    }
    if (dirY == -1) {
        return [{ "x": 7, "y": 0 }, { "x": 8, "y": 0 }];
    }
    if (dirY == 1) {
        return [{ "x": 7, "y": 15 }, { "x": 8, "y": 15 }];
    }
    return [];
}