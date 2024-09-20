import React, { useState } from 'react';
import { Table, Button } from 'antd';
 
export default function TransactionsTable() {
  const totalTransactions = 30; // Total number of transactions
  const pageSize = 10; // Number of transactions per page
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for the table
  const data = Array.from({ length: totalTransactions }, (_, index) => ({
    key: index + 1,
    transactionId: `T00${index + 1}`,
    amount: `$${(Math.random() * 200).toFixed(2)}`,
    date: `2024-01-${String(index + 1).padStart(2, '0')}`,
  }));

  // Calculate the current page data
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const columns = [
    {
      title: 'ტრანზაქცის ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'რაოდენობა',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'თარიღი',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  // Handle page change
  const handlePageChange = (newPage:number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalTransactions / pageSize);

  return (
    <div className="w-full h-full mt-40 md:ml-0 ml-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-[1.5rem] text-gray-400">ტრანზაქციები</h1>
        
 
        <Table
          dataSource={currentData}
          columns={columns}
          pagination={false}
          locale={{ emptyText: 'ტრანზაქციები არ მოიძებნა' }}  
          className="mt-4"
        />

  
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
          წინა </Button>
          <span>{`გვერდი ${currentPage} -  ${totalPages}`}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            შემდეგი
          </Button>
        </div>
      </div>
    </div>
  );
}