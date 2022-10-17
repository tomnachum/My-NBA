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

    def __eq__(self, other):
        if isinstance(other, Player):
            return (
                self.picture == other.picture
                and self.firstName == other.firstName
                and self.lastName == other.lastName
                and self.jersey == other.jersey
                and self.pos == other.pos
            )
        return False

    def __hash__(self):
        return hash(
            (self.picture, self.firstName, self.lastName, self.jersey, self.pos)
        )
