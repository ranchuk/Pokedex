import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

const Loader = ({ loading, children }: LoaderProps) => {
  const theme = useTheme();

  return (
    <Box position="relative">
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)', // Adjust based on theme mode
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {children}
    </Box>
  );
};

export default Loader;
