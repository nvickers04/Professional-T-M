import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Overview from './Overview';
import EmployeeTimeEntry from './Employeetimeentry';
import EquipmentEntry from './Equipmententry';
import MaterialsEntry from './Materialsentry';
import Timesheets from './Timesheets';
import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const accountType = location.state?.accountType || 'Unknown';
  const [activeTab, setActiveTab] = useState('overview');

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Office Renovation', number: 'J001', location: '123 Main St', status: 'Active', lastUpdated: '2025-03-18', clientName: 'ABC Corp', startDate: '2025-03-10', estimatedHours: 40 },
    { id: 2, title: 'HVAC Install', number: 'J002', location: '456 Oak Ave', status: 'Completed', lastUpdated: '2025-03-15', clientName: 'XYZ Inc', startDate: '2025-03-01', estimatedHours: 25 },
    { id: 3, title: 'Roof Repair', number: 'J003', location: '789 Pine Rd', status: 'Active', lastUpdated: '2025-03-19', clientName: 'Home LLC', startDate: '2025-03-15', estimatedHours: 15 },
  ]);

  const [timesheets, setTimesheets] = useState([
    { id: 1, jobId: 1, employeeName: 'John Doe', date: '2025-03-17', hoursWorked: 8, taskDescription: 'Drywall installation', approvalStatus: 'Pending' },
    { id: 2, jobId: 1, employeeName: 'Jane Smith', date: '2025-03-18', hoursWorked: 6, taskDescription: 'Painting', approvalStatus: 'Approved' },
    { id: 3, jobId: 2, employeeName: 'John Doe', date: '2025-03-14', hoursWorked: 5, taskDescription: 'HVAC setup', approvalStatus: 'Approved' },
  ]);

  const [equipment, setEquipment] = useState([
    { id: 1, jobId: 1, name: 'Backhoe', rate: 50, usageHours: 10 },
    { id: 2, jobId: 2, name: 'Compressor', rate: 30, usageHours: 8 },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, jobId: 1, name: 'Drywall', quantity: 10, unitPrice: 20 },
    { id: 2, jobId: 1, name: 'Paint', quantity: 5, unitPrice: 15 },
  ]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Professional T&M</h1>
        <div className="user-icon">👤</div>
      </header>
      <nav className="dashboard-nav">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          OVERVIEW
        </button>
        <button
          className={activeTab === 'employeeTimeEntry' ? 'active' : ''}
          onClick={() => setActiveTab('employeeTimeEntry')}
        >
          EMPLOYEE TIME ENTRY
        </button>
        <button
          className={activeTab === 'equipmentEntry' ? 'active' : ''}
          onClick={() => setActiveTab('equipmentEntry')}
        >
          EQUIPMENT ENTRY
        </button>
        <button
          className={activeTab === 'materialsEntry' ? 'active' : ''}
          onClick={() => setActiveTab('materialsEntry')}
        >
          MATERIALS ENTRY
        </button>
        <button
          className={activeTab === 'timeSheets' ? 'active' : ''}
          onClick={() => setActiveTab('timeSheets')}
        >
          TIME SHEETS
        </button>
      </nav>
      <div className="dashboard-content">
        <h2>{accountType} Dashboard</h2>
        <p>Welcome to your T&M Dashboard, {accountType} user!</p>
        <div className="tab-content">
          {activeTab === 'overview' && (
            <Overview
              jobs={jobs}
              setJobs={setJobs} // Pass setJobs
              timesheets={timesheets}
              equipment={equipment}
              materials={materials}
            />
          )}
          {activeTab === 'employeeTimeEntry' && (
            <EmployeeTimeEntry
              jobs={jobs}
              timesheets={timesheets}
              setTimesheets={setTimesheets}
              accountType={accountType}
            />
          )}
          {activeTab === 'equipmentEntry' && (
            <EquipmentEntry
              jobs={jobs}
              equipment={equipment}
              setEquipment={setEquipment}
              accountType={accountType}
            />
          )}
          {activeTab === 'materialsEntry' && (
            <MaterialsEntry
              jobs={jobs}
              materials={materials}
              setMaterials={setMaterials}
              accountType={accountType}
            />
          )}
          {activeTab === 'timeSheets' && (
            <Timesheets
              jobs={jobs}
              timesheets={timesheets}
              equipment={equipment}
              materials={materials}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;