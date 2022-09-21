(() => {
  let model = new Model();
  let renderer = new Renderer();

  function get_input(selector: string) {
    const inputElement = $(selector);
    const value = inputElement.val();
    inputElement.val("");
    return value;
  }

  $("#get-team-btn").on("click", function () {
    const teamName = get_input("#team-name-input");
    const year = get_input("#year-input");
    console.log(teamName, year);
    model.callPlayersAPI("lakers", 2021).then(res => {
      renderer.render(model.getPlayers());
    });
  });
})();
