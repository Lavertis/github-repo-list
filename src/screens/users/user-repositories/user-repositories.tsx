import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance.ts';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { UserDetails } from '../../../types/user.ts';
import PaginationComponent from '../../../components/pagination-component.tsx';
import { Repository } from '../../../types/repository.ts';
import RepositoryCard from './components/repository-card.tsx';
import UserRepositoriesHeader from './components/user-repositories-header.tsx';


const UserRepositories = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserDetails | undefined>(undefined);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(user?.public_repos ? Math.ceil(user.public_repos / pageSize) : 0);
  }, [user]);

  useEffect(() => {
    if (userId) {
      axiosInstance.get<UserDetails>(`users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setTotalPages(Math.ceil(response.data.public_repos / pageSize));
        })
        .catch((error) => {
          setError(error.message);
        });

      axiosInstance.get<Repository[]>(`users/${userId}/repos?page=${currentPage}&per_page=${pageSize}`)
        .then((response) => {
          setRepositories(response.data);
          setTotalPages(Math.ceil(response.data.length / 10)); // Assuming the API returns the total count
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [userId, currentPage]);

  const displayRepositories = () => {
    if (!user) return <Alert variant="info">Loading...</Alert>;
    if (repositories.length === 0) return <Alert variant="info">No repositories found</Alert>;
    return repositories.map((repo) => <RepositoryCard key={repo.id} repo={repo} />);
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Col md={10} xl={9} xxl={8} className="mx-auto">
        <UserRepositoriesHeader user={user} />
        <Row className="d-flex justify-content-center mb-2">
          {displayRepositories()}
        </Row>
        <Col className="d-flex justify-content-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={pageNumber => setCurrentPage(pageNumber)}
          />
        </Col>
      </Col>
  </Container>
  );
};

export default UserRepositories;