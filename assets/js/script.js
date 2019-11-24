const finite_automata = new FiniteAutomata();


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
    $("#words-form .word-listener").on("input", function(e) {
        var value = $(this).html();
    });
}


function deleteToken() {
    $(document).on("click", ".delete-token", function() {
        var token = $(this).parent().find("span").text();
        finite_automata.removeToken(token);
        $(this).parent().remove();
    });
}