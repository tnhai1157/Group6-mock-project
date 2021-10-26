import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate({
  pageNumber,
  currentPage,
  onSelectPage,
  handlePrev,
  handleNext,
}: any) {
  let items = [];
  for (let number = 1; number <= pageNumber; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onSelectPage(number)}
        activeLabel=""
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination size="sm">
        {currentPage !== 1 && <Pagination.Prev onClick={handlePrev} />}
        {items}
        {currentPage !== pageNumber && <Pagination.Next onClick={handleNext} />}
      </Pagination>
    </div>
  );
}
