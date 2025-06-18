# backend/train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load data
data = pd.read_csv("dataset/train_disease.csv")
data = data.drop(columns=["Unnamed: 133"], errors='ignore')

# Clean labels
data['prognosis'] = data['prognosis'].str.strip().replace({
    'hepatitis A': 'Hepatitis A',
    'Fungal infection': 'Fungal Infection',
    'Chronic cholestasis': 'Chronic Cholestasis',
    'Peptic ulcer diseae': 'Peptic Ulcer Disease',
    'Cervical spondylosis': 'Cervical Spondylosis',
    'Paralysis (brain hemorrhage)' : 'Paralysis (Brain Hemorrhage)',
    'Chicken pox': 'Chicken Pox',
    'Alcoholic hepatitis': 'Alcoholic Hepatitis',
    'Dimorphic hemmorhoids(piles)': 'Dimorphic Hemmorhoids (Piles)',
    'Heart attack': 'Heart Attack',
    'Varicose veins': 'Varicose Veins',
    'Urinary tract infection': 'Urinary Tract Infection',
    '(vertigo) Paroymsal  Positional Vertigo': 'Paroymsal Positional Vertigo'
})

encoder = LabelEncoder()
data['prognosis'] = encoder.fit_transform(data['prognosis'])

X = data.drop(columns=["prognosis"])
y = data["prognosis"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, "rf_model.pkl")
joblib.dump(encoder, "label_encoder.pkl")

# Evaluate
pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))
print(classification_report(y_test, pred))
