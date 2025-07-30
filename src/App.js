import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Analytics from './components/Analytics';
import Login from './components/Login';

function App() {
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      firstName: 'Susan', 
      lastName: 'Jordon', 
      email: 'susan@example.com', 
      salary: 95000, 
      date: '2019-04-11',
      department: 'Engineering',
      position: 'Senior Developer',
      phone: '+1-555-0123',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    { 
      id: 2, 
      firstName: 'Adrienne', 
      lastName: 'Doak', 
      email: 'adrienne@example.com', 
      salary: 80000, 
      date: '2019-04-17',
      department: 'Marketing',
      position: 'Marketing Manager',
      phone: '+1-555-0124',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    { 
      id: 3, 
      firstName: 'John', 
      lastName: 'Smith', 
      email: 'john@example.com', 
      salary: 75000, 
      date: '2019-05-01',
      department: 'Sales',
      position: 'Sales Representative',
      phone: '+1-555-0125',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    { 
      id: 4, 
      firstName: 'Emily', 
      lastName: 'Johnson', 
      email: 'emily@example.com', 
      salary: 85000, 
      date: '2019-06-15',
      department: 'HR',
      position: 'HR Specialist',
      phone: '+1-555-0126',
      status: 'Active',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Save employees to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    toast.success('Welcome back! 🎉');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast.info('Logged out successfully');
  };

  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1,
      status: 'Active',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    };
    setEmployees([...employees, newEmployee]);
    toast.success('Employee added successfully! 🎉');
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, ...updatedData } : emp
    ));
    toast.success('Employee updated successfully! ✨');
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee deleted successfully! 🗑️');
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'All' || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.firstName + ' ' + a.lastName).localeCompare(b.firstName + ' ' + b.lastName);
      case 'salary':
        return b.salary - a.salary;
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'department':
        return a.department.localeCompare(b.department);
      default:
        return 0;
    }
  });

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar 
          currentUser={currentUser} 
          onLogout={handleLogout}
          employeeCount={employees.length}
        />
        
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard employees={employees} />} 
            />
            <Route 
              path="/employees" 
              element={
                <EmployeeList 
                  employees={sortedEmployees}
                  onDelete={deleteEmployee}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterDepartment={filterDepartment}
                  setFilterDepartment={setFilterDepartment}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              } 
            />
            <Route 
              path="/add-employee" 
              element={<EmployeeForm onSubmit={addEmployee} />} 
            />
            <Route 
              path="/edit-employee/:id" 
              element={
                <EmployeeForm 
                  employees={employees}
                  onSubmit={updateEmployee}
                  isEditing={true}
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={<Analytics employees={employees} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App; 