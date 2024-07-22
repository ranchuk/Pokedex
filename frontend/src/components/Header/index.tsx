import { AppBar, Typography, useTheme } from '@mui/material'
import React from 'react'


interface FooterProps {
    children: React.ReactNode;

}

export default function Header({ children }: FooterProps) {

    const theme = useTheme();

  return (
    <AppBar position="sticky"  sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', marginBottom: '25px' }}>
       {children}
    </AppBar>
  )
}
