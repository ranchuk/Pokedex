import * as React from 'react';
import { Modal, Box, Card, CardContent, Typography, Button } from '@mui/material';
import PokemonItem from './PokemonItem'; // Import the PokemonItem component
import Loader from '../common-components/Loader';
import { Pokemon } from '../types';
import ModalComponent from '../common-components/ModalComponent';

interface PokemonModalProps {
  isOpen: boolean;
  pokemon: Pokemon; // You might want to define a more specific type
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleCapture: (pokemon_name: string) => void
  isLoading: boolean

}

const PokemonModal = (props: PokemonModalProps) => {

  const {    
    isOpen, handleClose, isLoading, 
    handleCapture,
    pokemon
 } = props;

 if(!pokemon) return <></>;

 const {
  attack,
  defense,
  generation,
  hit_points,
  legendary,
  name,
  number,
  special_attack,
  special_defense,
  speed,
  total,
  type_one,
  type_two,
  icon_url,
  captured
} = pokemon

  return (
   <ModalComponent isOpen={isOpen} handleClose={handleClose}>
        <Loader loading={isLoading}>

        <Card sx={{ borderRadius: '12px' }}>
          <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }} color="text.primary" gutterBottom>
              Name: {name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Number: {number}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Attack: {attack}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Defense: {defense}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Generation: {generation}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Type one: {type_one}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Hit points: {hit_points}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Legendary: {legendary}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Special attack: {special_attack}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Special defense: {special_defense}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Speed: {speed}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total: {total}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Type Two: {type_two}
            </Typography>

            <Button
                  onClick={() => handleCapture(name)}
                  sx={{
                    mt: 2,
                    backgroundColor: captured ? 'green' : 'red',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: captured ? 'darkgreen' : 'darkred',
                    },
                  }}
            >
                 {captured ? 'Captured' : 'Not Captured'}
             </Button>
   

          </Box>
          <Box sx={{ ml: 2 }}>
            <img src={icon_url} alt={name} style={{ width: '100px', borderRadius: '8px' }} />
          </Box>
        </Box>
            <Button
              onClick={handleClose}
              sx={{
                mt: 2,
                backgroundColor: 'grey',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
              }}
            >
              Close
            </Button>
          </CardContent>
        </Card>
        </Loader>
    </ModalComponent>
  );
};

export default PokemonModal;
