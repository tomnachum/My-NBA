from player import Player


class DreamTeam:
    def __init__(self) -> None:
        self._players: set[Player] = set()

    def add_player(self, player: Player):
        self._players.add(player)

    def delete_player(self, player: Player):
        if player in self._players:
            self._players.remove(player)

    def get_players(self):
        return self._players.copy()

    def __repr__(self):
        return str(self._players)
