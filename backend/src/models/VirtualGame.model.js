/**
 * Virtual Game Model (Data Structure Only)
 */

class VirtualGame {
  constructor(data) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.homeTeam = data.homeTeam || null;
    this.awayTeam = data.awayTeam || null;
    this.homeOdds = parseFloat(data.homeOdds || 1.5).toFixed(2);
    this.drawOdds = parseFloat(data.drawOdds || 3.0).toFixed(2);
    this.awayOdds = parseFloat(data.awayOdds || 2.5).toFixed(2);
    this.stake = parseFloat(data.stake || 0).toFixed(2);
    this.selectedOutcome = data.selectedOutcome || null; // HOME, DRAW, AWAY
    this.result = data.result || null; // Amount won (null if loss)
    this.status = data.status || 'SCHEDULED'; // SCHEDULED, RUNNING, COMPLETED
    this.homeGoals = data.homeGoals || 0;
    this.awayGoals = data.awayGoals || 0;
    this.startTime = data.startTime || null;
    this.endTime = data.endTime || null;
    this.adminControlled = data.adminControlled || true;
    this.createdAt = data.createdAt || new Date();
    this.settledAt = data.settledAt || null;
  }
}

module.exports = VirtualGame;
