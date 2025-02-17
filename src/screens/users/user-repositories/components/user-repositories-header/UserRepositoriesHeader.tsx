import { Col, Row } from 'react-bootstrap';
import { UserDetails } from '../../../../../types/user.ts';
import { VscRepo } from 'react-icons/vsc';
import { RiUserAddLine, RiUserFollowLine } from 'react-icons/ri';
import StatBadge from '../../../../../components/StatBadge.tsx';
import { FC } from 'react';

interface UserRepositoriesHeaderProps {
  user: UserDetails | undefined;
}

const UserRepositoriesHeader: FC<UserRepositoriesHeaderProps> = ({ user }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h2 className="mb-0">{user?.login} ({user?.name})</h2>
      <Row className="mt-4 mb-4">
        <Col className="d-flex justify-content-around gap-1">
          <StatBadge variant="primary" Icon={VscRepo} value={user?.public_repos} />
          <StatBadge variant="success" Icon={RiUserFollowLine} value={user?.followers} />
          <StatBadge variant="secondary" Icon={RiUserAddLine} value={user?.following} />
        </Col>
      </Row>
    </div>
  );
};

export default UserRepositoriesHeader;