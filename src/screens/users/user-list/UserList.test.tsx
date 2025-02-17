import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserList from './UserList';
import { BrowserRouter } from 'react-router-dom';
import * as useUserSearch from './hooks/use-user-search';

jest.mock('./hooks/use-user-search');

describe('UserList', () => {
  it('renders search form and displays initial message when no users are found', () => {
    (useUserSearch.default as jest.Mock).mockReturnValue({
      users: [],
      totalCount: 0,
      currentPage: 1,
      searchQuery: '',
      handlePageChange: jest.fn(),
      handleSearchChange: jest.fn(),
      error: null,
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByText('Please enter a username to search')).toBeInTheDocument();
  });

  it('shows loading state when users are undefined', () => {
    (useUserSearch.default as jest.Mock).mockReturnValue({
      users: undefined,
      totalCount: 0,
      currentPage: 1,
      searchQuery: 'john',
      handlePageChange: jest.fn(),
      handleSearchChange: jest.fn(),
      error: null,
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    (useUserSearch.default as jest.Mock).mockReturnValue({
      users: [],
      totalCount: 0,
      currentPage: 1,
      searchQuery: 'john',
      handlePageChange: jest.fn(),
      handleSearchChange: jest.fn(),
      error: 'Something went wrong',
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('displays no users found message when users array is empty', () => {
    (useUserSearch.default as jest.Mock).mockReturnValue({
      users: [],
      totalCount: 0,
      currentPage: 1,
      searchQuery: 'john',
      handlePageChange: jest.fn(),
      handleSearchChange: jest.fn(),
      error: null,
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('displays users correctly when data is available', async () => {
    const mockUsers = [
      { id: '1', login: 'testuser1', avatar_url: 'https://example.com/avatar1.jpg' },
      { id: '2', login: 'testuser2', avatar_url: 'https://example.com/avatar2.jpg' },
    ];

    (useUserSearch.default as jest.Mock).mockReturnValue({
      users: mockUsers,
      totalCount: mockUsers.length,
      currentPage: 1,
      searchQuery: 'john',
      handlePageChange: jest.fn(),
      handleSearchChange: jest.fn(),
      error: null,
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('testuser1')).toBeInTheDocument();
      expect(screen.getByText('testuser2')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', () => {
    (useUserSearch.default as jest.Mock).mockReturnValue({
      users: [{ id: '1', login: 'testuser', avatar_url: 'https://example.com/avatar.jpg' }],
      totalCount: 25,
      currentPage: 1,
      searchQuery: 'john',
      handlePageChange: jest.fn(),
      handleSearchChange: jest.fn(),
      error: null,
    });

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    const paginationButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(paginationButton);

    expect(useUserSearch.default).toHaveBeenCalledWith('john');
  });
});
