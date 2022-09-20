(() => {
  let model = new Model();
  let renderer = new Renderer();

  $("#get-team-btn").on("click", function () {
    console.log("hi");
    model.getPlayers("lakers", 2021);
  });
})();
