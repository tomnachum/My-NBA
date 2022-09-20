from fastapi import FastAPI, Request, Response
import uvicorn
import requests


app = FastAPI()


@app.get("/players/{team}/{year}")
def get_players(team, year):
    return team, year


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
