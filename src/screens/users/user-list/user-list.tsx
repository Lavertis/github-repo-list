import { Alert, Col, Container } from 'react-bootstrap';
import PaginationComponent from '../../../components/pagination-component.tsx';
import UserListRow from './components/user-list-row.tsx';
import SearchForm from './components/search-from.tsx';
import useUserSearch from './hooks/use-user-search.ts';

const UserList = () => {
  const {
    error,
    users,
    totalCount,
    currentPage,
    searchQuery,
    handlePageChange,
    handleSearchChange,
  } = useUserSearch('john');

  const totalPages = Math.ceil((totalCount > 1000 ? 1000 : totalCount) / 10);

  const displayUsers = () => {
    if (!searchQuery) return <Alert variant="info">Please enter a username to search</Alert>;
    if (users === undefined) return <Alert variant="info">Loading...</Alert>;
    if (users.length === 0) return <Alert variant="info">No users found</Alert>;
    return users.map(user => <UserListRow key={user.id} user={user} />);
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Col xs={10} md={5} lg={4} xl={3} className="mx-auto">
        <SearchForm searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      </Col>
      <Container className="d-flex flex-column align-items-center mt-4">
        {displayUsers()}
      </Container>
      <div className="my-4" />
      <Col className="d-flex justify-content-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Col>
    </Container>
  );
};


export default UserList;