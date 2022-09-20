from fastapi import FastAPI, Request, Response
import uvicorn
import requests


app = FastAPI()


@app.get("/players/{team}/{year}")
def get_players(team, year):
    nba_response = requests.get(
        f"http://data.nba.net/data/10s/prod/v1/{year}/players.json"
    ).json()
    all_players = nba_response["league"]["standard"]
    return all_players


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
