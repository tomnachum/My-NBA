(() => {
  let model = new Model();
  let renderer = new Renderer();

  const teamBtn = $("#get-team-btn");

  teamBtn.prop("disabled", true);

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
    model.getPlayers(teamName, year).then(players => {
      renderer.render(players);
    });
  });
})();
