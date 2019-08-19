class TraceryRules{
    constructor(){
        this.mainRules = {};
    }

    loadTraceryRules(filename){
        $.getJSON(filename, (data) => {
            this.mainRules = data;
        });
    }

    generate(additionalRules, start="origin"){
        let finalRules = JSON.parse(JSON.stringify(this.mainRules));
        if(additionalRules){
            for (let k in additionalRules) {
                finalRules[k] = additionalRules[k];
            }
        }
        let grammar = tracery.createGrammar(finalRules);
        if(start in finalRules){
            return grammar.flatten("#"+start+"#");
        }
        return ""
    }
}