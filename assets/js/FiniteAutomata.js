class FiniteAutomata{

    constructor() {
        this.tokens = [];
    }

    addToken(token) {
        this.tokens.push(token);
        return this;
    }

    removeToken(token) {
        var index = null;
        for(var i=0; i<this.tokens.length; i++) {
            if(this.tokens[i].trim() == token.trim()) {
                index = i;
                break;
            }
        }
        if(index != null) {
            this.tokens.splice(index, 1);
        }
        return this;
    }

    getTokens() {
        return this.tokens;
    }

    clearTokens() {
        this.tokens = [];
        return this;
    }

}