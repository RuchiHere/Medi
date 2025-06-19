import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./PredictForm.css";


const symptomsList = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering",
  "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue",
  "muscle_wasting", "vomiting", "burning_micturition", "spotting_urination",
  "fatigue", "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings",
  "weight_loss", "restlessness", "lethargy", "patches_in_throat",
  "irregular_sugar_level", "cough", "high_fever", "sunken_eyes", "breathlessness",
  "sweating", "dehydration", "indigestion", "headache", "yellowish_skin",
  "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes",
  "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever",
  "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload",
  "swelling_of_stomach", "swelled_lymph_nodes", "malaise",
  "blurred_and_distorted_vision", "phlegm", "throat_irritation",
  "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
  "chest_pain", "weakness_in_limbs", "fast_heart_rate",
  "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool",
  "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising",
  "obesity", "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes",
  "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
  "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips",
  "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness",
  "stiff_neck", "swelling_joints", "movement_stiffness",
  "spinning_movements", "loss_of_balance", "unsteadiness",
  "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort",
  "foul_smell_of_urine", "continuous_feel_of_urine", "passage_of_gases",
  "internal_itching", "toxic_look_(typhos)", "depression", "irritability",
  "muscle_pain", "altered_sensorium", "red_spots_over_body", "belly_pain",
  "abnormal_menstruation", "dischromic_patches", "watering_from_eyes",
  "increased_appetite", "polyuria", "family_history", "mucoid_sputum",
  "rusty_sputum", "lack_of_concentration", "visual_disturbances",
  "receiving_blood_transfusion", "receiving_unsterile_injections", "coma",
  "stomach_bleeding", "distention_of_abdomen", "history_of_alcohol_consumption",
  "blood_in_sputum", "prominent_veins_on_calf", "palpitations",
  "painful_walking", "pus_filled_pimples", "blackheads", "scurring",
  "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
  "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"

];

const yesNoOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" }
];

const PredictForm = () => {
  const [symptoms, setSymptoms] = useState(() => {
    const initial = {};
    symptomsList.forEach(symptom => initial[symptom] = 0);
    return initial;
  });

  const [search, setSearch] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredSymptoms = symptomsList.filter((symptom) =>
    symptom.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction("");

    try {
      const res = await axios.post("http://localhost:5000/predict", symptoms);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      setPrediction("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="predict-form-container">
      <h2>Disease Prediction</h2>

      <input
        type="text"
        placeholder="🔍 Search symptoms..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
        {filteredSymptoms.map((symptom) => (
          <div key={symptom} className="form-row">
            <label>{symptom.replaceAll("_", " ")}</label>
            <Select
              options={yesNoOptions}
              defaultValue={yesNoOptions[1]}
              onChange={(selected) =>
                setSymptoms({ ...symptoms, [symptom]: parseInt(selected.value) })
              }
            />
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <div className="result">
          <h3>Predicted Disease:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
