from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("plant_model.h5")
classes = ["Healthy", "Early Blight", "Late Blight"]

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("image")
    if not file:
        return jsonify({"error":"No image provided"}), 400

    img = Image.open(file).convert("RGB").resize((224,224))
    img = np.array(img)/255.0
    img = np.expand_dims(img, 0)

    pred = model.predict(img)
    result = classes[np.argmax(pred)]
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT",5000)))
