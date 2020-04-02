import React from 'react';
import Layout from '../main/Layout';
import { isAuthenticated } from '../backEnd';

export default function UserBoard() {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  return (
    <Layout
      title="Dashboard"
      description="User Dashboard"
      className="container"
    >
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? 'Admin' : 'Regular User'}
          </li>
        </ul>
      </div>

      <div className="card mb-5">
        <h3 className="card-header">Purcahse history</h3>
        <ul className="list-group">
          <li className="list-group-item">histoy</li>
        </ul>
      </div>
    </Layout>
  );
}
