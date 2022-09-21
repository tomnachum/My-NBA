interface playerData {
  picture: string;
  firstName: string;
  lastName: string;
  jersey: string;
  pos: string;
}

class Model {
  public players: Player[] = [];

  public async callPlayersAPI(team: string, year: number) {
    let playersData = await $.get(`/players/${team}/${year}`);
    this.players = playersData.map(
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

  public getPlayers() {
    let playersCopy = JSON.parse(JSON.stringify(this.players));
    return playersCopy.map(
      (p: Player) =>
        new Player(p.picture, p.fname, p.lname, p.jerseyNumber, p.position)
    );
  }
}
