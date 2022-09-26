class Renderer {
  public render(players: Player[], isDreamTeam: boolean = false) {
    this.handlebarsHelper("players", players, isDreamTeam);
    this.handlebarsHelper("players-number", players, isDreamTeam);
  }

  private handlebarsHelper(
    selector: string,
    players: Player[],
    isDreamTeam: boolean
  ) {
    $(`.${selector}-container`).empty();
    const source = $(`#${selector}-template`).html();
    const template = Handlebars.compile(source);
    const newHTML = template({ players, isDreamTeam });
    $(`.${selector}-container`).append(newHTML);
  }
}
