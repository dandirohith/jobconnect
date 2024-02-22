import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateJobs = () => {
  const { user } = useSelector((state) => state.auth);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [minSalary, setMinSalary] = useState(null);
  const [maxSalary, setMaxSalary] = useState(null);
  const postJob = (e) => {
    const data = {
      title: jobTitle,
      description: jobDescription,
      location: jobLocation,
      minCTC: minSalary,
      maxCTC: maxSalary,
    };
    const sumOfLengths =
      jobTitle.length +
      minSalary.length +
      maxSalary.length +
      jobLocation.length;

    if (sumOfLengths > user.rupees) {
      toast.error("Insufficient Rupees");
    } else {
      axios
        .post("https://jobconnect-api.onrender.com/api/jobs/", data)
        .then((response) => {
          console.log(response);
        });
      user.rupees = sumOfLengths;

      // Make a PUT request to update the user on the server
      axios
        .put("https://jobconnect-api.onrender.com/api/users/update", {
          email: user.email,
          rupees: sumOfLengths,
        })
        .then((response) => {
          console.log(response.data.message); // Log success message
        })
        .catch((error) => {
          console.error(error); // Log any errors
        });
    }
  };
  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center">
      <section className="text-2xl font-bold my-20 px-4 justify-center w-full text-center">
        <p className="text-white">Create a Job | Shorten URLs with Ease!</p>
      </section>
      <h3>Submit a Job</h3>
      <form className="flex flex-col w-3/4" onSubmit={postJob}>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-6"
          name="title"
          placeholder="Enter Job title"
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-6"
          name="description"
          placeholder="Enter Job Description"
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-6"
          name="location"
          placeholder="Enter Job Location"
          onChange={(e) => setJobLocation(e.target.value)}
        />
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-6"
          name="min salary"
          placeholder="Enter Min Salary"
          onChange={(e) => setMinSalary(e.target.value)}
        />
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-6"
          name="max salary"
          placeholder="Enter Max Salary"
          onChange={(e) => setMaxSalary(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 border rounded-md bg-black text-white font-bold text-lg focus:outline-none hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateJobs;
