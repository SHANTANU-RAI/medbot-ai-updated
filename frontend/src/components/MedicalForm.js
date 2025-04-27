// // This is a simplified version of what your MedicalForm component might look like
// // Update your actual component with this logic

// import { useState, useEffect } from "react";

// const MedicalForm = ({ onSubmit }) => {
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [conditions, setConditions] = useState("");
//   const [allergies, setAllergies] = useState("");
//   const [medications, setMedications] = useState("");
//   const [detailsExist, setDetailsExist] = useState(false);
  
//   useEffect(() => {
//     // Check if medical details exist for this user
//     const currentUser = localStorage.getItem("userEmail");
//     const userMedicalData = localStorage.getItem(`medicalData_${currentUser}`);
    
//     if (userMedicalData) {
//       setDetailsExist(true);
      
//       // If you want, you can also populate the form with existing data
//       try {
//         const data = JSON.parse(userMedicalData);
//         setAge(data.age || "");
//         setGender(data.gender || "Male");
//         setConditions(data.conditions || "");
//         setAllergies(data.allergies || "");
//         setMedications(data.medications || "");
//       } catch (e) {
//         console.error("Error parsing medical data", e);
//       }
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Save the medical data
//     const medicalData = {
//       age,
//       gender,
//       conditions,
//       allergies,
//       medications
//     };
    
//     const currentUser = localStorage.getItem("userEmail");
//     localStorage.setItem(`medicalData_${currentUser}`, JSON.stringify(medicalData));
    
//     // Call the onSubmit from parent to update state
//     onSubmit();
//   };

//   const handleContinue = () => {
//     // Just trigger the onSubmit without saving data again
//     onSubmit();
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4 text-left">Medical Information</h2>
      
//       {detailsExist && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//           <span>Medical details already exist!</span>
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
//           <input
//             type="text"
//             value={conditions}
//             onChange={(e) => setConditions(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Hypertension, Diabetes, etc."
//           />
//           <p className="text-xs text-gray-500 mt-1 text-right">Separate multiple conditions with commas</p>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
//           <input
//             type="text"
//             value={allergies}
//             onChange={(e) => setAllergies(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Peanuts, Penicillin, etc."
//           />
//           <p className="text-xs text-gray-500 mt-1 text-right">Separate multiple allergies with commas</p>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
//           <input
//             type="text"
//             value={medications}
//             onChange={(e) => setMedications(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Lisinopril, Metformin, etc."
//           />
//           <p className="text-xs text-gray-500 mt-1 text-right">Separate multiple medications with commas</p>
//         </div>
        
//         <div className="flex justify-center space-x-4">
//           {detailsExist ? (
//             <>
//               <button
//                 type="button"
//                 onClick={handleContinue}
//                 className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
//               >
//                 Continue with Existing Data
//               </button>
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
//               >
//                 Update & Save
//               </button>
//             </>
//           ) : (
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-lg shadow-md transition duration-300"
//             >
//               Save Medical Information
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MedicalForm;


import { useState } from "react";

const MedicalForm = ({ onSubmit }) => {

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    medical_conditions: "",
    allergies: "",
    medications: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const email = localStorage.getItem("userEmail");

      const response = await fetch("http://localhost:5000/medical/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log( " retunred from /save and saved medical form data");
        onSubmit(); // Update formFilled state in Dashboard
      } else {
        setError(data.error || "Failed to save medical details.");
      }
    } catch (error) {
      console.error("Error saving medical details:", error);
      setError("Error saving medical details. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Medical Information</h2>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="1"
              max="120"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Medical Conditions
          </label>
          <input
            type="text"
            name="medical_conditions"
            value={formData.medical_conditions}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="E.g., Diabetes, Hypertension, None"
          />
          <p className="mt-1 text-xs text-gray-500">Separate multiple conditions with commas</p>
        </div>

        <div className="mt-6 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="E.g., Penicillin, Peanuts, None"
          />
          <p className="mt-1 text-xs text-gray-500">Separate multiple allergies with commas</p>
        </div>

        <div className="mt-6 space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Current Medications
          </label>
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="E.g., Metformin 500mg, Aspirin 81mg, None"
          />
          <p className="mt-1 text-xs text-gray-500">Separate multiple medications with commas</p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg text-white font-medium transition duration-300 flex items-center ${
              isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isSubmitting ? "Saving..." : "Save Medical Information"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalForm;



// import { useState } from "react";

// const MedicalForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     age: "",
//     gender: "",
//     medical_conditions: "",
//     allergies: "",
//     medications: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const email = localStorage.getItem("userEmail"); // Fetch user email

//       const response = await fetch("http://localhost:5000/medical/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...formData, email }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Medical details saved successfully!");
//         onSubmit(); // Update formFilled state in Dashboard
//       } else {
//         alert(data.error || "Failed to save medical details.");
//       }
//     } catch (error) {
//       console.error("Error saving medical details:", error);
//       alert("Error saving medical details. Try again later.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
//       <h2 className="text-2xl font-bold mb-4">Medical Information</h2>
//       <form onSubmit={handleSubmit}>
//         <label className="block">
//           Age:
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//             required
//           />
//         </label>

//         <label className="block mt-3">
//           Gender:
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//             required
//           >
//             <option value="">Select</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label className="block mt-3">
//           Medical Conditions:
//           <input
//             type="text"
//             name="medical_conditions"
//             value={formData.medical_conditions}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </label>

//         <label className="block mt-3">
//           Allergies:
//           <input
//             type="text"
//             name="allergies"
//             value={formData.allergies}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </label>

//         <label className="block mt-3">
//           Medications:
//           <input
//             type="text"
//             name="medications"
//             value={formData.medications}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </label>

//         <button
//           type="submit"
//           className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MedicalForm;
