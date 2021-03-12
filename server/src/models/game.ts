import { Player } from "./player";
import { Question } from "./question";

export class Game {
  /**
    The players in this Game
  */
  players: Player[];

  /**
    The title of this @class Game
  */
  gameType: string;

  /**
    The List of @class Questions belonging to this @property gameType
  */
  questions: Question[];

  constructor(players: Player[], gameType: string, questions: Question[]) {
    this.players = players;
    this.gameType = gameType;
    this.questions = questions;
  }
}
