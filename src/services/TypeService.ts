import PokemonType from "../models/pokemonType";
import AuthenticationService from "./AuthenticationService";

export default class TypeService {
  private static types: PokemonType[];

  private static async loadTypes(): Promise<PokemonType[]> {
    return fetch("http://localhost:8080/type/", {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((reason) => {
        console.error(reason);
        throw reason;
      });
  }

  static async getTypes(): Promise<PokemonType[]> {
    if (this.types === undefined) {
      await this.loadTypes().then((typeList) => (this.types = typeList));
    }

    return new Promise((resolve) => resolve(this.types));
  }
}
