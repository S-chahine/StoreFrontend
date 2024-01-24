import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { updateEmail, updatePassword, updateUserInfo } from './loginActions';
import { logout } from './loginActions';
import Navbar from '../Navbar/Navbar';


const Dashboard = () => {
  const user_info = useSelector((state) => state.login.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [firstName, setFirstName] = useState(user_info ? user_info.firstname : '');
  const [lastName, setLastName] = useState(user_info ? user_info.lastname : '');
  const [updateStatus, setUpdateStatus] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateEmailError = useSelector((state) => state.login.updateEmailError);
  const updatePasswordError = useSelector((state) => state.login.updatePasswordError);

  const handleViewOrders = (e) => {
    e.preventDefault();
    navigate(`/orders/${user_info.user_id}`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updatedFields = {};
      if (firstName !== user_info.firstname) {
        updatedFields.firstname = firstName;
      }
      if (lastName !== user_info.lastname) {
        updatedFields.lastname = lastName;
      }
      if (showEmailChange) {
        const response = await dispatch(updateEmail(user_info.user_id, password, email));
        if (response && response.error) {
          // Handle the error response
          setUpdateStatus('error');
          setUpdateError(response.error);
          return;
        }
        setPassword('');
        setShowEmailChange(false);
        dispatch(updateUserInfo({ ...user_info, email }));


      }
      if (showPasswordChange && newPassword === confirmPassword) {
        const response = await dispatch(updatePassword(user_info.user_id, password, newPassword));
        if (response && response.error) {
          // Handle the error response
          setUpdateStatus('error');
          setUpdateError(response.error);
          return;
        }
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordChange(false);

      }

      if (Object.keys(updatedFields).length > 0) {
        // Perform update action for first name and last name
        updatedFields.firstname = updatedFields.firstname || user_info.firstname;
        updatedFields.lastname = updatedFields.lastname || user_info.lastname;

        await axios.put(`https://storebackend-etw3.onrender.com/api/update?userId=${user_info.user_id}`, updatedFields);
        dispatch(updateUserInfo(updatedFields));
      }
      setUpdateStatus('success');
      setUpdateError(null);

      navigate('/dashboard');

    } catch (error) {
      console.error('Error updating user information:', error);
      setUpdateStatus('error');
      setUpdateError('An error occurred while updating the user information.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user_info) {
    return <div>Loading...</div>;
  }

  if (!user_info) {
    return <div>Loading...</div>;
  }
  return (
    <div className="dashboard">
      <h2>Welcome, {user_info.firstname}!</h2>
      {updateStatus === 'success' && <p className="success-message">User information updated successfully.</p>}
      {updateStatus === 'error' && <p className="error-message">{updateError}</p>}
      {updateEmailError && <p className="error-message">{updateEmailError}</p>}
      {updatePasswordError && <p className="error-message">{updatePasswordError}</p>}
      <h3>Account Information</h3>
      <form>
        <div className="form-row">
          <section className="left-section">
            <p>
              <strong>First Name:</strong> <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </p>
            <p>
              <strong>Last Name:</strong> <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </p>
            <p>
              <input type="checkbox" id="emailChange" checked={showEmailChange} onChange={() => setShowEmailChange(!showEmailChange)} />
              <label htmlFor="emailChange">Change Email</label>
            </p>
            {showEmailChange && (
              <>
                <p>{user_info.email}</p>
                <p>
                  <strong>New Email:</strong> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                  <strong>Current Password:</strong> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </p>
              </>
            )}
          </section>
          <section className="right-section">

            <p>
              <input type="checkbox" id="passwordChange" checked={showPasswordChange} onChange={() => setShowPasswordChange(!showPasswordChange)} />
              <label htmlFor="passwordChange">Change Password</label>
            </p>
            {showPasswordChange && (
              <>
                <p>
                  <strong>Current Password:</strong> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                  <strong>New Password:</strong> <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </p>
                <p>
                  <strong>Confirm Password:</strong> <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </p>
              </>
            )}
          </section>
        </div>
        <div className="dashboard-buttons">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleViewOrders}>View Orders</button>
        </div>
      </form>
    </div>


  );
};

export default Dashboard;
