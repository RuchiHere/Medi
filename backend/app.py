from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Load the trained model and label encoder
model = joblib.load("backend/rf_model.pkl")
label_encoder = joblib.load("backend/label_encoder.pkl")

@app.route('/')
def home():
    return "Flask backend is running! Use POST /predict to get predictions."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("✅ Received symptoms:", data)

        # Convert dict to DataFrame with single row
        input_df = pd.DataFrame([data])

        # Make prediction
        prediction_index = model.predict(input_df)[0]
        predicted_label = label_encoder.inverse_transform([prediction_index])[0]

        return jsonify({'prediction': predicted_label})

    except Exception as e:
        print("❌ Prediction error:", str(e))
        return jsonify({'error': 'Prediction failed. Check server logs.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
