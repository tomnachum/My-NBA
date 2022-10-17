"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Model {
    constructor() {
        this.players = [];
        this.isDreamTeamPlayers = false;
    }
    getTeam(team, year, hasBdayFilter = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const playersData = yield $.get(`/players/${team}/${year}?birthDateFilter=${String(hasBdayFilter)}`);
            this.players = this.createPlayers(playersData);
            this.isDreamTeamPlayers = false;
            return this.players;
        });
    }
    createPlayers(playersData) {
        return playersData.map((p) => new Player(p.picture, p.firstName, p.lastName, p.jersey, p.pos));
    }
    getTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield $.get("/teams");
        });
    }
    getYears() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield $.get("/years");
        });
    }
    addToDreamTeam(playerId) {
        $.ajax({
            url: "/dreamTeam",
            type: "PUT",
            data: JSON.stringify(this.players[playerId]),
        });
    }
    getDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const playersData = yield $.get("/dreamTeam");
            this.players = this.createPlayers(playersData);
            this.isDreamTeamPlayers = true;
            return this.players;
        });
    }
    isDreamTeam() {
        return this.isDreamTeamPlayers;
    }
    deleteFromDreamTeam(playerId) {
        $.ajax({
            url: "/dreamTeam",
            type: "DELETE",
            data: JSON.stringify(this.players[playerId]),
        });
    }
    getStats(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.players[playerId];
            const stats = yield $.get(`/stats/${player.lastName}/${player.firstName}`);
            if (stats === "unavilable") {
                return stats;
            }
            return new Stats(stats.assists_per_game, stats.blocks_per_game, stats.points_per_game, stats.rebounds_per_game);
        });
    }
}
//# sourceMappingURL=model.js.map