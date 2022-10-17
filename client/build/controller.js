"use strict";
function add_options_to_dropdown(selector, options) {
    for (const option of options) {
        $(selector).append($(document.createElement("option")).prop({
            value: option,
            text: option[0].toUpperCase() + option.slice(1),
        }));
    }
}
function get_option(dropdown_selector) {
    const dropdown = $(dropdown_selector);
    const option = String(dropdown.val());
    return option;
}
function clearTeamData() {
    $(".team-name-container").empty();
    $(".players-number-container").empty();
    $(".players-container").empty();
}
Handlebars.registerHelper("isNotDefined", function (stats) {
    return typeof stats === "string";
});
Handlebars.registerHelper("proper-case", function (teamName) {
    return teamName[0].toUpperCase() + teamName.slice(1);
});
(function () {
    let model = new Model();
    let renderer = new Renderer();
    const teamBtn = $("#get-team-btn");
    const dreamTeamBtn = $("#get-dream-team-btn");
    const loading = $(".loading-spinner");
    teamBtn.prop("disabled", true);
    model.getDreamTeam().then(players => {
        dreamTeamBtn.prop("disabled", players.length == 0);
    });
    model.getTeams().then(teams => {
        add_options_to_dropdown("#teams", teams);
    });
    model.getYears().then(years => {
        add_options_to_dropdown("#years", years);
    });
    $(".dropdown").on("change", function () {
        const $not_selected_dropdowns = $('.dropdown option:selected[value=""]');
        teamBtn.prop("disabled", $not_selected_dropdowns.length > 0);
    });
    teamBtn.on("click", function () {
        const name = get_option("#teams");
        const year = get_option("#years");
        const hasBdayFilter = $("#birthDayFilter").prop("checked");
        clearTeamData();
        loading.removeClass("hide");
        model.getTeam(name, year, hasBdayFilter).then(players => {
            renderer.renderTeam(players, false, name, year);
            loading.addClass("hide");
        });
    });
    $(".players-container").on("click", ".updateDreamTeamBtn", function () {
        const playerElement = $(this).closest(".player");
        const playerId = playerElement.data().id;
        if (model.isDreamTeam()) {
            model.deleteFromDreamTeam(playerId);
            model.getDreamTeam().then(players => {
                renderer.renderTeam(players, true);
            });
        }
        else {
            model.addToDreamTeam(playerId);
            const name = playerElement.find(".name").text();
            alert(`${name} has been added succesfully to dream team.`);
            dreamTeamBtn.prop("disabled", false);
        }
    });
    $("#get-dream-team-btn").on("click", function () {
        clearTeamData();
        loading.removeClass("hide");
        model.getDreamTeam().then(players => {
            renderer.renderTeam(players, true);
            loading.addClass("hide");
        });
    });
    $(".players-container").on("click", ".stats-icon", function () {
        const playerElement = $(this).closest(".player");
        const statsDiv = playerElement.find(`.stats-container`);
        const imgDiv = playerElement.find(`.img-container`);
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            statsDiv.removeClass("loader");
            imgDiv.removeClass("hide");
            statsDiv.empty();
        }
        else {
            $(this).addClass("clicked");
            statsDiv.addClass("loader");
            imgDiv.addClass("hide");
            const playerId = playerElement.data().id;
            model.getStats(playerId).then(stats => {
                statsDiv.removeClass("loader");
                if ($(this).hasClass("clicked")) {
                    renderer.renderStats(stats, playerId);
                }
            });
        }
    });
})();
//# sourceMappingURL=controller.js.map