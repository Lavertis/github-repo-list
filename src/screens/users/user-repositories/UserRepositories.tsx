import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import PaginationRow from '../../../components/PaginationRow.tsx';
import RepositoryCard from './components/repository-card/RepositoryCard.tsx';
import UserRepositoriesHeader from './components/user-repositories-header/UserRepositoriesHeader.tsx';
import { useUserDetails } from './hooks/use-user-details.ts';
import { useUserRepositories } from './hooks/use-user-repositories.ts';


const UserRepositories = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, error: userError } = useUserDetails(userId);
  const pageSize = 5;
  const totalPages = Math.ceil(user?.public_repos ?? 0 / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const { repositories, error: reposError } = useUserRepositories(userId, currentPage, pageSize);

  const displayRepositories = () => {
    if (repositories?.length === 0) return <Alert variant="info">No repositories found</Alert>;
    return repositories?.map((repo) => <RepositoryCard key={repo.id} repo={repo} />);
  };

  if (userError || reposError) return <Alert variant="danger">{userError ?? reposError}</Alert>;
  if (!user || !repositories) return null;

  return (
    <Container>
      <Col md={10} xl={9} xxl={8} className="mx-auto">
        <UserRepositoriesHeader user={user} />
        <Row className="d-flex justify-content-center mb-2">
          {displayRepositories()}
        </Row>
        <Col className="d-flex justify-content-center">
          <PaginationRow
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