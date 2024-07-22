import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Chip } from '@mui/material';

interface FilterControls {
    onFilter: (filter: string[]) => void;
    onSearch: (searchValue: string) => void
    filterByType: string[]
    searchValue: string;
}

const FilterControls = ({ onFilter, onSearch, filterByType, searchValue: searchValueProp } : FilterControls) => {
  const [filter, setFilter] = useState('');
  const [filtersList, setFiltersList] = useState<string[]>(filterByType);

  const [searchValue, setSearchValue] = useState(searchValueProp);


  const handleAddFilter = () => {
    if (filter.trim()) {
      setFiltersList([...filtersList, filter.trim()]);
      setFilter('');
    }
  };

  useEffect(() => {
    if(searchValue === '') {
      handleSearch();
    }
  }, [searchValue])


  useEffect(() => {
    onFilter(filtersList)
  }, [filtersList])


  const handleRemoveFiler = (filterToRemove: string) => {
    setFiltersList(filtersList.filter(f => f !== filterToRemove));
  };

  const handleSearch = () => {
    onSearch(searchValue)
  }

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('')
  }



  return (
    <Box display="flex" gap={2} alignItems='flex-start' flexDirection='column'>
      {/* Filter Input and Add Button */}
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          placeholder='Search by any attribute'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          size="small"
        />
        <Button variant='outlined' onClick={handleSearch}>Search</Button>
        <Button variant='outlined' onClick={handleClearSearch}>Clear</Button>

      </Box>

      
      AND

      <Box display="flex" gap={1}>

          <Box display="flex" gap={1}>
              <TextField
                placeholder='Search by "Type one"'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                size="small"
              />
              <Button variant='outlined' onClick={handleAddFilter} >
                  Add
              </Button>

          </Box>

          {/* Display Added Filters */}
          <Box>
            {filtersList.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {filtersList.map((filter, index) => (
                  <Chip
                    key={index}
                    label={filter}
                    onDelete={() => handleRemoveFiler(filter)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>
      </Box>
    </Box>
  );
};

export default FilterControls;
