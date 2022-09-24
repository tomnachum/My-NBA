interface playerData {
  picture: string;
  firstName: string;
  lastName: string;
  jersey: string;
  pos: string;
}

class Model {
  public async getPlayers(team: string, year: string) {
    let playersData = await $.get(`/players/${team}/${year}`);
    return playersData.map(
      (p: playerData) =>
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
