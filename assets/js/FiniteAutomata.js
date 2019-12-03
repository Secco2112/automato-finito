class FiniteAutomata{

    constructor() {
        this.global_state = 0;
        this.tokens = [];
        this.states = [[]];
        this.draw_table = [];
        this.table_element = $("table");
    }

    setGlobalState(global_state) {
        this.global_state = global_state;
        return this;
    }

    getGlobalState() {
        return this.global_state;
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

    setStates(states) {
        this.states = states;
        return this;
    }

    getStates() {
        return this.states;
    }

    setDrawTable(draw_table) {
        this.draw_table = draw_table;
        return this;
    }

    getDrawTable() {
        return this.draw_table;
    }

    setTableElement(table_element) {
        this.table_element = table_element;
        return this;
    }

    getTableElement() {
        return this.table_element;
    }

    validWord(word) {
        if(this.draw_table.length > 0) {
            var state = 0,
                error = false;

            this.table_element.find("td").each(function(i, td) {
                $(td).removeClass("focus-item focus-column focus-row focus-row-error focus-column-error");
            });

            for(var i=0; i<word.length; i++) {
                if(!error) {
                    if(this.draw_table[state][word[i]] != '-') {
                        state = this.draw_table[state][word[i]];
                    } else {
                        error = true;
                    }
                }
            }

            this.highlight(error, state, word);

            return !error;
        }
        return false;
    }


    highlight(error, state, word) {
        if(!error) {
            var row = this.table_element.find("tr#row[data-row='" + (state - 1) + "']");
            $(row).find("td").each(function() {
                $(this).addClass("focus-row");
            });
            var item = $(row).find("td#column[data-column='" + word[state - 1] + "']");
            this.table_element.find("tbody tr td").each(function() {
                if($(this).index() == item.index()) {
                    $(this).addClass("focus-column");
                }
            });
            $(item).removeClass("focus-row focus-column").addClass("focus-item");
        } else {
            var row = this.table_element.find("tr#row[data-row='" + (state - 1) + "']");
            $(row).find("td").each(function() {
                $(this).addClass("focus-row-error");
            });
            var item = $(row).find("td#column[data-column='" + word[state - 1] + "']");
            this.table_element.find("tbody tr td").each(function() {
                if($(this).index() == item.index()) {
                    $(this).addClass("focus-column-error");
                }
            });
        }
    }


    validate(word) {
        if(this.draw_table.length > 0) {
            this.table_element.find("td").each(function(i, td) {
                $(td).removeClass("focus-item focus-column focus-row focus-row-error focus-column-error");
            });

            var state = 0,
                error = false;

            for(var i=0; i<word.length; i++) {
                if(!error) {
                    if(this.draw_table[state][word[i]] != '-') {
                        state = this.draw_table[state][word[i]];
                    } else {
                        error = true;
                    }
                }
            }

            error = (this.draw_table[state]["final"] == 1);

            return error;
        }
        return false;
    }

}