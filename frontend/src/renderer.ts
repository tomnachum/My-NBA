class Renderer {
  public renderStats(stats: Stats | string, statsDiv: JQuery<HTMLElement>) {
    statsDiv.empty();
    const source = $(`#stats-template`).html();
    const template = Handlebars.compile(source);
    const newHTML = template(stats);
    statsDiv.append(newHTML);
  }

  public renderTeam(
    players: Player[],
    isDreamTeam: boolean = false,
    name: string = "Dream Team",
    year: string = ""
  ) {
    this.handlebarsHelper("players-number", { counter: players.length });
    this.handlebarsHelper("team-name", { name, year });
    this.handlebarsHelper("players", { players, isDreamTeam });
  }

  private handlebarsHelper(selector: string, dataObject: any) {
    $(`.${selector}-container`).empty();
    const source = $(`#${selector}-template`).html();
    const template = Handlebars.compile(source);
    const newHTML = template(dataObject);
    $(`.${selector}-container`).append(newHTML);
  }
}
