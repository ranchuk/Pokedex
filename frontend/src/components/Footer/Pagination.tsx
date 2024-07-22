import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ChangeEvent, useState } from 'react';
import { useTheme } from '@mui/material';

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
    <Stack spacing={2}>
      <Pagination
          count={Math.ceil(totalItems / pageSize)} // Calculate total pages
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
      />
  
    </Stack>
  );
}
