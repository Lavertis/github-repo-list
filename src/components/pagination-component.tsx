import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onPageChange }) => {
  const itemCount = 7;
  const halfItemCount = Math.floor(itemCount / 2);

  let startPage = Math.max(1, currentPage - halfItemCount);
  let endPage = Math.min(totalPages, currentPage + halfItemCount);

  if (currentPage <= halfItemCount) {
    endPage = Math.min(totalPages, itemCount);
  } else if (currentPage + halfItemCount >= totalPages) {
    startPage = Math.max(1, totalPages - itemCount + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {pages.map(pageNumber => (
        <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => onPageChange(pageNumber)}>
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)}
                       disabled={currentPage === totalPages || totalPages === 0} />
      <Pagination.Last onClick={() => onPageChange(totalPages)}
                       disabled={currentPage === totalPages || totalPages === 0} />
    </Pagination>
  );
};

export default PaginationComponent;