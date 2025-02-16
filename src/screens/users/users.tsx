import {useEffect, useState} from 'react';
import {Alert, Container, Row, Col, Button, Pagination, Image} from 'react-bootstrap';
import axiosInstance from "../../api/axiosInstance.ts";
import {useNavigate} from 'react-router-dom';
import {UserListItem, UserListResponse} from "../../types/user.ts";

const Users = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState<UserListItem[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get<UserListResponse>(`search/users?q=john&per_page=${pageSize}&page=${currentPage}`)
            .then((response) => {
                setUsers(response.data.items);
                setTotalCount(response.data.total_count);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [currentPage]);

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

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <Container>
            <Container className="d-flex flex-column align-items-center">
                {users.map(user => (
                    <Row key={user.id} className="justify-content-center w-100">
                        <Col xs={12} md={8} lg={6} xl={5} className="d-flex align-items-center justify-content-between mb-2">
                            <Image src={user.avatar_url} alt={user.login} width="50" height="50" roundedCircle />
                            <div className="flex-grow-1 ms-3">{user.login}</div>
                            <Button variant="primary" onClick={() => handleRepoList(user.login)}>
                                Repositories
                            </Button>
                        </Col>
                    </Row>
                ))}
            </Container>
            <Col className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        if (pageNumber >= currentPage - 3 && pageNumber <= currentPage + 3) {
                            return (
                                <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
                                    {pageNumber}
                                </Pagination.Item>
                            );
                        }
                        return null;
                    })}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </Col>
        </Container>
    );
};


export default Users;