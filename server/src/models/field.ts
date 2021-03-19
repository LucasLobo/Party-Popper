import { colors, categories } from "src/contants/constant";

export class Field {
  position: number;
  color: string;
  category: string;

  constructor(position: number, color: string, category: string) {

    this.color = color;
    this.category = category;
    this.position = position;
  }
}
