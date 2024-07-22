import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Pokemon } from '../types';
import { useCallback } from 'react';

interface PokemonItemProps {
  itemData: Pokemon;
  handleCapture: (pokemon_name: string) => void
  handleShowMore: (pokemonData: Pokemon) => void

}

export default function PokemonItem(props: PokemonItemProps) {
  const {     
    handleCapture,
    handleShowMore,
    itemData: {
    attack,
    defense,
    generation,
    name,
    number,
    type_one,
    icon_url,
    captured
  } } = props;

  const onShowMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleShowMore(props.itemData)
  }

  return (
    <Card sx={{ borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' , height: '100%'}}>
      <CardContent sx={{height: '100%'}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }} color="text.primary" gutterBottom>
              Name: {name}
            </Typography>
            <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
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

            <Button
                  onClick={() => handleCapture(name)}
                  size="small"
                  sx={{
                    mt: 2,
                    backgroundColor: captured ? 'green' : 'red',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: captured ? 'darkgreen' : 'darkred',
                    },
                  }}
            >
                 <Typography textTransform='none' >{captured ? 'Captured' : 'Not Captured'}</Typography>
             </Button>
   

          </Box>
          <Box sx={{ ml: 2 }}>
            <img src={icon_url} alt={name} style={{ width: '100px', borderRadius: '8px' }} />
          </Box>
        </Box>

        
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button size="small" onClick={onShowMore}>           
                <Typography sx={{ fontSize: 14}}  textTransform='none' color="text.secondary" gutterBottom>
                  See more
                </Typography>
            </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
