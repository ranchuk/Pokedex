import React, { memo } from 'react'

import { AppBar, Box, IconButton, Switch, Typography, useTheme } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';


interface FooterProps {
    isDarkMode: boolean,
    handleToggleDarkMode: () => void;
    handleToggleDrawer: () => void

}

export default memo(function Header({ isDarkMode, handleToggleDarkMode, handleToggleDrawer }: FooterProps) {

    const theme = useTheme();

  return (
     <AppBar position="sticky"  sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', marginBottom: '25px' }}>
                          <Box display='flex' alignItems='center' justifyContent='space-between' pl={2}>
                                <Box pt={1} pb={1} display='flex' alignItems='center' gap={3}>
                                  <img src={'/assets/Pokemon.png'} alt='pokemon-ball' height='125px' />

                                  <Typography sx={{ fontSize: 48, fontWeight: 'bold', color: 'white' }} color="text.primary">
                                      Guardio Pokedex
                                    </Typography>
                                  </Box>
                                <Box pr={2} display='flex' alignItems='center'>

                                <Typography>Dark Mode Toggle</Typography>
                                  <Switch checked={isDarkMode} onChange={handleToggleDarkMode}/>
                                  <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => handleToggleDrawer()}>

                                  <Typography>Filter</Typography>

                                  <FilterAltIcon  />
                                </IconButton>
                                </Box>
                
                    </Box>
    </AppBar>
  )
})
