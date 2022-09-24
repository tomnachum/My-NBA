from player import Player


class DreamTeam:
    def __init__(self) -> None:
        self._players: set[Player] = set()

    def add_player(self, playerData: dict):
        player = Player(
            playerData["picture"],
            playerData["firstName"],
            playerData["lastName"],
            playerData["jersey"],
            playerData["pos"],
        )
        self._players.add(player)

    def remove_player(self, player: Player):
        self._players.remove(player)

    def get_players(self):
        return self._players.copy()

    def __repr__(self):
        return str(self._players)
