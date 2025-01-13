import React, { useState } from "react";
import Header from "../components/Header";
import MemberList from "../components/MemberList";
import ExpenseList from "../components/ExpenseList";
import AddExpenseButton from "../components/AddExpenseButton";
import "../styles/GroupDetailsPage.css";

const GroupDetailsPage = () => {
  const groups = ["Viaje Cancún", "Casa de verano", "Cumpleaños Paquito"];
  const [showForm, setShowForm] = useState(false);

  
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("Casa");
  const [members, setMembers] = useState([{ name: "", email: "" }]);

  
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  
  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  
  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      groupName,
      groupType,
      members,
    });
    alert("Grupo creado con éxito");
    setShowForm(false);
    setGroupName("");
    setGroupType("Casa");
    setMembers([{ name: "", email: "" }]);
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>DiveUp</h1>
        <nav className="nav-links">
          <button>Amigos</button>
          <button className="active">Grupos</button>
          <button>Gastos</button>
        </nav>
        <button className="user-btn">User</button>
      </header>
      <div className="content-container">
        <div className="card">
          <h2>Miembros del Grupo</h2>
          <ul>
            <li>
              Maria: <strong>$100</strong>
            </li>
            <li>
              Patricio: <strong>-$50</strong>
            </li>
            <li>
              Paquito: <strong>$0</strong>
            </li>
            <li>
              Angel: <strong>$20</strong>
            </li>
          </ul>
        </div>
        <div className="card">
          <h2>Gastos</h2>
          <ul>
            <li>
              Cena: <strong>$120</strong>
            </li>
            <li>
              Taxi: <strong>$30</strong>
            </li>
          </ul>
        </div>
        <div className="card groups-card">
          <h2>Grupos Creados</h2>
          <ul>
            {groups.map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>
          <button className="add-group-btn" onClick={toggleForm}>
            {showForm ? "Cerrar" : "+ Crear Grupo"}
          </button>
          {showForm && (
            <div className="form-container">
              <h3>Crear un nuevo grupo</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Mi grupo se llamará...
                  <input
                    type="text"
                    placeholder="Nombre del grupo"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Tipo de grupo:
                  <select
                    value={groupType}
                    onChange={(e) => setGroupType(e.target.value)}
                  >
                    <option>Casa</option>
                    <option>Viaje</option>
                    <option>Otro</option>
                  </select>
                </label>
                <h4>Miembros del grupo</h4>
                {members.map((member, index) => (
                  <div key={index} className="member-input">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico (opcional)"
                      value={member.email}
                      onChange={(e) =>
                        handleMemberChange(index, "email", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddMember}>
                  + Añadir una persona
                </button>
                <div className="form-buttons">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={toggleForm}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <button className="floating-btn">+</button>
    </div>
  );
};

export default GroupDetailsPage;
