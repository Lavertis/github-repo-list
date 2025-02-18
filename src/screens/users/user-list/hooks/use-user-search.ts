import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { UserListItem, UserListResponse } from '../../../../types/user.ts';
import axiosInstance from '../../../../api/axios-instance.ts';


const useUserSearch = (initialQuery: string) => {
  const pageSize = 10;
  const [error, setError] = useState('');
  const [users, setUsers] = useState<UserListItem[] | undefined>(undefined);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setUsers(undefined);
      setTotalCount(0);
      return;
    }

    axiosInstance.get<UserListResponse>(`search/users?q=${debouncedSearchQuery}&per_page=${pageSize}&page=${currentPage}`)
      .then((response) => {
        setUsers(response.data.items);
        setTotalCount(response.data.total_count);
      })
      .catch((error) => {
        setError(error.message);
      });

  }, [currentPage, debouncedSearchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return {
    error,
    users,
    totalCount,
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearchChange,
  };
};

export default useUserSearch;