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
    "/frontend/src",
    StaticFiles(directory="frontend/src"),
    name="frontend/src",
)

teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
}

MIN_YEAR = 2012
MAX_YEAR = 2022


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


@app.get("/teams")
def get_teams():
    return [team for team in teamToIDs.keys()]


@app.get("/years")
def get_years():
    return [str(year) for year in range(MIN_YEAR, MAX_YEAR + 1)]


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8043, reload=True)
