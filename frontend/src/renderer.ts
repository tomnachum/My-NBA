class Renderer {
  public render(players: Player[]) {
    this.handlebarsHelper("players", players);
    this.handlebarsHelper("players-number", players);
  }

  private handlebarsHelper(selector: string, players: Player[]) {
    $(`.${selector}-container`).empty();
    const source = $(`#${selector}-template`).html();
    const template = Handlebars.compile(source);
    const newHTML = template({ players });
    $(`.${selector}-container`).append(newHTML);
  }
}
