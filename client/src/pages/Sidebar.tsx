import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md'; // Dashboard icon
import { IoIosPeople } from 'react-icons/io'; // Users icon
import { FaMoneyBillWave } from 'react-icons/fa'; // Loan icon (using a money-related icon)
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px', height: '100vh'}}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a  className="nav-link link-dark d-flex align-items-center" onClick={() => handleNavigation('/dashboard')}>
            <MdDashboard className="me-2" size={40} />
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a  className="nav-link link-dark d-flex align-items-center" onClick={() => handleNavigation('/users')}>
            <IoIosPeople className="me-2" size={40} />
            Users
          </a>
        </li>
        <li className="nav-item">
          <a  className="nav-link link-dark d-flex align-items-center" onClick={() => handleNavigation('/loan')}>
            <FaMoneyBillWave className="me-2" size={40} />
            Loan
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
