class Markov2D{
    constructor(origin=[1,1],size=3,allowSelfIndex=false){
        this.origin = origin;
        this.size = size;
        this.allowSelfIndex=allowSelfIndex;
        this.dictionary={}
    }

    loadFromCSV(file,done){
        $.get(file,(data)=>{
            let lines=data.split("\n")
            for(let l of lines){
                let parts=l.split(",");
                this.dictionary[parts[0].trim()] = parseFloat(parts[1]);
                if(done){
                    done();
                }
            }
        });
    }

    getIndex(img,x,y){
        let ox=Math.floor(this.origin[0]*(this.size-1));
        let oy=Math.floor(this.origin[1]*(this.size-1));
        let index = ""
        for(let sx=0; sx<this.size; sx++){
            for(let sy=0; sy<this.size; sy++){
                if(!this.allowSelfIndex && sx == ox && sy == oy){
                    continue;
                }
                if(x-ox+sx < 0 || y-oy+sy < 0){
                    index += "2";
                }
                else{
                    index += img[y-oy+sy][x-ox+sx];
                }
            }
        }
        return index;
    }

    calculateAreaEntropy(image,start_i,start_j,windowSize){
        let white = 0;
        for(let i=0; i<windowSize; i++){
            for(let j=0; j<windowSize; j++){
                white += image[start_i + i][start_j + j];
            }
        }
        if(white == 0){
            return 0;
        }
        let p = white/(windowSize * windowSize);
        return -(p * Math.log(p) + (1-p)*Math.log(1- p));
    }

    calculateWindowEntropy(image, windowSize){
        let entropy = 0;
        for (let i = 0; i < image.length - windowSize; i++) {
            for (let j = 0; j < image[i].length - windowSize; j++) {
                entropy += this.calculateAreaEntropy(image, i, j, windowSize);
            }
        }
        return entropy / (image.length * image[0].length);
    }

    calculateImageArea(image){
        let area=0;
        for(let i=0; i<image.length; i++){
            for(let j=0; j<image[i].length; j++){
                area+=image[i][j];
            }
        }
        return area;
    }

    generate2DImage(width,height,symmetryFn){
        let image=[];
        for(let y=0; y<height; y++){
            image.push([]);
            for(let x=0; x<width; x++){
                image[y].push(0);
            }
        }

        for(let y=0; y<height; y++){
            for(let x=0; x<width; x++){
                let index=this.getIndex(image,x,y);
                if(index in this.dictionary){
                    if(Math.random() < this.dictionary[index]){
                        image[y][x] = 1;
                    }
                }
            }
        }

        if(symmetryFn){
            symmetryFn(image);
        }

        return image;
    }

    generateAreaBased2DImage(low, high, symmetryFn, eLow=0, eHigh=1, maxIteration=100, width=8, height=8){
        let image = this.generate2DImage(width, height, symmetryFn);
        let iterations=0;
        let tempArea=this.calculateImageArea(image);
        let tempEntropy = this.calculateWindowEntropy(image, 3);
        console.log(iterations + ": " + low + " < " + tempArea + " < " + high)
        while((tempArea < low || tempArea > high || tempEntropy < eLow || tempEntropy > eHigh) && iterations < maxIteration){
            image = this.generate2DImage(width, height, symmetryFn);
            tempArea=this.calculateImageArea(image);
            tempEntropy=this.calculateWindowEntropy(image, 3);
            console.log(iterations + ": " + low + " < " + tempArea + " < " + high);
            console.log(iterations + ": " + eLow + " < " + tempEntropy + " < " + eHigh);
            iterations += 1;
        }
        return image;
    }
}