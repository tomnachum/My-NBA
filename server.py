from fastapi import FastAPI, Request, Response
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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
def get_players(team, year):
    all_players = nba.get_players_by_year(year)
    return [player for player in all_players if nba.is_player_in_team(player, team)]


@app.get("/teams")
def get_teams():
    return [team for team in nba.teamToIDs.keys()]


@app.get("/years")
def get_years():
    return [str(year) for year in range(nba.MIN_YEAR, nba.MAX_YEAR + 1)]


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8043, reload=True)
