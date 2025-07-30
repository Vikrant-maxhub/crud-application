import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaDollarSign, 
  FaChartLine, 
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBuilding,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ employees }) => {
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;
  
  const departments = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const recentEmployees = employees
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const statsCards = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: FaUsers,
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)'
    },
    {
      title: 'Total Salary',
      value: `$${totalSalary.toLocaleString()}`,
      icon: FaDollarSign,
      color: '#28a745',
      bgColor: 'rgba(40, 167, 69, 0.1)'
    },
    {
      title: 'Average Salary',
      value: `$${avgSalary.toLocaleString()}`,
      icon: FaChartLine,
      color: '#ffc107',
      bgColor: 'rgba(255, 193, 7, 0.1)'
    },
    {
      title: 'Departments',
      value: Object.keys(departments).length,
      icon: FaBuilding,
      color: '#dc3545',
      bgColor: 'rgba(220, 53, 69, 0.1)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dashboard Overview
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome to your Employee Management System dashboard
        </motion.p>
      </div>

      <motion.div 
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="stat-card"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div 
              className="stat-icon"
              style={{ backgroundColor: card.bgColor, color: card.color }}
            >
              <card.icon />
            </div>
            <div className="stat-content">
              <h3>{card.title}</h3>
              <p className="stat-value">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="dashboard-content">
        <div className="dashboard-row">
          <motion.div 
            className="recent-employees"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <h2>Recent Employees</h2>
              <Link to="/employees" className="view-all-link">
                View All
              </Link>
            </div>
            <div className="employees-list">
              {recentEmployees.map((employee) => (
                <motion.div
                  key={employee.id}
                  className="employee-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={employee.avatar} 
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="employee-avatar"
                  />
                  <div className="employee-info">
                    <h4>{employee.firstName} {employee.lastName}</h4>
                    <p className="employee-position">{employee.position}</p>
                    <p className="employee-department">{employee.department}</p>
                    <div className="employee-contact">
                      <span className="contact-item">
                        <FaEnvelope /> {employee.email}
                      </span>
                      <span className="contact-item">
                        <FaPhone /> {employee.phone}
                      </span>
                    </div>
                  </div>
                  <div className="employee-salary">
                    ${employee.salary.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="quick-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/add-employee" className="action-card">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="action-icon add"
                >
                  <FaPlus />
                </motion.div>
                <h3>Add Employee</h3>
                <p>Add a new employee to the system</p>
              </Link>

              <Link to="/employees" className="action-card">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="action-icon view"
                >
                  <FaEye />
                </motion.div>
                <h3>View Employees</h3>
                <p>Browse and manage all employees</p>
              </Link>

              <Link to="/analytics" className="action-card">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="action-icon analytics"
                >
                  <FaChartLine />
                </motion.div>
                <h3>Analytics</h3>
                <p>View detailed analytics and reports</p>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="department-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2>Department Distribution</h2>
          <div className="departments-grid">
            {Object.entries(departments).map(([dept, count]) => (
              <motion.div
                key={dept}
                className="department-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="department-icon">
                  <FaBuilding />
                </div>
                <div className="department-info">
                  <h3>{dept}</h3>
                  <p>{count} employees</p>
                </div>
                <div className="department-percentage">
                  {Math.round((count / totalEmployees) * 100)}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 