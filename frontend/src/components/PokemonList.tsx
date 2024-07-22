import React from 'react';
import Grid from '@mui/material/Grid';
import PokemonItem from './PokemonItem';
import Loader from '../common-components/Loader';

interface PokemonListProps {
  items: any[];
  isLoading: boolean;
  handleCapture: (pokemon_name: string) => void
  handleShowMore: (pokemonData: any) => void
}

const PokemonList = ({ items, isLoading, handleCapture, handleShowMore }: PokemonListProps) => {
  return (
    <Loader loading={isLoading}>
      <Grid container spacing={2} pr='100px' pl="100px">
        {items.map((item) => (
          <Grid item xs={12} sm={4} md={3} key={item.number}>
            <PokemonItem itemData={item} handleCapture={handleCapture} handleShowMore={handleShowMore} />
          </Grid>
        ))}
      </Grid>
    </Loader>
  );
};

export default PokemonList;
