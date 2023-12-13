import { Box, Typography } from "@mui/material";
import Pokemon from "../../models/pokemon";
import PokemonCard from "../pokemonCard";
import { useTranslation } from "react-i18next";
import "./style.css";

interface Props {
  pokemons: Pokemon[] | undefined;
  handlePokemonChange: Function;
}

const PokemonList = ({ pokemons, handlePokemonChange }: Props) => {
  // zone pour faire des trucs
  const { t } = useTranslation();

  // Ici on construit l'interface
  return (
    <Box className="pokemonList">
      <Typography variant="h2">
        {t("common.xPokemons", { count: pokemons?.length })}
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap="20px"
        justifyContent="space-around"
        id="list"
      >
        {pokemons?.map((pokemon: Pokemon) => (
          <article>
            <PokemonCard
              pokemon={pokemon}
              handlePokemonChange={handlePokemonChange}
            />
          </article>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonList;
