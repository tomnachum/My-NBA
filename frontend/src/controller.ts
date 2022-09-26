(() => {
  let model = new Model();
  let renderer = new Renderer();

  const teamBtn = $("#get-team-btn");
  const dreamTeamBtn = $("#get-dream-team-btn");

  teamBtn.prop("disabled", true);
  model.getDreamTeam().then(players => {
    dreamTeamBtn.prop("disabled", players.length == 0);
  });

  function add_options_to_dropdown(selector: string, options: string[]) {
    for (const option of options) {
      $(selector).append(
        $(document.createElement("option")).prop({
          value: option,
          text: option[0].toUpperCase() + option.slice(1),
        })
      );
    }
  }

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

  function get_option(dropdown_selector: string): string {
    const dropdown = $(dropdown_selector);
    const option = String(dropdown.val());
    return option;
  }

  teamBtn.on("click", function () {
    const teamName = get_option("#teams");
    const year = get_option("#years");
    const hasBdayFilter = $("#birthDayFilter").prop("checked")
      ? "true"
      : "false";
    model.getTeam(teamName, year, hasBdayFilter).then(players => {
      renderer.render(players);
    });
  });

  $(".players-container").on("click", ".updateDreamTeamBtn", function () {
    const playerElement = $(this).closest(".player");
    const playerId = playerElement.data().id;
    if (model.isDreamTeam()) {
      model.deleteFromDreamTeam(playerId);
      model.getDreamTeam().then(players => {
        renderer.render(players, true);
      });
    } else {
      model.addToDreamTeam(playerId);
      const name = playerElement.find(".name").text();
      alert(`${name} has been added succesfully to dream team.`);
      dreamTeamBtn.prop("disabled", false);
    }
  });

  $("#get-dream-team-btn").on("click", function () {
    model.getDreamTeam().then(players => {
      renderer.render(players, true);
    });
  });
})();
