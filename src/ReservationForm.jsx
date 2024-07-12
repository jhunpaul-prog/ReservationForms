import React, { useState } from "react";
import { db, ref, set } from "./DATABASE/firebase";
import p4 from "./assets/GCash.png";
import p5 from "./assets/onsit.png";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
    paymentMethod: "",
  });
  const [step, setStep] = useState(1);

  const availableTimes = [
    "08:00 AM - 09:00 AM",
    "10:00 AM - 11:00 AM",
    "01:00 PM - 02:00 PM",
    "03:00 PM - 04:00 PM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const reservationId = Date.now().toString();
      try {
        await set(ref(db, "reservations/" + reservationId), formData);
        alert("Reservation submitted successfully!");
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: 1,
          paymentMethod: "",
        });
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Available Time:
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select a time
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Number of Guests:
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
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
            <p className="text-sm text-gray-500 mb-4">
              Please select your payment method.
            </p>
            <div className="flex flex-col gap-4">
              <label className="flex items-center font-semibold text-gray-600">
                <input
                  type="radio"
                  name="payment"
                  value="gcash"
                  checked={formData.paymentMethod == "gcash"}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="form-radio"
                />
                <img src={p4} alt="GCash" className="h-20 ml-2" />
                <p className="pl-5">Gcash</p>
              </label>
              <label className="flex items-center font-semibold text-gray-600">
                <input
                  type="radio"
                  name="payment"
                  value="onsite"
                  checked={formData.paymentMethod == "onsite"}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="form-radio"
                />
                <img src={p5} alt="Onsite" className="h-20 ml-2" />
                <p className="pl-5">Onsite Payment</p>
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Confirmation</h2>
            <p className="text-sm text-gray-500">
              Please review your details before submitting.
            </p>
            <p className="">{formData.name}</p>
            <p className="">{formData.email}</p>
            <p className="">{formData.date}</p>
            <p className="">{formData.time}</p>
            <p className="">{formData.guests}</p>
            <p className="">{formData.paymentMethod}</p>
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
            <span
              className={`flex items-center justify-center w-10 h-10 ${
                step > 3 ? "bg-green-400" : "bg-gray-200"
              } rounded-full lg:h-12 lg:w-12 shrink-0`}
            >
              <svg
                className={`w-4 h-4 text-gray-500 `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
          </li>
        </ol>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
      >
        {renderStepContent(step)}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={step === 2 && formData.paymentMethod === ""}
          >
            {step < 3 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
