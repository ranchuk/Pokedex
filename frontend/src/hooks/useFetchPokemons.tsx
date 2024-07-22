import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL, GET_LIST } from '../consts';
import { Pokemon, SortOrder } from '../types';

interface FetchPokemonsParams {
  page: number;
  pageSize: number;
  sort: SortOrder;
  filterByType?: string;
  searchValue?: string
}

export interface FetchPokemonsResponse {
  total_items: number;
  data: Pokemon[];
}

const fetchPokemons = async (params: FetchPokemonsParams): Promise<FetchPokemonsResponse> => {
  const response = await axios.get(`${BASE_API_URL}${GET_LIST}`, {
    params: {
      page: params.page,
      sort: params.sort,
      pageSize: params.pageSize,
      filters: `${params.filterByType ? `type_one=${params.filterByType.replace(/\s/g, "")}` : ''}`+
      `${params.searchValue ? `${params.filterByType ? '&' : ''}search=${params.searchValue.replace(/\s/g, "")}` : ''}` || undefined,
    },
  });
  return response.data;
};

const useFetchPokemons = (params: FetchPokemonsParams) => {

  
  return useQuery(['pokemons', params.page, params.pageSize, params.sort, params.filterByType, params.searchValue], () => fetchPokemons(params), {
    keepPreviousData: false,
    staleTime: 10000, // Data is fresh for 5 minutes
    cacheTime: 10000, // Cache data for 10 minutes
  });
};

export default useFetchPokemons;
