import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Loan: React.FC<{ userId: string }> = ({ userId }) => {
  const [loanId, setLoanId] = useState<string | null>(null);
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [isDocumentAvailable, setIsDocumentAvailable] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const username = useSelector((state: RootState) => state.session.username);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/loans/user/${userId}`);
        if (response.data.length > 0) {
          const loan = response.data[0];
          setLoanId(loan._id);
          setLoanType(loan.loanType);
          setLoanAmount(loan.loanAmount.toString());
          setIsDocumentAvailable(loan.isDocumentAvailable);
         
        }
      } catch (error) {
        console.error('Failed to fetch loan details:', error);
      }
    };

    fetchLoan();
  }, [userId]);

  const handleLoanTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanType(event.target.value);
  };

  const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(event.target.value);
  };

  const handleDocumentAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDocumentAvailable(event.target.checked);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].type === 'application/pdf') {
      setFile(event.target.files[0]);
    } else {
      alert("Only PDF documents are allowed.");
      event.target.value = ""; 
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    

    if (!username) {
      alert('Username is not set. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('username', username);
    formData.append('loanType', loanType);
    formData.append('loanAmount', loanAmount);
    formData.append('isDocumentAvailable', String(isDocumentAvailable));
    if (file) {
      formData.append('pdf', file);
      }
    

    try {
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3000/loans/${loanId}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Loan details updated successfully!');
      console.log(response.data);
      // You might want to redirect or close the modal here
    } catch (error) {
      console.error('Failed to save loan details:', error);
      alert('Failed to save loan details. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>{loanId ? 'Edit Loan' : 'Add Loan'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loanType" className="form-label">Loan Type</label>
          <select id="loanType" className="form-select" value={loanType} onChange={handleLoanTypeChange}>
            <option value="">Select Loan Type</option>
            <option value="business">Business Loan</option>
            <option value="personal">Personal Loan</option>
            <option value="home">Home Loan</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
          <input type="number" id="loanAmount" className="form-control" value={loanAmount} onChange={handleLoanAmountChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" id="documentAvailable" className="form-check-input" checked={isDocumentAvailable} onChange={handleDocumentAvailableChange} />
          <label className="form-check-label" htmlFor="documentAvailable">Is document available?</label>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload Document (PDF only)</label>
          <input type="file" id="file" className="form-control" onChange={handleFileChange} accept=".pdf" />
        </div>
        <button type="submit" className="btn btn-primary">{loanId ? 'Update Loan' : 'Add Loan'}</button>
      </form>
    </div>
  );
};

export default Loan;
