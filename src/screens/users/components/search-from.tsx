import { Form } from 'react-bootstrap';
import { ChangeEvent, FC } from 'react';

interface SearchFormProps {
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: FC<SearchFormProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <Form>
      <Form.Group controlId="searchQuery">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchForm;