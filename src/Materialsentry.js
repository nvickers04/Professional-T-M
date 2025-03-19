import React, { useState } from 'react';

function MaterialsEntry({ jobs, materials, setMaterials, accountType }) {
  const [selectedJobId] = useState(jobs[0].id);
  return (
    <div>
      <h3>Materials Entry</h3>
      <p>Job: {jobs.find(j => j.id === selectedJobId)?.title}</p>
      <p>Materials: {materials.length}</p>
    </div>
  );
}

export default MaterialsEntry;