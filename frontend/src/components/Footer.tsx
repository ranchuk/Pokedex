import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Paper, useTheme } from '@mui/material';

interface PaginationComponentProps {
    pageSize: number,
    page: number,
    totalItems: number,
    handleChange: (newPage: number) => void
}
export default function PaginationComponent(props: PaginationComponentProps) {
  const theme = useTheme();

    const { pageSize, totalItems, handleChange, page } = props;


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        handleChange(value);
    };

    
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
      }}>
          <Stack spacing={2}>
            <Pagination
                count={Math.ceil(totalItems / pageSize)} // Calculate total pages
                page={page}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
            />
        
          </Stack>
    </Paper>

  );
}
