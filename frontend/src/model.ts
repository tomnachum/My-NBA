class Model {
  private players: Player[] = [];
  private isDreamTeamPlayers = false;

  public async getTeam(
    team: string,
    year: string,
    hasBdayFilter: string = "false"
  ) {
    const playersData = await $.get(
      `/players/${team}/${year}?birthDateFilter=${hasBdayFilter}`
    );
    this.players = this.createPlayers(playersData);
    this.isDreamTeamPlayers = false;
    return this.players;
  }

  private createPlayers(playersData: Player[]) {
    return playersData.map(
      (p: Player) =>
        new Player(p.picture, p.firstName, p.lastName, p.jersey, p.pos)
    );
  }

  public async getTeams() {
    return await $.get("/teams");
  }

  public async getYears() {
    return await $.get("/years");
  }

  public addToDreamTeam(playerId: number) {
    $.ajax({
      url: "/dreamTeam",
      type: "PUT",
      data: JSON.stringify(this.players[playerId]),
    });
  }

  public async getDreamTeam() {
    const playersData = await $.get("/dreamTeam");
    this.players = this.createPlayers(playersData);
    this.isDreamTeamPlayers = true;
    return this.players;
  }

  public isDreamTeam() {
    return this.isDreamTeamPlayers;
  }

  public deleteFromDreamTeam(playerId: number) {
    $.ajax({
      url: "/dreamTeam",
      type: "DELETE",
      data: JSON.stringify(this.players[playerId]),
    });
  }
}
