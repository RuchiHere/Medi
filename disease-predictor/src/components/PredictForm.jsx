import React, { useState } from "react";
import axios from "axios";
import "./PredictForm.css"; // Optional for styling

const symptomsList = [
  "itching", "skin_rash", "fatigue", "nausea", "vomiting", "headache",
  "fever", "cough", "chills", "sore_throat", "joint_pain", "breathlessness"
];

const PredictForm = () => {
  const [symptoms, setSymptoms] = useState({});
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setSymptoms({ ...symptoms, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/predict", symptoms);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      setPrediction("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h2>🧬Medi Predict</h2>
      <form onSubmit={handleSubmit}>
        {symptomsList.map((symptom) => (
          <div key={symptom} className="form-row">
            <label>{symptom.replaceAll("_", " ")}</label>
            <select name={symptom} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div className="result">
          <h3>🩺 Prediction Result:</h3>
          <p><strong>{prediction}</strong></p>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
