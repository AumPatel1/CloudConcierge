import tensorflow as tf
from flask import Flask, request, jsonify
import numpy as np
import traceback
import os # Added for the __main__ block example

app = Flask(__name__)

# --- Model Loading ---
model = None
try:
    model = tf.keras.models.load_model(
        "model.h5",
        custom_objects={
            "mse": tf.keras.losses.MeanSquaredError()
        }
    )
    print("Model loaded successfully using custom_objects.")
except Exception as e:
    print(f"CRITICAL: Error loading model: {e}")
    traceback.print_exc()

# --- Define days list (Example - Add if needed for preprocessing) ---
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

# --- Define preprocess_input function (Example - Implement your logic) ---
def preprocess_input(day, temperature):
    """
    Example Preprocessing Function.
    Implement your actual preprocessing logic here.
    It must return a numpy array suitable for model.predict().
    """
    try:
        day_encoded = np.zeros(len(days))
        if day in days:
            day_index = days.index(day)
            day_encoded[day_index] = 1
        else:
            print(f"Warning: Unknown day '{day}' received.")
            # Handle unknown day appropriately
            # return None # Option: return None to indicate error

        # Example: Assuming model expects [temp, day_vec...]
        processed_features = np.array([float(temperature)] + list(day_encoded))
        # Reshape for model (1 sample, num_features)
        return processed_features.reshape(1, -1)
    except Exception as e:
        print(f"Error during preprocessing: {e}")
        traceback.print_exc()
        return None # Indicate error

# --- Root Route ---
@app.route('/', methods=['GET'])
def geti():
    """Handles GET requests to the root path."""
    print("GET request to / received.")
    # Return something more professional
    return "Le re L#nd k LE"

# --- Predict Route ---
@app.route('/predict', methods=['POST'])
def predict():
    """Handles POST requests for model prediction."""
    print("POST request to /predict received.")
    if model is None:
        print("Prediction failed: Model not loaded.")
        return jsonify({"error": "Model failed to load on server startup."}), 500

    try:
        # Get JSON data from request
        data = request.get_json(force=True)
        print(f"Received data: {data}")

        # Validate input
        if 'day' not in data or 'temperature' not in data:
            return jsonify({"error": "Missing 'day' or 'temperature' in request JSON"}), 400

        day = data['day']
        temperature = data['temperature'] # Consider adding float conversion try/except

        # Preprocess the input
        preprocessed_data = preprocess_input(day, temperature)
        if preprocessed_data is None:
             return jsonify({"error": "Failed to preprocess input. Check data and logs."}), 400

        print(f"Preprocessed data shape: {preprocessed_data.shape}")

        # --- Prediction ---
        prediction = model.predict(preprocessed_data)
        output = float(prediction[0][0]) # Adjust based on model output shape
        print(f"Prediction result: {output}")

        # --- Return Result ---
        return jsonify({'prediction': output})

    except ValueError as ve:
        print(f"Value error during prediction: {ve}")
        traceback.print_exc()
        return jsonify({"error": f"Invalid input data: {str(ve)}"}), 400
    except Exception as e:
        print(f"Error during prediction: {e}")
        traceback.print_exc()
        return jsonify({"error": f"An internal server error occurred: {str(e)}"}), 500

# --- Main Execution Block (Only for running `python app.py` directly) ---
if __name__ == '__main__':
    # This block is ignored by Gunicorn.
    # Port 8181 is specified here for direct execution only.
    print("Starting Flask development server directly (using app.run)...")
    # Use 0.0.0.0 to be accessible on the network
    app.run(host='0.0.0.0', port=8181, debug=True)


