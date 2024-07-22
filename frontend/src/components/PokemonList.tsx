import React from 'react';
import Grid from '@mui/material/Grid';
import PokemonItem from './PokemonItem';
import Loader from '../common-components/Loader';
import { Box } from '@mui/material';
import { Pokemon } from '../types';

interface PokemonListProps {
  items: Pokemon[];
  isLoading: boolean;
  handleCapture: (pokemon_name: string) => void
  handleShowMore: (pokemonData: Pokemon) => void
}

const PokemonList = ({ items, isLoading, handleCapture, handleShowMore }: PokemonListProps) => {
  return (
    <Box overflow="auto">

    <Loader loading={isLoading}>
      <Grid container spacing={2} pr='100px' pl="100px">
        {items.map((item) => (
          <Grid item xs={12} sm={4} md={3} key={item.number}>
            <PokemonItem itemData={item} handleCapture={handleCapture} handleShowMore={handleShowMore} />
          </Grid>
        ))}
      </Grid>
    </Loader>
    </Box>
  );
};

export default PokemonList;
