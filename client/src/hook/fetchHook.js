import { useEffect, useState } from 'react';
//  external import
import axios from 'axios';
//  internal import
import { getUsername } from '../helpers/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
const useFetch = (query) => {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username } = !query ? await getUsername() : '';

        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api${query}`);

        if (status === 200 || status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({
            ...prev,
            apiData: data,
            status: status,
          }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.log('fetch error', error);
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
};

export default useFetch;
