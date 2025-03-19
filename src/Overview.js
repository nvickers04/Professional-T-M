import React, { useState } from 'react';
import './Overview.css';

function Overview({ jobs, setJobs }) {
  const [showJobNumberFilter, setShowJobNumberFilter] = useState(false);
  const [showClientNameFilter, setShowClientNameFilter] = useState(false);
  const [selectedJobNumbers, setSelectedJobNumbers] = useState([]);
  const [selectedClientNames, setSelectedClientNames] = useState([]);
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    number: '',
    clientName: '',
    location: '',
    startDate: '',
    estimatedHours: '',
  });

  // Extract unique job numbers and client names for filter options
  const uniqueJobNumbers = [...new Set(jobs.map((job) => job.number))];
  const uniqueClientNames = [...new Set(jobs.map((job) => job.clientName))];

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const matchesJobNumber =
        selectedJobNumbers.length > 0
          ? selectedJobNumbers.includes(job.number)
          : true;
      const matchesClientName =
        selectedClientNames.length > 0
          ? selectedClientNames.includes(job.clientName)
          : true;
      return matchesJobNumber && matchesClientName;
    })
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)); // Most recent first

  // Handle checkbox changes
  const handleJobNumberChange = (jobNumber) => {
    setSelectedJobNumbers((prev) =>
      prev.includes(jobNumber)
        ? prev.filter((num) => num !== jobNumber)
        : [...prev, jobNumber]
    );
  };

  const handleClientNameChange = (clientName) => {
    setSelectedClientNames((prev) =>
      prev.includes(clientName)
        ? prev.filter((name) => name !== clientName)
        : [...prev, clientName]
    );
  };

  // Handle Add Job form submission
  const handleAddJob = (e) => {
    e.preventDefault();
    const newJobEntry = {
      id: jobs.length + 1, // Simple ID generation (replace with UUID in production)
      title: newJob.title,
      number: newJob.number,
      clientName: newJob.clientName,
      location: newJob.location,
      startDate: newJob.startDate,
      estimatedHours: Number(newJob.estimatedHours),
      status: 'Active', // Default status
      lastUpdated: new Date().toISOString().split('T')[0], // Current date
    };
    setJobs([...jobs, newJobEntry]);
    setShowAddJobPopup(false);
    setNewJob({
      title: '',
      number: '',
      clientName: '',
      location: '',
      startDate: '',
      estimatedHours: '',
    });
  };

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>Job List</h2>
        <button
          className="add-job-button"
          onClick={() => setShowAddJobPopup(true)}
        >
          Add Job
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <button
            className="filter-button"
            onClick={() => setShowJobNumberFilter(!showJobNumberFilter)}
          >
            Filter by Job Number
          </button>
          {showJobNumberFilter && (
            <div className="filter-options">
              {uniqueJobNumbers.map((jobNumber) => (
                <label key={jobNumber} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedJobNumbers.includes(jobNumber)}
                    onChange={() => handleJobNumberChange(jobNumber)}
                  />
                  {jobNumber}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="filter-group">
          <button
            className="filter-button"
            onClick={() => setShowClientNameFilter(!showClientNameFilter)}
          >
            Filter by Client Name
          </button>
          {showClientNameFilter && (
            <div className="filter-options">
              {uniqueClientNames.map((clientName) => (
                <label key={clientName} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedClientNames.includes(clientName)}
                    onChange={() => handleClientNameChange(clientName)}
                  />
                  {clientName}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job List Table */}
      <table className="job-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Job Number</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.number}</td>
                <td>{job.clientName}</td>
                <td>{job.status}</td>
                <td>{job.lastUpdated}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No jobs match the filters.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Job Popup */}
      {showAddJobPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Add New Job</h3>
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Job Title:</label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Job Number:</label>
                <input
                  type="text"
                  value={newJob.number}
                  onChange={(e) => setNewJob({ ...newJob, number: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Client Name:</label>
                <input
                  type="text"
                  value={newJob.clientName}
                  onChange={(e) => setNewJob({ ...newJob, clientName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={newJob.startDate}
                  onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Estimated Hours:</label>
                <input
                  type="number"
                  value={newJob.estimatedHours}
                  onChange={(e) => setNewJob({ ...newJob, estimatedHours: e.target.value })}
                  required
                />
              </div>
              <div className="popup-actions">
                <button type="submit">Add Job</button>
                <button
                  type="button"
                  onClick={() => setShowAddJobPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;