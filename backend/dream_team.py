from player import Player


class DreamTeam:
    def __init__(self) -> None:
        self._players: list[Player] = []

    def add_player(self, player: Player):
        self._players.append(player)

    def remove_player(self, player: Player):
        self._players.remove(player)

    def get_players(self):
        return self._players

    def __repr__(self):
        return str(self._players)
