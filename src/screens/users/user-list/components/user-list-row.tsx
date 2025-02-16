import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { UserListItem } from '../../../../types/user.ts';
import { useNavigate } from 'react-router-dom';

interface UserListItemProps {
  user: UserListItem
}

const UserListRow: React.FC<UserListItemProps> = ({ user }) => {
  const navigate = useNavigate();
  const handleRepoList = (username: string) => {
    navigate(`/users/${username}/repos`);
  };
  return (
    <Row key={user.id} className="justify-content-center w-100">
      <Col xs={12} md={8} lg={7} xl={6} xxl={5} className="d-flex align-items-center justify-content-between mb-2">
        <Image src={user.avatar_url} alt={user.login} width="50" height="50" roundedCircle />
        <div className="user-login flex-grow-1 mx-3">{user.login}</div>
        <Button variant="primary" onClick={() => handleRepoList(user.login)}>
          Repositories
        </Button>
      </Col>
    </Row>
  );
};

export default UserListRow;