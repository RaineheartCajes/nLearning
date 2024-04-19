import React, { useState, useEffect } from 'react';

const Loan: React.FC = () => {
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [isDocumentAvailable, setIsDocumentAvailable] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [userLoan, setUserLoan] = useState<any | null>(null);

  useEffect(() => {
    const currentUsername = localStorage.getItem('currentUsername');
    if (currentUsername) {
      const loansData = localStorage.getItem(`${currentUsername}_loans`);
      if (loansData) {
        const userLoans = JSON.parse(loansData);
        if (userLoans.length > 0) {
          // Assuming you want to display the most recent loan
          const latestLoan = userLoans[userLoans.length - 1];
          setUserLoan(latestLoan);
          setLoanType(latestLoan.loanType);
          setLoanAmount(latestLoan.loanAmount);
          setIsDocumentAvailable(latestLoan.isDocumentAvailable);
          // If there's a file associated with the loan, you can set it as well
          if (latestLoan.fileName) {
            setFile(new File([latestLoan.fileName], latestLoan.fileName));
          }
        }
      }
    }
  }, []);

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
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const currentUsername = localStorage.getItem('currentUsername');
    if (!currentUsername) {
      alert('No user is currently logged in.');
      return;
    }
  
    const newLoanDetails = {
      loanType,
      loanAmount,
      isDocumentAvailable,
      fileName: file ? file.name : null
    };
  
    const userLoans = JSON.parse(localStorage.getItem(`${currentUsername}_loans`) || '[]');
    const updatedUserLoans = [...userLoans, newLoanDetails];
    
    localStorage.setItem(`${currentUsername}_loans`, JSON.stringify(updatedUserLoans));
  
    // You may choose to update the state to reflect the changes, or leave it as is.
    // setUserLoans(updatedUserLoans);
  
    // Reset the form fields
    setLoanType('');
    setLoanAmount('');
    setIsDocumentAvailable(false);
    setFile(null);
    
    alert('Loan details saved successfully!');
  };

  return (
    <div className="container mt-5">
      <h1>Loans</h1>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {userLoan && (
        <div>
          <h2>My Loan Details</h2>
          <p>Loan Type: {userLoan.loanType}</p>
          <p>Loan Amount: {userLoan.loanAmount}</p>
          <p>Document Available: {userLoan.isDocumentAvailable ? 'Yes' : 'No'}</p>
          {userLoan.fileName && <p>File Name: {userLoan.fileName}</p>}
        </div>
      )}
    </div>
  );
};

export default Loan;
