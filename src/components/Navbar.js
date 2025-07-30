import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUsers, 
  FaPlus, 
  FaChartBar, 
  FaSignOutAlt, 
  FaUser,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ currentUser, onLogout, employeeCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FaHome },
    { path: '/employees', label: 'Employees', icon: FaUsers },
    { path: '/add-employee', label: 'Add Employee', icon: FaPlus },
    { path: '/analytics', label: 'Analytics', icon: FaChartBar }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <motion.div 
              className="brand-logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUsers />
            </motion.div>
            <span className="brand-text">EMS Pro</span>
          </Link>
        </div>

        <div className="navbar-nav desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-item"
              >
                <item.icon className="nav-icon" />
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="employee-count">
            <FaUsers className="count-icon" />
            <span>{employeeCount} Employees</span>
          </div>

          <div className="user-profile">
            <motion.button
              className="profile-button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=8'} 
                alt="Profile" 
                className="profile-avatar"
              />
              <span className="profile-name">{currentUser?.name}</span>
            </motion.button>

            {isProfileDropdownOpen && (
              <motion.div
                className="profile-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-header">
                  <img 
                    src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=8'} 
                    alt="Profile" 
                    className="dropdown-avatar"
                  />
                  <div className="dropdown-user-info">
                    <span className="dropdown-name">{currentUser?.name}</span>
                    <span className="dropdown-role">{currentUser?.role}</span>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="mobile-nav-icon" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="mobile-divider"></div>
          <button className="mobile-logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 