import React, { useState } from "react";
import { db, ref, set } from "./DATABASE/firebase";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
  });
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const reservationId = Date.now().toString();
      try {
        await set(ref(db, "reservations/" + reservationId), formData);
        alert("Reservation submitted successfully!");
        setFormData({ name: "", email: "", date: "", time: "", guests: 1 });
        setStep(1);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to submit reservation");
      }
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Time:
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Number of Guests:
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </>
        );
      case 2:
        return (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              Payment Options
            </h2>
            <p className="text-sm text-gray-500">Payment details go here.</p>
            {/* Add your payment form fields */}
          </div>
        );
      case 3:
        return (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Confirmation</h2>
            <p className="text-sm text-gray-500">
              Please review your details before submitting.
            </p>
            {/* Add your confirmation details */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-center w-[50%]">
        <ol className="flex items-center justify-center w-full max-w-md mb-8">
          <li
            className={`flex w-full justify-center text-center items-center ${
              step > 1 ? "text-green-600" : "text-gray-500"
            } after:content-[''] after:w-full after:h-1 after:border-b ${
              step > 1 ? "after:border-green-400" : "after:border-gray-200"
            } after:border-4 after:inline-block`}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 ${
                step > 1 ? "bg-green-400" : "bg-gray-200"
              } rounded-full lg:h-12 lg:w-12 shrink-0`}
            >
              <svg
                className={`w-4 h-4 ${
                  step > 1 ? "text-white" : "text-gray-500"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </li>
          <li
            className={`flex w-full items-center ${
              step > 2 ? "text-green-600" : "text-gray-500"
            } after:content-[''] after:w-full after:h-1 after:border-b ${
              step > 2 ? "after:border-green-400" : "after:border-gray-200"
            } after:border-4 after:inline-block`}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 ${
                step > 2 ? "bg-green-400" : "bg-gray-200"
              } rounded-full lg:h-12 lg:w-12 shrink-0`}
            >
              <svg
                className={`w-4 h-4 ${
                  step > 2 ? "text-white" : "text-gray-500"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Z" />
              </svg>
            </span>
          </li>
          <li className="flex items-center">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              <svg
                className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v2H7V2Zm2 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6-4H3V7h12v6Z" />
              </svg>
            </span>
          </li>
        </ol>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        {renderStepContent(step)}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
