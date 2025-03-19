import React, { useState } from 'react';
import './Employeetimeentry.css'; // Update the import to match the file name

function EmployeeTimeEntry({ jobs, timesheets, setTimesheets, accountType }) {
  // Static list of employees (replace with backend data in production)
  const [employees] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
  ]);

  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [timesheetEntry, setTimesheetEntry] = useState({
    jobId: '',
    date: '',
    timeIn: '',
    timeOut: '',
    hoursWorked: '',
    taskDescription: '',
  });

  // Sort employees
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  // Handle employee checkbox toggle
  const handleEmployeeToggle = (employeeName) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeName)
        ? prev.filter((name) => name !== employeeName)
        : [...prev, employeeName]
    );
  };

  // Handle timesheet form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimesheetEntry((prev) => {
      const updatedEntry = { ...prev, [name]: value };

      // Calculate hours worked if timeIn and timeOut are provided
      if (name === 'timeIn' || name === 'timeOut') {
        const { timeIn, timeOut } = { ...prev, [name]: value };
        if (timeIn && timeOut) {
          const start = new Date(`1970-01-01T${timeIn}:00`);
          const end = new Date(`1970-01-01T${timeOut}:00`);
          const hours = (end - start) / (1000 * 60 * 60);
          updatedEntry.hoursWorked = hours > 0 ? hours.toFixed(2) : '';
        } else {
          updatedEntry.hoursWorked = '';
        }
      }

      return updatedEntry;
    });
  };

  // Validate time conflicts for an employee on a given date
  const hasTimeConflict = (employeeName, date, timeIn, timeOut, excludeJobId = null) => {
    const newStart = new Date(`1970-01-01T${timeIn}:00`);
    const newEnd = new Date(`1970-01-01T${timeOut}:00`);

    return timesheets.some((ts) => {
      if (
        ts.employeeName === employeeName &&
        ts.date === date &&
        (excludeJobId ? ts.jobId !== excludeJobId : true)
      ) {
        const existingStart = new Date(`1970-01-01T${ts.timeIn}:00`);
        const existingEnd = new Date(`1970-01-01T${ts.timeOut}:00`);
        return newStart < existingEnd && newEnd > existingStart;
      }
      return false;
    });
  };

  // Handle timesheet form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee.');
      return;
    }
    if (!timesheetEntry.jobId || !timesheetEntry.date || !timesheetEntry.timeIn || !timesheetEntry.timeOut) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate time conflicts for each selected employee
    const conflicts = selectedEmployees.filter((employeeName) =>
      hasTimeConflict(employeeName, timesheetEntry.date, timesheetEntry.timeIn, timesheetEntry.timeOut)
    );

    if (conflicts.length > 0) {
      alert(
        `Time conflict detected for the following employees: ${conflicts.join(
          ', '
        )}. They are already scheduled on another job during this time.`
      );
      return;
    }

    // Add timesheet entries for each selected employee
    const newTimesheets = selectedEmployees.map((employeeName) => ({
      id: timesheets.length + 1 + Math.random(), // Simple ID (replace with UUID in production)
      jobId: Number(timesheetEntry.jobId),
      employeeName,
      date: timesheetEntry.date,
      timeIn: timesheetEntry.timeIn,
      timeOut: timesheetEntry.timeOut,
      hoursWorked: Number(timesheetEntry.hoursWorked),
      taskDescription: timesheetEntry.taskDescription,
      approvalStatus: 'Pending',
    }));

    setTimesheets([...timesheets, ...newTimesheets]);
    setSelectedEmployees([]);
    setTimesheetEntry({
      jobId: '',
      date: '',
      timeIn: '',
      timeOut: '',
      hoursWorked: '',
      taskDescription: '',
    });
  };

  return (
    <div className="employee-time-entry-container">
      <h2>Employee Time Entry</h2>

      {/* Employee List */}
      <div className="employee-list">
        <div className="employee-list-header">
          <h3>Employees</h3>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Sort {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
          </button>
        </div>
        <div className="employee-list-body">
          {sortedEmployees.map((employee) => (
            <div key={employee.id} className="employee-item">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee.name)}
                onChange={() => handleEmployeeToggle(employee.name)}
              />
              <span>{employee.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timesheet Entry Form */}
      <div className="add-timesheet-form">
        <h3>Add Timesheet Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job:</label>
            <select
              name="jobId"
              value={timesheetEntry.jobId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a job</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.number})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={timesheetEntry.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time In:</label>
            <input
              type="time"
              name="timeIn"
              value={timesheetEntry.timeIn}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time Out:</label>
            <input
              type="time"
              name="timeOut"
              value={timesheetEntry.timeOut}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Hours Worked:</label>
            <input
              type="text"
              name="hoursWorked"
              value={timesheetEntry.hoursWorked}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Task Description:</label>
            <input
              type="text"
              name="taskDescription"
              value={timesheetEntry.taskDescription}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add Timesheet Entry</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeTimeEntry;