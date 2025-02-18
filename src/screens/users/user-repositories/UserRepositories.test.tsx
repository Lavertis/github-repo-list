import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserRepositories from './UserRepositories';
import { useUserDetails } from './hooks/use-user-details';
import { useUserRepositories } from './hooks/use-user-repositories';

jest.mock('./hooks/use-user-details');
jest.mock('./hooks/use-user-repositories');

const mockUseUserDetails = useUserDetails as jest.Mock;
const mockUseUserRepositories = useUserRepositories as jest.Mock;

describe('UserRepositories', () => {
  it('doesn\'t display anything when user data is not available', async () => {
    mockUseUserDetails.mockReturnValue({ user: null, error: null });
    mockUseUserRepositories.mockReturnValue({ repositories: [], error: null });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:userId" element={<UserRepositories />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('UserRepositoriesHeader')).not.toBeInTheDocument();
  });

  it('displays an error message when there is an error fetching user data', () => {
    mockUseUserDetails.mockReturnValue({ user: null, error: 'User not found' });
    mockUseUserRepositories.mockReturnValue({ repositories: [], error: null });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:userId" element={<UserRepositories />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('User not found')).toBeInTheDocument();
  });

  it('displays an error message when there is an error fetching repositories', () => {
    mockUseUserDetails.mockReturnValue({ user: { login: 'john' }, error: null });
    mockUseUserRepositories.mockReturnValue({ repositories: [], error: 'Error fetching repositories' });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:userId" element={<UserRepositories />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error fetching repositories')).toBeInTheDocument();
  });

  it('displays message when there are no repositories', () => {
    mockUseUserDetails.mockReturnValue({ user: { login: 'john' }, error: null });
    mockUseUserRepositories.mockReturnValue({ repositories: [], error: null });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:userId" element={<UserRepositories />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('No repositories found')).toBeInTheDocument();
  });

  it('renders repositories correctly', () => {
    const mockRepos = [
      { id: 1, name: 'repo1', description: 'Description 1' },
      { id: 2, name: 'repo2', description: 'Description 2' },
    ];
    mockUseUserDetails.mockReturnValue({ user: { login: 'john' }, error: null });
    mockUseUserRepositories.mockReturnValue({ repositories: mockRepos, error: null });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:userId" element={<UserRepositories />} />
        </Routes>
      </MemoryRouter>
    );

    mockRepos.forEach(repo => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      expect(screen.getByText(repo.description)).toBeInTheDocument();
    });
  });

  it('renders pagination component and handles page change', async () => {
    const mockReposPage1 = [
      { id: 1, name: 'repo1', description: 'Description 1' },
      { id: 2, name: 'repo2', description: 'Description 2' },
      { id: 3, name: 'repo3', description: 'Description 3' },
      { id: 4, name: 'repo4', description: 'Description 4' },
      { id: 5, name: 'repo5', description: 'Description 5' },
    ];
    const mockReposPage2 = [
      { id: 6, name: 'repo6', description: 'Description 6' },
    ];

    mockUseUserDetails.mockReturnValue({ user: { login: 'john', public_repos: 6 }, error: null });
    mockUseUserRepositories
      .mockReturnValueOnce({ repositories: mockReposPage1, error: null })
      .mockReturnValueOnce({ repositories: mockReposPage2, error: null });

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:userId" element={<UserRepositories />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('repo1')).toBeInTheDocument();

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    await waitFor(() => expect(screen.getByText('repo6')).toBeInTheDocument());
  });

});
