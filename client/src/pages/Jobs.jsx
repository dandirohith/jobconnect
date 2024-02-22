import React, { useState, useEffect } from "react";
import axios from "axios";
const Jobs = () => {
  const [jobsStateArray, setJobsStateArray] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs/").then((response) => {
      console.log(response);
      setJobsStateArray(response.data);
    });
  }, []);

  async function handleApply() {
    try {
    } catch (err) {}
  }
  return (
    <div className="flex flex-col w-full text-white items-center">
      <div className="text-2xl font-bold my-20 px-4 justify-center">
        Available Jobs
      </div>
      {jobsStateArray.map((item, index) => {
        return (
          <div className="flex flex-col w-1/2 justify-between px-4 py-2 border rounded-md bg-black text-white mb-6">
            <p className="flex">
              <strong>Job Title</strong>: {item.title}
            </p>
            <p className="flex">
              <strong>Location</strong>: {item.location}
            </p>
            <p className="flex">
              <strong>Description</strong>: {item.description}
            </p>
            <p className="flex">
              <strong>Salary</strong>: {item.salary}
            </p>
            <button
              onClick={handleApply}
              className="px-4 py-2 border rounded-md bg-black text-white font-bold text-lg focus:outline-none hover:bg-gray-800"
            >
              Apply
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Jobs;
