import React from 'react';
import './Timesheets.css'; // Import the new CSS file

function Timesheets({ jobs, timesheets, equipment, materials }) {
  // Job Details (use first timesheet's jobId or blank)
  const job = timesheets.length > 0 ? jobs.find((j) => j.id === timesheets[0].jobId) : null;
  const jobDetails = {
    date: timesheets.length > 0 ? timesheets[0].date : '',
    name: job ? job.title : '',
    number: job ? job.number : '',
  };

  // Employee Data (25 rows)
  const employeeRows = Array(25).fill(null).map((_, index) => {
    if (index < timesheets.length) {
      const ts = timesheets[index];
      return {
        employeeName: ts.employeeName,
        timeIn: '', // Placeholder (no time data yet)
        timeOut: '',
        totalHours: Number(ts.hoursWorked) || 0,
      };
    }
    return { employeeName: '', timeIn: '', timeOut: '', totalHours: 0 };
  });

  // Time Summary
  const totalHours = employeeRows.reduce((sum, row) => sum + row.totalHours, 0);
  const st = Math.min(totalHours, 40);
  const ot = Math.max(totalHours - 40, 0);
  const otDiff = ot * 1.5;

  // Materials and Equipment (default 10 slots, expand if needed)
  const materialEquipmentList = [
    ...equipment.map((eq) => `${eq.name} (${eq.rate}/hr x ${eq.usageHours})`),
    ...materials.map((m) => `${m.name} (${m.quantity} x $${m.unitPrice})`),
  ];
  const slotsNeeded = Math.max(10, materialEquipmentList.length);
  const halfSlots = Math.ceil(slotsNeeded / 2);
  const leftColumn = materialEquipmentList.slice(0, halfSlots);
  const rightColumn = materialEquipmentList.slice(halfSlots, halfSlots * 2);
  const paddedLeft = [...leftColumn, ...Array(halfSlots - leftColumn.length).fill('')];
  const paddedRight = [...rightColumn, ...Array(halfSlots - rightColumn.length).fill('')];
  const totalMaterialsEquipmentCost = equipment.reduce((sum, eq) => sum + eq.rate * eq.usageHours, 0) +
    materials.reduce((sum, m) => sum + m.quantity * m.unitPrice, 0);

  // Work Description (task descriptions, one per line)
  const workDescriptionLines = timesheets.map((ts) => ts.taskDescription).filter(Boolean);
  const descriptionRows = Array(Math.max(5, workDescriptionLines.length)).fill('').map((_, index) => 
    workDescriptionLines[index] || ''
  );

  return (
    <div className="timesheets-container">
      {/* Identification */}
      <div className="identification">
        <h2>Professional T&M</h2>
        <h3>Time and Material Form</h3>
        <div className="job-details">
          <span>Date: <span className="underline">{jobDetails.date}</span></span>
          <span>Job Name: <span className="underline">{jobDetails.name}</span></span>
          <span>Job Number: <span className="underline">{jobDetails.number}</span></span>
        </div>
      </div>

      {/* Time Tracking */}
      <div className="time-tracking">
        <table className="employee-table">
          <thead>
            <tr>
              <th></th>
              <th>Employee Name:</th>
              <th>Time In:</th>
              <th>Time Out:</th>
              <th>Time In:</th>
              <th>Time Out:</th>
              <th>Total Hours:</th>
            </tr>
          </thead>
          <tbody>
            {employeeRows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.employeeName}</td>
                <td>{row.timeIn}</td>
                <td>{row.timeOut}</td>
                <td>{row.timeIn}</td>
                <td>{row.timeOut}</td>
                <td>{row.totalHours.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="time-summary">
          <p>Total Hours: {totalHours.toFixed(2)}</p>
          <p>ST: {st.toFixed(2)}</p>
          <p>OT: {ot.toFixed(2)}</p>
          <p>OT DIFF: {otDiff.toFixed(2)}</p>
        </div>
      </div>

      {/* Materials and Equipment */}
      <div className="materials-equipment">
        <p>Materials and Equipment Used: ${totalMaterialsEquipmentCost.toFixed(2)}</p>
        <div className="materials-columns">
          <table className="materials-table">
            <tbody>
              {paddedLeft.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="materials-table">
            <tbody>
              {paddedRight.map((item, index) => (
                <tr key={index}>
                  <td>{index + halfSlots + 1}</td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Work Description and Footer */}
      <div className="work-footer">
        <p>Description of work completed:</p>
        <div className="description-box">
          {descriptionRows.map((line, index) => (
            <div key={index} className="description-line">{line}</div>
          ))}
        </div>
        <div className="footer-details">
          <span>Name: <span className="underline"></span></span>
          <span>Signature: <span className="underline"></span></span>
          <span>Date: <span className="underline"></span></span>
        </div>
      </div>
    </div>
  );
}

export default Timesheets;