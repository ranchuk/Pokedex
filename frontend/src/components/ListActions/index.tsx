import { Box, useTheme } from '@mui/material';

import { SortOrder } from '../../types';
import FilterControls from './FilterControls';
import SortControls from './SortControls';
import PageSizer from './PageSizer';

interface ListActionsProps {
  onSort: (order: SortOrder) => void;
  onFilter: (filter: string) => void;
  onSearch: (searchValue: string) => void;
  sortValue: SortOrder;
  onPageSizeChange: (size: number) => void;
  pageSize: number;
}

const ListActions = ({ onSort, onFilter, onSearch, sortValue, onPageSizeChange, pageSize }: ListActionsProps) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent='space-evenly'
      color='black'
      margin={2}
      gap={10}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        padding: 1,
        color: theme.palette.mode === 'dark' ? 'white' : 'black',
      }}
    >

      {/* <Typography>Filter and Sort</Typography> */}

          <Box display='flex' gap={4}>
            <PageSizer pageSize={pageSize} onPageSizeChange={onPageSizeChange}/>

            {/* Sort Options */}
            <SortControls sortValue={sortValue} onSort={onSort}/>
            </Box>
      
      {/* Filter Controls */}
      <FilterControls onFilter={onFilter} onSearch={onSearch}/>
    </Box>
  );
};

export default ListActions;
