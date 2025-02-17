import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserListRow from './UserListRow';
import { UserListItem } from '../../../../../types/user';
import { randomUUID } from 'node:crypto';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

const mockUser: UserListItem = {
  id: randomUUID().toString(),
  login: 'testuser',
  avatar_url: 'https://example.com/avatar.jpg',
};

describe('UserListRow', () => {
  it('renders user information correctly', () => {
    render(
      <MemoryRouter>
        <UserListRow user={mockUser} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByAltText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /repositories/i })).toBeInTheDocument();
  });

  it('navigates to user repositories on button click', () => {
    render(
      <MemoryRouter>
        <UserListRow user={mockUser} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /repositories/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(`/users/${mockUser.login}/repos`);
  });
});
