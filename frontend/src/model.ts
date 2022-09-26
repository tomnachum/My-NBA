class Model {
  private players: Player[] = [];

  public async getPlayers(
    team: string,
    year: string,
    hasBdayFilter: string = "false"
  ) {
    let playersData = await $.get(
      `/players/${team}/${year}?birthDateFilter=${hasBdayFilter}`
    );
    this.players = playersData.map(
      (p: Player) =>
        new Player(
          `https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`,
          p.firstName,
          p.lastName,
          p.jersey,
          p.pos
        )
    );
    return this.players;
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
}
