import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL, CAPTURE, DEFUALT_PAGE_SIZE, GET_LIST, PAGE_SIZE_NUMBERS } from './consts';
import { Pokemon, SortOrder } from './types';
import PokemonList from './components/PokemonList';
import ListActions from './components/ListActions/index';
import PaginationComponent from './components/Footer';
import { AppBar, Toolbar, Box, Container, Paper, Switch, Typography, IconButton, Drawer } from '@mui/material';
import useSessionStorage from './hooks/useSessionStorage';
import PokemonModal from './components/PokemonModal';
import { find } from 'lodash';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import Header from './components/Header';
import useFetchPokemons from './hooks/useFetchPokemons';
const App = () => {

    const [pageSize, setPageSize] = useState<number>(DEFUALT_PAGE_SIZE);
    const [page, setPage] = useSessionStorage('pokedex_page_number', 1);

    const [isDarkMode, setDarkMode] = useSessionStorage('pokedex_dark_mode', false)

    const [sort, setSort] = useState<SortOrder>(SortOrder.Ascending);
    const [filterByType, setFilterType] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModalPokemon, setSelectedModalPokemon] = useState<Pokemon>(null as unknown as Pokemon);

    const [isCapturedLoading, setIsCapturedLoading] = useState(false);

    const [isFilterDrawerOpen, setFilterDrawer] = useState(false); // Drawer state

    const { data : { data: items = [], total_items: totalItems} = {} as any, isLoading: isLoadingFetchPokemons, isFetching , refetch } = useFetchPokemons({ page, pageSize, sort, filterByType: filterByType.join(','), searchValue }) as any;

    const isLoading = isLoadingFetchPokemons || isCapturedLoading || isFetching;

    const theme = createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      });

    useEffect(() => {
      if (isModalOpen && selectedModalPokemon) {
        setSelectedModalPokemon(find(items, (item) => {
         return item.name === selectedModalPokemon.name
        }))
      }
    }, [items])

    const handleShowMore = useCallback((pokemonData: any) => {
      setSelectedModalPokemon(pokemonData);
      setIsModalOpen(true);
    },[])
    

    const handleCapture = useCallback(async (pokemon_name: string) => {
      try{
        setIsCapturedLoading(true);
         await axios.post(`${BASE_API_URL}${CAPTURE}`, {
          pokemon_name,
        });
        setIsCapturedLoading(false);
        refetch()
      }
      catch (error) {
        console.error(error);
        setIsCapturedLoading(false);
      }
  
    }, [])

    const handlePageSize = useCallback((pageSize: number) => {
      setPageSize(pageSize)
    }, [])

    const handleFilterType = useCallback((filterType: string[]) => {
      setFilterType(filterType)
    }, [])

    const handleSearch = useCallback((searchValue: string) => {
      setSearchValue(searchValue)
    }, [])
    
    const handleSort = useCallback((sortValue: SortOrder) => {
        setSort(sortValue)
    }, [])

    const handlePage = useCallback((page: number) => {
      setPage(page)
  }, [])

    const handleToggleDrawer = useCallback(() => {
      setFilterDrawer(!isFilterDrawerOpen);
    },[isFilterDrawerOpen]);

    const handleToggleDarkMode = useCallback(() => {
      setDarkMode(!isDarkMode)
    }, [isDarkMode])

    return (
        <ThemeProvider theme={theme}>

        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
        >
               <Header handleToggleDrawer={handleToggleDrawer} isDarkMode={isDarkMode} handleToggleDarkMode={handleToggleDarkMode}/>


  
                <PokemonList items={items} isLoading={isLoading} handleCapture={handleCapture} handleShowMore={handleShowMore}/>
            
            
                <Footer
                      page={page}
                      handleChange={handlePage}
                      pageSize={pageSize}
                      totalItems={totalItems}/>

                <Drawer anchor="right" open={isFilterDrawerOpen} onClose={handleToggleDrawer}>
                    <Box p={2}>
                      <ListActions
                                onPageSizeChange={handlePageSize}
                                sortValue={sort}
                                onSort={handleSort}
                                onFilter={handleFilterType}
                                filterByType={filterByType}
                                onSearch={handleSearch}
                                searchValue={searchValue}
                                pageSize={pageSize}
                      />
                    </Box>
                </Drawer>

                <PokemonModal isLoading={isLoading} isOpen={isModalOpen} pokemon={selectedModalPokemon} handleClose={() => setIsModalOpen(false)} handleCapture={handleCapture} />

        </Box>
        </ThemeProvider>
    );
};

export default App;
