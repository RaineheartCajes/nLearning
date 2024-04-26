import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Loan = {
  username: string;
  loanAmount: number;
  loanType: string;
  isDocumentAvailable: boolean;
  pdfUrl: string;
};

const PAGE_LIMIT = 5; // Set how many records per page

const LoanTable: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/loans`, {
          params: {
            search: searchTerm,
            limit: PAGE_LIMIT,
            page: currentPage // Assuming the backend is expecting `page` instead of `offset`
          }
        });

        // Update the state with the loans and calculate the total pages
        setLoans(response.data);
        setTotalPages(Math.ceil(response.data.length / PAGE_LIMIT)); // This will only work if the total dataset is returned
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, [searchTerm, currentPage]);

  // Function to change page
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="container mt-5">
      <h1>Loan Lists</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by username or loan type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Loan Amount</th>
            <th>Loan Type</th>
            <th>Document Available</th>
            <th>PDF File</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <td>{loan.username}</td>
              <td>{loan.loanAmount}</td>
              <td>{loan.loanType}</td>
              <td style={{ color: loan.isDocumentAvailable ? 'green' : 'red', fontWeight: 'bold' }}>{loan.isDocumentAvailable ? 'Yes' : 'No'}</td>
              <td>
                {loan.isDocumentAvailable && loan.pdfUrl && (
                  <a href={`http://localhost:5173/uploads/${loan.pdfUrl}`} download>
                  Download PDF
                </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default LoanTable;