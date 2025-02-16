import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance.ts';
import { useNavigate } from 'react-router-dom';
import { UserListItem, UserListResponse } from '../../types/user.ts';
import { useDebounce } from 'use-debounce';
import PaginationComponent from '../../components/pagination-component.tsx';

const Users = () => {
  const [error, setError] = useState('');
  const [users, setUsers] = useState<UserListItem[] | undefined>(undefined);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('john');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedSearchQuery) return;

    axiosInstance.get<UserListResponse>(`search/users?q=${debouncedSearchQuery}&per_page=${pageSize}&page=${currentPage}`)
      .then((response) => {
        setUsers(response.data.items);
        setTotalCount(response.data.total_count);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [currentPage, debouncedSearchQuery]);

  if (error) {
    return (
      <Alert variant="danger">{error}</Alert>
    );
  }

  const handleRepoList = (username: string) => {
    navigate(`/users/${username}/repos`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((totalCount > 1000 ? 1000 : totalCount) / pageSize);

  const mapUsersToRows = (users: UserListItem[], handleRepoList: (username: string) => void) => {
    return users.map(user => (
      <Row key={user.id} className="justify-content-center w-100">
        <Col xs={12} md={8} lg={7} xl={6} xxl={5} className="d-flex align-items-center justify-content-between mb-2">
          <Image src={user.avatar_url} alt={user.login} width="50" height="50" roundedCircle />
          <div className="user-login flex-grow-1 mx-3">{user.login}</div>
          <Button variant="primary" onClick={() => handleRepoList(user.login)}>
            Repositories
          </Button>
        </Col>
      </Row>
    ));
  };

  const displayUsers = () => {
    if (users === undefined) return <Alert variant="info">Loading...</Alert>;
    if (users.length === 0) return <Alert variant="info">No users found</Alert>;
    return mapUsersToRows(users, handleRepoList);
  };

  return (
    <Container>
      <Col xs={10} md={5} lg={4} xl={3} className="mx-auto">
        <Form className="mb-4">
          <Form.Group controlId="searchQuery">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username to search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
      </Col>
      <Container className="d-flex flex-column align-items-center">
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


export default Users;