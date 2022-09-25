class Model {
  public async getPlayers(
    team: string,
    year: string,
    hasBdayFilter: string = "false"
  ) {
    let playersData = await $.get(
      `/players/${team}/${year}?birthDateFilter=${hasBdayFilter}`
    );
    return playersData.map(
      (p: Player) =>
        new Player(
          `https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`,
          p.firstName,
          p.lastName,
          p.jersey,
          p.pos
        )
    );
  }

  public async getTeams() {
    return await $.get("/teams");
  }

  public async getYears() {
    return await $.get("/years");
  }
}
