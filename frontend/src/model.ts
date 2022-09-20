class Model {
  async getPlayers(team: string, year: number) {
    let res = await $.get(`/players/${team}/${year}`);
    console.log(res);
  }
}
