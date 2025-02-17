import { render, screen } from '@testing-library/react';
import RepositoryCard from './RepositoryCard';
import { Repository } from '../../../../../types/repository.ts';

jest.mock('../../../../../components/StatBadge.tsx', () => ({
  __esModule: true,
  default: ({ value, Icon }: any) => (
    <div data-testid="stat-badge">
      <Icon />
      <span>{value}</span>
    </div>
  ),
}));

describe('RepositoryCard', () => {
  const repoMock: Repository = {
    id: 1,
    name: 'repo-name',
    description: 'This is a sample repository description',
    html_url: 'https://github.com/repo-name',
    language: 'JavaScript',
    stargazers_count: 100,
    forks_count: 50,
    watchers_count: 25,
    open_issues_count: 5,
  };

  test('renders repository name and description', () => {
    render(<RepositoryCard repo={repoMock} />);

    const repoNameLink = screen.getByRole('link', { name: repoMock.name });
    expect(repoNameLink).toHaveAttribute('href', repoMock.html_url);
    expect(repoNameLink).toBeInTheDocument();

    expect(screen.getByText(repoMock.description ?? '')).toBeInTheDocument();
  });

  test('renders StatBadge components with correct values', () => {
    render(<RepositoryCard repo={repoMock} />);

    const statBadges = screen.getAllByTestId('stat-badge');
    expect(statBadges).toHaveLength(5); // 5 StatBadge components (language, stars, forks, watchers, issues)

    expect(statBadges[0]).toHaveTextContent(repoMock.language ?? '');
    expect(statBadges[1]).toHaveTextContent(repoMock.stargazers_count.toString());
    expect(statBadges[2]).toHaveTextContent(repoMock.forks_count.toString());
    expect(statBadges[3]).toHaveTextContent(repoMock.watchers_count.toString());
    expect(statBadges[4]).toHaveTextContent(repoMock.open_issues_count.toString());
  });

  test('does not display language badge if language is missing', () => {
    const repoWithoutLanguage = { ...repoMock, language: undefined };
    render(<RepositoryCard repo={repoWithoutLanguage} />);

    const languageBadge = screen.queryByText(repoMock.language ?? '');
    expect(languageBadge).toBeNull();
  });

  test('renders the correct link for the repository', () => {
    render(<RepositoryCard repo={repoMock} />);

    const repoLink = screen.getByRole('link', { name: repoMock.name });
    expect(repoLink).toHaveAttribute('href', repoMock.html_url);
  });

  test('handles missing description gracefully', () => {
    const repoWithoutDescription = { ...repoMock, description: undefined };
    render(<RepositoryCard repo={repoWithoutDescription} />);

    const description = screen.queryByText(repoMock.description ?? '');
    expect(description).toBeNull();
  });
});
