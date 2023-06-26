// Game Over Logic
document.addEventListener("DOMContentLoaded", function() {
    var scoreDisplay = document.getElementById("score-display");
    var score = getQueryVariable("score");
    scoreDisplay.textContent += score;

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
});
