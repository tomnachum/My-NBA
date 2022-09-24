from fastapi import FastAPI, Request, Response
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from player import Player
from dream_team import DreamTeam
import nba_api_handler as nba

app = FastAPI()

app.mount(
    "/frontend/build",
    StaticFiles(directory="frontend/build"),
    name="frontend/build",
)

app.mount(
    "/frontend/src",
    StaticFiles(directory="frontend/src"),
    name="frontend/src",
)


@app.get("/")
def get_html():
    return FileResponse("frontend\src\index.html")


@app.get("/players/{team}/{year}")
def get_players(team, year, filterActive=False):
    all_players = nba.get_players_by_year(year)
    players_of_team = [
        player for player in all_players if nba.is_player_in_team(player, team)
    ]
    if filterActive == "true":
        players_of_team = filter(
            lambda player: "isActive" in player and player["isActive"], players_of_team
        )
    return players_of_team


@app.get("/teams")
def get_teams():
    return [team for team in nba.teamToIDs.keys()]


@app.get("/years")
def get_years():
    return [str(year) for year in range(nba.MIN_YEAR, nba.MAX_YEAR + 1)]


dream_team = DreamTeam()


@app.get("/dreamTeam")
def get_dream_team():
    return dream_team.get_players()


def data_to_player(playerData: dict) -> Player:
    return Player(
        playerData["picture"],
        playerData["firstName"],
        playerData["lastName"],
        playerData["jersey"],
        playerData["pos"],
    )


@app.put("/dreamTeam")
async def add_player(request: Request):
    playerData = await request.json()
    player = data_to_player(playerData)
    dream_team.add_player(player)


@app.delete("/dreamTeam")
async def delete_player(request: Request):
    playerData = await request.json()
    player = data_to_player(playerData)
    dream_team.delete_player(player)


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8046, reload=True)
