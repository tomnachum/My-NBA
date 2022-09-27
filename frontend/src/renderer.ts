class Renderer {
  public renderStats(stats: Stats | string, playerId: number) {
    this.handlebarsHelper(
      `.player[data-id='${playerId}'] .stats-container`,
      "#stats-template",
      stats
    );
  }

  public renderTeam(
    players: Player[],
    isDreamTeam: boolean = false,
    name: string = "Dream Team",
    year: string = ""
  ) {
    this.handlebarsHelper(
      ".players-number-container",
      "#players-number-template",
      { counter: players.length }
    );
    this.handlebarsHelper(".team-name-container", "#team-name-template", {
      name,
      year,
    });
    this.handlebarsHelper(".players-container", "#players-template", {
      players,
      isDreamTeam,
    });
  }

  private handlebarsHelper(
    containerSelector: string,
    templateSelector: string,
    dataObject: any
  ) {
    $(containerSelector).empty();
    const source = $(templateSelector).html();
    const template = Handlebars.compile(source);
    const newHTML = template(dataObject);
    $(containerSelector).append(newHTML);
  }
}
