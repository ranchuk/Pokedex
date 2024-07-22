import { Paper, useTheme } from '@mui/material';
import React from 'react'

interface FooterProps {
    children: React.ReactNode;

}
export default function Foorer({ children }: FooterProps) {
  const theme = useTheme();

  return (
          
    <Paper
    component="footer"
    elevation={3}
    sx={{
        position: 'sticky',
        bottom: 0,
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? 'dark' : 'light',
        color: theme.palette.mode === 'dark' ? 'light' : 'dark',
    }}
        >{children}
    </Paper>
  )
}
