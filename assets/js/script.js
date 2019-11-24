const finite_automata = new FiniteAutomata();
finite_automata.setTableElement($(".table-wrapper table"));


$(document).ready(function() {
    addToken();
    deleteToken();
    handleTestTokenInput();
});



function addToken() {
    function helperAddToken(handle) {
        var value = handle.trim().split(" ");
        if(value.length > 0) {
            $.each(value, function(i, v) {
                if(v != "") {
                    if(!finite_automata.getTokens().includes(v)) {
                        finite_automata.addToken(v.trim());

                        var html = "<li><span>" + v.trim() + "</span><i class='fa fa-times delete-token'></i></li>";
                        $(".list-words .list").append(html);
                        
                        generateStates();
                        generateDrawTable();
                        drawTable();
                        rebuildTokenInput();
                    }
                }
            });
        }
    }

    $("input[name='input-token']").on("keypress", function(e) {
        if(e.key == "Enter") {
            var value = $(this).val();
            helperAddToken(value);
            $(this).val("");
        }
    });
}


function handleTestTokenInput() {
    $(".word-listener").on("focusin", function() {
        $("input[name=fake-token-input]").focus();
    });

    $("input[name=fake-token-input]").on("keyup", function(e) {
        var text = $(this).val();

        $(".word-listener").empty();

        var values = text.trim().split(" ");
        var html = "";
        $.each(values, function(i, word) {
            html += "<span class='" + (finite_automata.validWord(word)? "valid": "invalid") + "'>" + word + "</span> ";
        });
        $(".word-listener").html(html);
    });
}


function rebuildTokenInput() {
    var text = $("input[name=fake-token-input]").val();

    $(".word-listener").empty();

    var values = text.trim().split(" ");
    var html = "";
    $.each(values, function(i, word) {
        html += "<span class='" + (finite_automata.validWord(word)? "valid": "invalid") + "'>" + word + "</span> ";
    });
    $(".word-listener").html(html);
}


function deleteToken() {
    $(document).on("click", ".delete-token", function() {
        var token = $(this).parent().find("span").text();
        finite_automata.removeToken(token);
        $(this).parent().remove();

        finite_automata.setStates([[]]);
        finite_automata.setDrawTable([]);
        finite_automata.setGlobalState(0);
        
        generateStates();
        generateDrawTable();
        drawTable();
        rebuildTokenInput();
    });
}


function generateStates() {
    var words = finite_automata.getTokens(),
        states = finite_automata.getStates();
    
    $.each(words, function(index, word) {
        var current_state = 0;
        for(var i=0; i<word.length; i++) {
            if(typeof states[current_state][word[i]] == 'undefined') {
                var next_state = finite_automata.getGlobalState() + 1;
                states[current_state][word[i]] = next_state;
                states[next_state] = [];
                finite_automata.setGlobalState(next_state);
                current_state = next_state;
            } else {
                current_state = states[current_state][word[i]];
            }

            if(i == word.length - 1) states[current_state]['final'] = 1;
        }
    });

    finite_automata.setStates(states);
}


function generateDrawTable() {
    var draw_table = [],
        states = finite_automata.getStates();

    $.each(states, function(i, state) {
        var tmp = {
            'estado': i
        };
        
        for(var j=97; j<123; j++) {
            var letter = String.fromCharCode(j);

            if(typeof state[letter] == 'undefined') {
                tmp[letter] = '-';
            } else {
                tmp[letter] = state[letter];
            }
        }

        if(state['final'] == 1) tmp['final'] = 1;

        draw_table.push(tmp);
    });

    finite_automata.setDrawTable(draw_table);
}


function drawTable() {
    var table = finite_automata.getDrawTable();
    $(".table-wrapper table tbody").empty();

    $.each(table, function(i, item) {
        var html = "<tr id='row' data-row='" + item['estado'] + "'>";
                if(item['final']) {
                    html += "<td>q" + item['estado'] + "*</td>";
                } else {
                    html += "<td>q" + item['estado'] + "</td>";
                }

                for(var j=97; j<123; j++) {
                    var letter = String.fromCharCode(j);
                
                    if(item[letter] != '-') {
                        html += "<td id='column' data-column='" + letter + "'>q" + item[letter] + "</td>";
                    } else {
                        html += "<td>-</td>";
                    }
                }
            html += "</tr>";

        $(".table-wrapper table tbody").append(html);
    });
}