import requests

# years supported by data.nba.net API
MIN_YEAR = 2012
MAX_YEAR = 2022

teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
}


def get_players_by_year(year):
    nba_response = requests.get(
        f"http://data.nba.net/data/10s/prod/v1/{year}/players.json"
    ).json()
    return nba_response["league"]["standard"]


def is_player_in_team(player, team):
    player_teams_ids = player["teamId"].split()
    teamId = teamToIDs[team]
    return any(id == teamId for id in player_teams_ids)
