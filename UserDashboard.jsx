

// export default UserDashboard;
import React, { useState } from 'react';
import '../styles/UserDashboard.css' // optional: for better styling separation

const UserDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    loanAmount: '',
    loanReason: '',
    employmentDetails: '',
    declaration: false,
    employmentAddress: '',
    accountAddress: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock API call – add loan data to the list
    const newLoan = {
      id: Date.now(),
      loanOfficer: 'John Clark',
      amount: formData.loanAmount,
      dateApplied: new Date().toLocaleDateString('en-US'),
      status: 'Pending',
    };

    setLoans([...loans, newLoan]);
    setShowForm(false);
    setFormData({
      fullName: '',
      loanAmount: '',
      loanReason: '',
      employmentDetails: '',
      declaration: false,
      employmentAddress: '',
      accountAddress: '',
    });
  };

  const filteredLoans = loans.filter((loan) =>
    loan.loanOfficer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="balance-card">
          <div>
            <h4>Credit</h4>
            <h2>₹ 0.0</h2>
          </div>
          <button onClick={() => setShowForm(true)}>Get a Loan</button>
        </div>

        <div className="tabs">
          <button>Borrow Cash</button>
          <button>Transact</button>
          <button>Deposit Cash</button>
        </div>

        <input
          type="text"
          placeholder="Search for loans"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="loan-table">
        <h3>Applied Loans</h3>
        <table>
          <thead>
            <tr>
              <th>Loan Officer</th>
              <th>Amount</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.loanOfficer}</td>
                <td>₹ {loan.amount}</td>
                <td>{loan.dateApplied}</td>
                <td>
                  <span className="status-pill">{loan.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="loan-form-modal">
          <form className="loan-form" onSubmit={handleSubmit}>
            <h2>Apply for a Loan</h2>
            <div className="form-grid">
            <div style={{display:'flex', flexDirection:"row", justifyContent:"space-around",width:600}}>
           <div style={{marginRight:80}}>
           <label>Full name as in bank account</label>
            <br/>
              <input
                name="fullName"
                placeholder="Full name as in bank account"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
           </div>
              <div style={{width:"50%"}}>
              <label>How much do you need?</label>
              <br/>
              <input
                name="loanAmount"
                placeholder="How much do you need?"
                value={formData.loanAmount}
                onChange={handleChange}
                required
              />
              </div>
            </div>
            <br/>
              <div style={{display:'flex', flexDirection:"row", justifyContent:"space-around",width:600}}>
              <div style={{marginRight:80}}>
              <label>Reason for loan</label>
              <input
                name="loanReason"
                placeholder="Reason for loan"
                value={formData.loanReason}
                onChange={handleChange}
                required
              />
              </div>
              <div style={{marginRight:80}}>
              <label>Employment details</label>
              <input
                name="employmentDetails"
                placeholder="Employment details"
                value={formData.employmentDetails}
                onChange={handleChange}
                required
              />
              </div>
              </div>
              <br/>
              <div style={{display:'flex', flexDirection:"row", justifyContent:"space-around",width:600}}>
              <div style={{marginRight:80}}>
              <label>Employment address</label>
              <input
                name="employmentAddress"
                placeholder="Employment address"
                value={formData.employmentAddress}
                onChange={handleChange}
                required
              />
              </div>
              <div style={{marginRight:80}}>
                <label>Account address</label>
              <input
                name="accountAddress"
                placeholder="Account address"
                value={formData.accountAddress}
                onChange={handleChange}
                required
              />
              </div>
            </div>
            <br/>
              </div>
            <div className="declaration">
              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
                required
              />
              <label>Any personal and credit information obtained may be disclosed  from time to time to other lenders,credit bureaus or other credit report agencies.</label>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

