class Renderer {
  public render(players: Player[]) {
    $(`.players-container`).empty();
    const source = $(`#players-template`).html();
    const template = Handlebars.compile(source);
    const newHTML = template({ players });
    $(`.players-container`).append(newHTML);
  }
}
