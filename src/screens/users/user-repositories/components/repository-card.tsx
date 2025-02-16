import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Repository } from '../../../../types/repository.ts';
import { AiOutlineEye, AiOutlineStar } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';
import { VscCode } from 'react-icons/vsc';
import { GoIssueOpened } from 'react-icons/go';
import StatBadge from '../../../../components/StatBadge.tsx';

interface RepositoryCardProps {
  repo: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  return (
    <Row key={repo.id} className="mb-3">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </Card.Title>
            <Card.Text className="mb-2">{repo.description}</Card.Text>
            <Col className="d-flex justify-content-end gap-1">
              {repo.language && <StatBadge variant="warning" Icon={VscCode} value={repo.language} />}
              <StatBadge variant="primary" Icon={AiOutlineStar} value={repo.stargazers_count} />
              <StatBadge variant="success" Icon={BiGitRepoForked} value={repo.forks_count} />
              <StatBadge variant="info" Icon={AiOutlineEye} value={repo.watchers_count} />
              <StatBadge variant="danger" Icon={GoIssueOpened} value={repo.open_issues_count} />
            </Col>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RepositoryCard;