import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaPlus,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaUsers
} from 'react-icons/fa';
import './EmployeeList.css';

const EmployeeList = ({ 
  employees, 
  onDelete, 
  searchTerm, 
  setSearchTerm, 
  filterDepartment, 
  setFilterDepartment, 
  sortBy, 
  setSortBy 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const departments = ['All', ...new Set(employees.map(emp => emp.department))];

  const handleDelete = (employee) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {}
        },
        {
          label: 'Delete',
          onClick: () => onDelete(employee.id),
          className: 'btn-danger'
        }
      ]
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#28a745';
      case 'Inactive':
        return '#dc3545';
      case 'On Leave':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Employee Management</h1>
          <p>Manage and view all employees in your organization</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/add-employee" className="add-employee-btn">
            <FaPlus />
            Add Employee
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="search-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            Filters
          </button>
        </div>
      </motion.div>

      {showFilters && (
        <motion.div 
          className="advanced-filters"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="filter-row">
            <div className="filter-group">
              <label>Department</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="filter-select"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name</option>
                <option value="salary">Salary</option>
                <option value="date">Date</option>
                <option value="department">Department</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div 
        className="results-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p>Showing {employees.length} employee{employees.length !== 1 ? 's' : ''}</p>
      </motion.div>

      <motion.div 
        className="table-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  className="employee-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ backgroundColor: '#f8f9fa' }}
                >
                  <td className="employee-info-cell">
                    <div className="employee-basic-info">
                      <img 
                        src={employee.avatar} 
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="employee-avatar"
                      />
                      <div className="employee-details">
                        <h4>{employee.firstName} {employee.lastName}</h4>
                        <p className="employee-id">ID: {employee.id}</p>
                        <p className="hire-date">
                          <FaCalendar /> {new Date(employee.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="position-cell">
                    <span className="position">{employee.position}</span>
                  </td>
                  
                  <td className="department-cell">
                    <div className="department-info">
                      <FaBuilding className="department-icon" />
                      <span>{employee.department}</span>
                    </div>
                  </td>
                  
                  <td className="contact-cell">
                    <div className="contact-info">
                      <div className="contact-item">
                        <FaEnvelope />
                        <span>{employee.email}</span>
                      </div>
                      <div className="contact-item">
                        <FaPhone />
                        <span>{employee.phone}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="salary-cell">
                    <span className="salary">${employee.salary.toLocaleString()}</span>
                  </td>
                  
                  <td className="status-cell">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(employee.status) }}
                    >
                      {employee.status}
                    </span>
                  </td>
                  
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <Link 
                        to={`/edit-employee/${employee.id}`}
                        className="action-btn edit"
                        title="Edit Employee"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(employee)}
                        title="Delete Employee"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {employees.length === 0 && (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="empty-icon">
            <FaUsers />
          </div>
          <h3>No employees found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <Link to="/add-employee" className="add-first-employee-btn">
            <FaPlus />
            Add Your First Employee
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default EmployeeList; 