from fastapi import FastAPI, Request, Response
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from stats import Stats
from player import Player
from dream_team import DreamTeam
import nba_api_handler as nba
import requests

app = FastAPI()

JS_FILES_DIR = "client/build"
TEMPLATE_DIR = "client/src"
HTML_DIR = "client\src\index.html"

app.mount(
    f"/{JS_FILES_DIR}",
    StaticFiles(directory=JS_FILES_DIR),
    name=JS_FILES_DIR,
)

app.mount(
    f"/{TEMPLATE_DIR}",
    StaticFiles(directory=TEMPLATE_DIR),
    name=TEMPLATE_DIR,
)


@app.get("/")
def get_html():
    return FileResponse(HTML_DIR)


def create_player(player_data: dict) -> Player:
    return Player(
        f"https://nba-players.herokuapp.com/players/{player_data['lastName']}/{player_data['firstName']}",
        player_data["firstName"],
        player_data["lastName"],
        player_data["jersey"],
        player_data["pos"],
    )


@app.get("/players/{team}/{year}")
def get_players(team, year, birthDateFilter=False):
    all_players = nba.get_players_by_year(year)
    team_players = [
        player for player in all_players if nba.is_player_in_team(player, team)
    ]
    if birthDateFilter == "true":
        team_players = list(
            filter(lambda player: player["dateOfBirthUTC"] != "", team_players)
        )
    return [create_player(player_data) for player_data in team_players]


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


@app.put("/dreamTeam")
async def add_player(request: Request):
    player_data = await request.json()
    player = create_player(player_data)
    dream_team.add_player(player)


@app.delete("/dreamTeam")
async def delete_player(request: Request):
    player_data = await request.json()
    player = create_player(player_data)
    dream_team.delete_player(player)


def create_stats(stats_data: dict) -> Stats:
    return Stats(
        stats_data["assists_per_game"],
        stats_data["blocks_per_game"],
        stats_data["points_per_game"],
        stats_data["rebounds_per_game"],
    )


@app.get("/stats/{lname}/{fname}")
def get_stats(lname, fname):
    try:
        stats_data = requests.get(
            f"https://nba-players.herokuapp.com/players-stats/{lname}/{fname}"
        ).json()
        return create_stats(stats_data)
    except requests.exceptions.RequestException:
        return "unavilable"


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
