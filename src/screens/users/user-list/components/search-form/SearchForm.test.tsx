import { fireEvent, render, screen } from '@testing-library/react';
import SearchForm from './SearchForm';
import { useState } from 'react';

const SearchFormTestWrapper = () => {
  const [query, setQuery] = useState('');
  return <SearchForm searchQuery={query} handleSearchChange={(e) => setQuery(e.target.value)} />;
};

describe('SearchForm', () => {
  it('renders the search form with the correct initial value', () => {
    const searchQuery = 'testuser';
    render(<SearchForm searchQuery={searchQuery} handleSearchChange={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Username') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(searchQuery);
  });

  it('calls handleSearchChange and updates value when input changes', () => {
    render(<SearchFormTestWrapper />);

    const inputElement = screen.getByPlaceholderText('Username') as HTMLInputElement;
    const newUsername = 'newuser';
    fireEvent.change(inputElement, { target: { value: newUsername } });

    expect(inputElement.value).toBe(newUsername);
  });
});
