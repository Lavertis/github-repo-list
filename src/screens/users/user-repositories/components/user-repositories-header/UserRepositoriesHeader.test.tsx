import { render, screen } from '@testing-library/react';
import UserRepositoriesHeader from './UserRepositoriesHeader';
import { UserDetails } from '../../../../../types/user.ts';
import { randomUUID } from 'node:crypto';

jest.mock('../../../../../components/StatBadge.tsx', () => ({
  __esModule: true,
  default: ({ value, Icon }: any) => (
    <div data-testid="stat-badge">
      <Icon />
      <span>{value}</span>
    </div>
  ),
}));

describe('UserRepositoriesHeader', () => {
  const userMock: UserDetails = {
    id: randomUUID().toString(),
    login: 'john_doe',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    name: 'John Doe',
    public_repos: 10,
    followers: 100,
    following: 50,
    location: 'New York',
    bio: 'Software Engineer'
  };

  test('renders the component with user data', () => {
    render(<UserRepositoriesHeader user={userMock} />);

    expect(screen.getByText(`${userMock.login} (${userMock.name})`)).toBeInTheDocument();

    expect(screen.getByText(userMock.public_repos.toString())).toBeInTheDocument();
    expect(screen.getByText(userMock.followers.toString())).toBeInTheDocument();
    expect(screen.getByText(userMock.following.toString())).toBeInTheDocument();
  });

  test('renders nothing when user is undefined', () => {
    render(<UserRepositoriesHeader user={undefined} />);

    expect(screen.queryByText(userMock.login)).toBeNull();
    expect(screen.queryByText(userMock.public_repos.toString())).toBeNull();
    expect(screen.queryByText(userMock.followers.toString())).toBeNull();
    expect(screen.queryByText(userMock.following.toString())).toBeNull();
  });

  test('renders StatBadge components with correct props', () => {
    render(<UserRepositoriesHeader user={userMock} />);

    const statBadges = screen.getAllByTestId('stat-badge');

    expect(statBadges).toHaveLength(3);
    expect(statBadges[0]).toHaveTextContent(userMock.public_repos.toString());
    expect(statBadges[1]).toHaveTextContent(userMock.followers.toString());
    expect(statBadges[2]).toHaveTextContent(userMock.following.toString());
  });

  test('renders user login and name', () => {
    render(<UserRepositoriesHeader user={userMock} />);

    expect(screen.getByText(`${userMock.login} (${userMock.name})`)).toBeInTheDocument();
  });
});
