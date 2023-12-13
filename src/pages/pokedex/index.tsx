import PokemonList from "../../components/pokemonList";
import PokemonSearch from "../../components/pokemonSearch";
import { useEffect, useState } from "react";
import Pokemon from "../../models/pokemon";
import { mockDataPokemons } from "../../data/mockData";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Pokedex = () => {
  const { t } = useTranslation();

  const params = useParams();

  const [pokemonOrigin, setPokemonOrigin] =
    useState<Pokemon[]>(mockDataPokemons);
  const [pokemonL, setPokemonL] = useState<Pokemon[]>([]);

  const [searchText, setSearchText] = useState<string | undefined>(
    params.filter
  );
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<number>(1);

  /* met à jour la liste des pokemons avec un pokemon modifié */
  const handlePokemonChange = (pok: Pokemon) => {
    let result: Pokemon[];

    // méthode a : supprime le pokemon à modifier puis le rajoute à la fn de la liste
    // étape 1 : suppression du pokemon de la liste
    result = pokemonOrigin.filter((p: Pokemon) => p.id !== pok.id);
    // étape 2 : ajout de la version modifiée du pokemon à la fin de la liste
    result.push(pok);

    /*
    // méthode b : on recherche la position du pokemon à modifier puis on le remplace par la nouvelle version
    // étape 1 : initialisation de result avec tous les pokemons
    result = pokemonOrigin;
    // étape 2 : recherche de l'emplacement du pokemon à modifier
    const idx: number = result.findIndex((p: Pokemon) => p.id === pok.id);
    //étape 3 : remplacement du pokemon à la position trouvée par sa nouvelle version
    result.splice(idx, 1, pok);
    */

    setPokemonOrigin(result);
  };

  // effet qui se déclenche si un des élément parmis [sortBy, searchText, sortDirection, t] est modifié
  useEffect(() => {
    // on repart de la liste complète des pokémons et on la fitre en fonction de searchText
    let tempFiltered: Pokemon[];

    if (searchText !== undefined) {
      tempFiltered = pokemonOrigin.filter((pokemon: Pokemon) =>
        t("pokemon." + pokemon.id)
          .toLowerCase()
          .startsWith(searchText.toLowerCase())
      );
    } else {
      tempFiltered = pokemonOrigin;
    }

    // la liste filtrée est ensuite triée
    let tempSorted: Pokemon[] = tempFiltered.sort((a: Pokemon, b: Pokemon) => {
      let valA: number | string = a.id;
      let valB: number | string = b.id;

      if (sortBy === "name") {
        valA = a.name;
        valB = b.name;
      } else if (sortBy === "CP") {
        valA = a.cp;
        valB = b.cp;
      }

      return valA > valB ? sortDirection : -sortDirection;
    });

    // le résultat obtenu est mis dans pokemonL qui est la liste des pokémons affichés
    setPokemonL(tempSorted);
  }, [sortBy, searchText, sortDirection, pokemonOrigin, t]);

  return (
    <>
      <PokemonSearch
        searchText={searchText}
        searchUpdate={setSearchText}
        sortBy={sortBy}
        sortByUpdate={setSortBy}
        sortDirection={sortDirection}
        sortDirectionUpdate={setSortDirection}
      />
      <PokemonList
        pokemons={pokemonL}
        handlePokemonChange={handlePokemonChange}
      />
    </>
  );
};

export default Pokedex;
