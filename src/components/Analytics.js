import React from 'react';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
  FaUsers, 
  FaDollarSign, 
  FaChartLine, 
  FaBuilding,
  FaCalendar,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Analytics = ({ employees }) => {
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  // Department distribution
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  // Salary distribution by department
  const salaryByDepartment = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { total: 0, count: 0 };
    }
    acc[emp.department].total += emp.salary;
    acc[emp.department].count += 1;
    return acc;
  }, {});

  // Monthly hiring trend (last 12 months)
  const monthlyHires = {};
  const currentDate = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    monthlyHires[monthKey] = 0;
  }

  employees.forEach(emp => {
    const hireDate = new Date(emp.date);
    const monthKey = hireDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (monthlyHires[monthKey] !== undefined) {
      monthlyHires[monthKey]++;
    }
  });

  // Chart configurations
  const departmentChartData = {
    labels: Object.keys(departmentStats),
    datasets: [
      {
        data: Object.values(departmentStats),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#f5576c',
          '#4facfe',
          '#00f2fe',
          '#43e97b',
          '#38f9d7'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const salaryChartData = {
    labels: Object.keys(salaryByDepartment),
    datasets: [
      {
        label: 'Average Salary',
        data: Object.values(salaryByDepartment).map(dept => Math.round(dept.total / dept.count)),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const hiringTrendData = {
    labels: Object.keys(monthlyHires),
    datasets: [
      {
        label: 'New Hires',
        data: Object.values(monthlyHires),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    }
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  // Top performing departments
  const topDepartments = Object.entries(salaryByDepartment)
    .map(([dept, data]) => ({
      department: dept,
      avgSalary: Math.round(data.total / data.count),
      employeeCount: data.count
    }))
    .sort((a, b) => b.avgSalary - a.avgSalary)
    .slice(0, 3);

  return (
    <div className="analytics">
      <motion.div 
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Analytics Dashboard</h1>
        <p>Comprehensive insights into your employee data</p>
      </motion.div>

      <div className="analytics-grid">
        <motion.div 
          className="chart-card department-distribution"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="chart-header">
            <h3>Department Distribution</h3>
            <p>Employee count by department</p>
          </div>
          <div className="chart-container">
            <Doughnut data={departmentChartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div 
          className="chart-card salary-analysis"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="chart-header">
            <h3>Average Salary by Department</h3>
            <p>Salary distribution across departments</p>
          </div>
          <div className="chart-container">
            <Bar data={salaryChartData} options={barChartOptions} />
          </div>
        </motion.div>

        <motion.div 
          className="chart-card hiring-trend"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="chart-header">
            <h3>Hiring Trend</h3>
            <p>New hires over the last 12 months</p>
          </div>
          <div className="chart-container">
            <Line data={hiringTrendData} options={lineChartOptions} />
          </div>
        </motion.div>

        <motion.div 
          className="chart-card top-departments"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="chart-header">
            <h3>Top Performing Departments</h3>
            <p>Departments with highest average salaries</p>
          </div>
          <div className="departments-list">
            {topDepartments.map((dept, index) => (
              <motion.div
                key={dept.department}
                className="department-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
              >
                <div className="rank-badge">{index + 1}</div>
                <div className="department-info">
                  <h4>{dept.department}</h4>
                  <p>{dept.employeeCount} employees</p>
                </div>
                <div className="salary-info">
                  <span className="salary">${dept.avgSalary.toLocaleString()}</span>
                  <span className="label">avg salary</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="key-metrics"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h2>Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">
              <FaUsers />
            </div>
            <div className="metric-content">
              <h3>Total Employees</h3>
              <p className="metric-value">{totalEmployees}</p>
              <span className="metric-change positive">
                <FaArrowUp />
                +12% from last month
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaDollarSign />
            </div>
            <div className="metric-content">
              <h3>Total Salary</h3>
              <p className="metric-value">${totalSalary.toLocaleString()}</p>
              <span className="metric-change positive">
                <FaArrowUp />
                +8% from last month
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaChartLine />
            </div>
            <div className="metric-content">
              <h3>Average Salary</h3>
              <p className="metric-value">${avgSalary.toLocaleString()}</p>
              <span className="metric-change positive">
                <FaArrowUp />
                +5% from last month
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <FaBuilding />
            </div>
            <div className="metric-content">
              <h3>Departments</h3>
              <p className="metric-value">{Object.keys(departmentStats).length}</p>
              <span className="metric-change neutral">
                <FaArrowUp />
                No change
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics; 