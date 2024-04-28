from flask import Flask, render_template, request
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder

app = Flask(__name__)

# Load the model and other required objects
df = pd.read_csv('pet3.csv')
df = pd.get_dummies(df, columns=['Species'])
label_encoder = LabelEncoder()
df['Disease'] = label_encoder.fit_transform(df['Disease'])
df = df.fillna(0)
X = df.drop('Disease', axis=1)
y = df['Disease']

# Training the model
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
rf_classifier = RandomForestClassifier(n_estimators=200, max_depth=10, min_samples_split=2, min_samples_leaf=1, random_state=42)
rf_classifier.fit(X_scaled, y)

@app.route('/')
def home():
    return render_template('disease.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Retrieve user input from the form
        age = int(request.form['age'])
        change_b = int(request.form['change_b'])
        reluctance_to_move = int(request.form['reluctance_to_move'])
        reduce_activity = int(request.form['reduce_activity'])
        stiffness = int(request.form['stiffness'])
        sneezing = int(request.form['sneezing'])
        vomiting = int(request.form['vomiting'])
        limping = int(request.form['limping'])
        aggression = int(request.form['aggression'])
        anxiety = int(request.form['anxiety'])
        compulsive_behavior = int(request.form['compulsive_behavior'])
        elimination = int(request.form['elimination'])
        species_dog = 1 if request.form['species'] == 'Dog' else 0
        species_cat = 1 if request.form['species'] == 'Cat' else 0

        # Process the user input
        user_input = np.array([[age, change_b, reluctance_to_move, reduce_activity, stiffness,
                                sneezing, vomiting, limping, aggression, anxiety,
                                compulsive_behavior, elimination, species_dog, species_cat]])

        # Scale the user input
        user_input = scaler.transform(user_input)

        # Make prediction using the trained model
        prediction = rf_classifier.predict(user_input)[0]

        # Decode the predicted disease
        predicted_disease = label_encoder.inverse_transform([prediction])[0]

        return render_template('result.html', predicted_disease=predicted_disease)

if __name__ == '__main__':
    app.run(debug=True)
