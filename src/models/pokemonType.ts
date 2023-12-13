export default class PokemonType {
  id: number;
  label: string;
  color: string;

  constructor(id: number, label: string, color: string) {
    this.id = id;
    this.label = label;
    this.color = color;
  }
}
