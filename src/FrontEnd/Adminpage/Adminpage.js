import React, { useState } from 'react';
import AddProperty from './AddProperty';
import ViewProperty from './ViewProperty';
import './Adminpage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('add'); // Default to Add Property tab

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <div className="admin-nav">
        <button onClick={() => setActiveTab('add')}>Add Property</button>
        <button onClick={() => setActiveTab('view')}>View Properties</button>
      </div>

      <div className="content-section">
        {activeTab === 'add' && <AddProperty />}
        {activeTab === 'view' && <ViewProperty />}
      </div>
    </div>
  );
};

export default AdminPage;