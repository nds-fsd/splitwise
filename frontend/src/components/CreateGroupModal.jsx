import React, { useState } from 'react';
import '../styles/CreateGroupModal.css';

const CreateGroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([{ name: '', email: '' }]);
  const [groupType, setGroupType] = useState('Casa');

  if (!isOpen) return null;

  const handleAddMember = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const handleRemoveMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      onCreateGroup({ name: groupName, members, groupType });
      onClose();
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>Crear un nuevo grupo</h2>
        </div>
        <div className='modal-body'>
          <label>Mi grupo se llamará...</label>
          <input
            type='text'
            placeholder='Nombre del grupo'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <label>Miembros del grupo</label>
          <p className='helper-text'>
            Consejo: ¿Quieres añadir muchas personas al grupo? Envía un enlace de invitación.
          </p>

          {members.map((member, index) => (
            <div key={index} className='member-row'>
              <input
                type='text'
                placeholder='Nombre'
                value={member.name}
                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              />
              <input
                type='email'
                placeholder='Correo electrónico (opcional)'
                value={member.email}
                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              />
              {index > 0 && (
                <button className='remove-member' onClick={() => handleRemoveMember(index)}>
                  ✖
                </button>
              )}
            </div>
          ))}
          <button className='add-member' onClick={handleAddMember}>
            + Añadir una persona
          </button>

          <label>Tipo de grupo</label>
          <select value={groupType} onChange={(e) => setGroupType(e.target.value)}>
            <option value='Casa'>Casa</option>
            <option value='Viaje'>Viaje</option>
            <option value='Otros'>Otros</option>
          </select>
        </div>

        <div className='modal-footer'>
          <button className='save-button' onClick={handleCreateGroup}>
            Guardar
          </button>
          <button className='cancel-button' onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
