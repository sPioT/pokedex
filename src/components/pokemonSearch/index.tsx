import { ArrowDownward, ArrowUpward, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import "./style.css";
import { ChangeEvent } from "react";

interface Props {
  searchText: string | undefined;
  searchUpdate: Function;
  sortBy: string;
  sortByUpdate: Function;
  sortDirection: number;
  sortDirectionUpdate: Function;
}

const PokemonSearch = ({
  searchText,
  searchUpdate,
  sortBy,
  sortByUpdate,
  sortDirection,
  sortDirectionUpdate,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      className="pokemonSearch"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        className="search"
        placeholder={t("common.searchPlaceholder")}
        type="search"
        value={searchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          searchUpdate(e.target.value)
        }
      />

      <InputLabel sx={{ marginLeft: "1em", marginRight: "0.5em" }}>
        {t("common.sortBy")}
      </InputLabel>
      <Box id="orderBy">
        <TextField
          select
          value={sortBy}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            sortByUpdate(e.target.value)
          }
          sx={{ width: "7em", textAlign: "left" }}
          label={t("common.sortBy")}
          InputLabelProps={{ shrink: false }}
        >
          <MenuItem value="id">{t("common.pokemonId")}</MenuItem>
          <MenuItem value="name">{t("common.pokemonName")}</MenuItem>
          <MenuItem value="CP">{t("common.pokemonCp")}</MenuItem>
        </TextField>
      </Box>
      <IconButton
        onClick={() => {
          sortDirectionUpdate(-sortDirection);
        }}
        title={t("common.changeSortOrder")}
      >
        {sortDirection === 1 ? <ArrowUpward /> : <ArrowDownward />}
      </IconButton>
    </Box>
  );
};

export default PokemonSearch;
