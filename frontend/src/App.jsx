import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GroupDetailsPage from './pages/GroupDetailsPage';
import CreateGroupModal from './components/CreateGroupModal';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  return (
    <Router>
      <div>
        <button onClick={() => setIsModalOpen(true)} className='create-group-btn'>
        </button>
        <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreateGroup={createGroup} />
        <Routes>
          <Route path='/' element={<Navigate to='/group-details' />} />
          <Route path='/group-details' element={<GroupDetailsPage groups={groups} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
