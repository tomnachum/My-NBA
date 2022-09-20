from fastapi import FastAPI, Request, Response
import uvicorn
import requests
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.mount(
    "/frontend/build",
    StaticFiles(directory="frontend/build"),
    name="frontend/build",
)

app.mount(
    "/frontend/src/style",
    StaticFiles(directory="frontend/src/style"),
    name="frontend/src/style",
)

teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
}


@app.get("/")
def get_html():
    return FileResponse("frontend\src\index.html")


def get_players_by_year(year):
    nba_response = requests.get(
        f"http://data.nba.net/data/10s/prod/v1/{year}/players.json"
    ).json()
    return nba_response["league"]["standard"]


def is_player_in_team(player, team):
    player_teams_ids = player["teamId"].split()
    teamId = teamToIDs[team]
    return any(id == teamId for id in player_teams_ids)


@app.get("/players/{team}/{year}")
def get_players(team, year):
    all_players = get_players_by_year(year)
    return [player for player in all_players if is_player_in_team(player, team)]


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
