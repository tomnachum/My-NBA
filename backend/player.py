class Player:
    def __init__(
        self, picture: str, firstName: str, lastName: str, jersey: str, pos: str
    ) -> None:
        self.picture = picture
        self.firstName = firstName
        self.lastName = lastName
        self.jersey = jersey
        self.pos = pos

    def __repr__(self):
        return self.firstName
