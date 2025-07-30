import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaDollarSign, 
  FaCalendar,
  FaBuilding,
  FaBriefcase,
  FaSave,
  FaArrowLeft
} from 'react-icons/fa';
import './EmployeeForm.css';

const EmployeeForm = ({ employees, onSubmit, isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    salary: '',
    date: '',
    department: '',
    position: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Design',
    'Product'
  ];

  const positions = {
    'Engineering': ['Software Engineer', 'Senior Developer', 'Tech Lead', 'DevOps Engineer'],
    'Marketing': ['Marketing Manager', 'Content Writer', 'SEO Specialist', 'Brand Manager'],
    'Sales': ['Sales Representative', 'Sales Manager', 'Account Executive', 'Business Development'],
    'HR': ['HR Specialist', 'HR Manager', 'Recruiter', 'Training Coordinator'],
    'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller'],
    'Operations': ['Operations Manager', 'Project Manager', 'Business Analyst', 'Process Manager'],
    'Design': ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Creative Director'],
    'Product': ['Product Manager', 'Product Owner', 'Product Analyst', 'Product Director']
  };

  useEffect(() => {
    if (isEditing && id && employees) {
      const employee = employees.find(emp => emp.id === parseInt(id));
      if (employee) {
        setFormData({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          salary: employee.salary.toString(),
          date: employee.date,
          department: employee.department,
          position: employee.position
        });
      }
    }
  }, [isEditing, id, employees]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!formData.date) {
      newErrors.date = 'Hire date is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.position) {
      newErrors.position = 'Position is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const employeeData = {
        ...formData,
        salary: parseFloat(formData.salary)
      };

      if (isEditing) {
        await onSubmit(parseInt(id), employeeData);
      } else {
        await onSubmit(employeeData);
      }

      navigate('/employees');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Reset position when department changes
    if (name === 'department') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        position: ''
      }));
    }
  };

  return (
    <div className="employee-form-container">
      <motion.div 
        className="form-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button 
          className="back-button"
          onClick={() => navigate('/employees')}
        >
          <FaArrowLeft />
          Back to Employees
        </button>
        <h1>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h1>
        <p>{isEditing ? 'Update employee information' : 'Fill in the details to add a new employee'}</p>
      </motion.div>

      <motion.div 
        className="form-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                <FaUser />
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                <FaUser />
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">
                <FaBuilding />
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="position">
                <FaBriefcase />
                Position
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={errors.position ? 'error' : ''}
                disabled={!formData.department}
              >
                <option value="">Select Position</option>
                {formData.department && positions[formData.department]?.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && <span className="error-message">{errors.position}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">
                <FaDollarSign />
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={errors.salary ? 'error' : ''}
                placeholder="Enter salary"
                min="0"
                step="0.01"
              />
              {errors.salary && <span className="error-message">{errors.salary}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">
                <FaCalendar />
                Hire Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FaSave />
                  {isEditing ? 'Update Employee' : 'Add Employee'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EmployeeForm; 