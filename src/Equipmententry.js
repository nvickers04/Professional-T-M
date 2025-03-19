import React, { useState } from 'react';

function EquipmentEntry({ jobs, equipment, setEquipment, accountType }) {
  const [selectedJobId] = useState(jobs[0].id);
  return (
    <div>
      <h3>Equipment Entry</h3>
      <p>Job: {jobs.find(j => j.id === selectedJobId)?.title}</p>
      <p>Equipment: {equipment.length}</p>
    </div>
  );
}

export default EquipmentEntry;