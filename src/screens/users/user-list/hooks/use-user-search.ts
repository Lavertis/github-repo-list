import { useState, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import { UserListItem, UserListResponse } from '../../../../types/user.ts';
import axiosInstance from '../../../../api/axiosInstance.ts';

const pageSize = 10;

const useUserSearch = (initialQuery: string) => {
  const [error, setError] = useState('');
  const [users, setUsers] = useState<UserListItem[] | undefined>(undefined);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

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
    setCurrentPage(1);
    setTotalCount(0);
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