export class Question {
  /**
   The id of this question
 */
  id: number;

  /**
    The content of this question
 */
  question: string;

  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
  }
}
