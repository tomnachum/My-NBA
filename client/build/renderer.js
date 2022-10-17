"use strict";
class Renderer {
    renderStats(stats, playerId) {
        this.handlebarsHelper(`.player[data-id='${playerId}'] .stats-container`, "#stats-template", stats);
    }
    renderTeam(players, isDreamTeam = false, name = "Dream Team", year = "") {
        this.handlebarsHelper(".team-name-container", "#team-name-template", {
            name,
            year,
        });
        this.handlebarsHelper(".players-number-container", "#players-number-template", { counter: players.length });
        this.handlebarsHelper(".players-container", "#players-template", {
            players,
            isDreamTeam,
        });
    }
    handlebarsHelper(containerSelector, templateSelector, dataObject) {
        $(containerSelector).empty();
        const source = $(templateSelector).html();
        const template = Handlebars.compile(source);
        const newHTML = template(dataObject);
        $(containerSelector).append(newHTML);
    }
}
//# sourceMappingURL=renderer.js.map