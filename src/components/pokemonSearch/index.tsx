import { Add, ArrowDownward, ArrowUpward, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import "./style.css";
import { ChangeEvent, useState } from "react";
import PokemonEdit from "../pokemonEdit";

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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <>
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
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
          title={t("common.addPokemon")}
        >
          <Add />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={t("pokemon.000")}
        aria-describedby={t("pokemon.000")}
      >
        {/* c'est là que vous devez travailler */}
        <PokemonEdit
          handleCloseEdit={handleClose}
          handlePokemonChange={handleClose}
        />
      </Modal>
    </>
  );
};

export default PokemonSearch;
