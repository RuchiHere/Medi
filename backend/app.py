# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return "✅ Flask backend is running! Use POST /predict to get predictions."


model = joblib.load("rf_model.pkl")
encoder = joblib.load("label_encoder.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    pred = model.predict(df)
    label = encoder.inverse_transform(pred)
    return jsonify({"prediction": label[0]})

if __name__ == "__main__":
    app.run(debug=True)
