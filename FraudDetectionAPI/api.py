from flask import Flask, request, jsonify
from catboost import CatBoostClassifier
import pandas as pd
import shap
from sklearn.model_selection import train_test_split
from openai import OpenAI
from flask_cors import CORS

client = OpenAI(
    # This is the default and can be omitted
    api_key="",
)

# Model Loading
catboost = CatBoostClassifier()
catboost.load_model("./model/catboost.cbm")

explainer = shap.TreeExplainer(catboost)

# Define the scaffold prompt outside of the route functions
explainer_prompt = "You are a helpful explainer who explains the feature importance of the trained model produced by SHAP in each class. Below are the SHAP values for each feature in each class:\n"

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

# Function to generate text using the scaffold prompt
def generate_text(prompt):
    completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt, # Directly pass the string prompt here
            }
        ],
        model="gpt-3.5-turbo",
    )
    return completion.choices[0].message.content

def explain_feature_importance(X, explainer, feature_names):
    # Calculate SHAP values separately for each class
    shap_values = explainer.shap_values(X,)
    # Create a DataFrame to store the feature importance for class 0
    feature_importance = pd.DataFrame(
        shap_values, columns=feature_names, index=X.index
    ).abs().mean(axis=0).sort_values(ascending=False)

    return feature_importance


def train_model(X_train, y_train, X_eval, y_eval, params):
    # Params
    iterations = params.get('iterations', 2000)
    depth = params.get('depth', 8)
    learning_rate = params.get('learning_rate', 0.1)
    loss_function = params.get('loss_function', 'Logloss')
    eval_metric = params.get('eval_metric', 'Recall')

    # Training optimized model
    catboost = CatBoostClassifier(iterations=iterations,
                                  depth=depth,
                                  learning_rate=learning_rate,
                                  loss_function=loss_function,
                                  eval_metric=eval_metric)

    catboost.fit(X_train, y_train,
                 eval_set=(X_eval, y_eval),
                 verbose=100,
                 early_stopping_rounds=100)

    return catboost

@app.route('/api/transactions/train', methods=['POST'])
def train_model():
    try:
        # Get data from the request
        data = request.json
        X = data['X']
        y = data['y']

        # Split the data into training and evaluation sets
        X_train, X_eval, y_train, y_eval = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train the model
        catboost.fit(X_train, y_train, eval_set=(X_eval, y_eval), verbose=100, early_stopping_rounds=100)

        return jsonify({"message": "Model trained successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/api/transactions/predict', methods=['POST'])
def predict_transaction():
    try:
        # Get the uploaded data from the request
        data = request.json

        # Convert the JSON data to a DataFrame
        df = pd.DataFrame(data)


        date_df = df[['created', 'updated']]

        # Drop unnecessary columns
        columns_to_drop = ["collectionId", "collectionName", 'created', 'updated']
        df.drop(columns_to_drop, axis=1, inplace=True, errors="ignore")

        # Separate the id column into its own DataFrame
        id_df = df[['id']]

        # Drop the id column from the original DataFrame
        df = df.drop(columns=['id'])

        # Perform prediction
        predictions = catboost.predict(df)

        # Convert predictions to a DataFrame with a column named 'isFraud'
        prediction_df = pd.DataFrame(predictions, columns=['isFraud'])

        # Concatenate the id DataFrame with the predictions DataFrame
        final_df = pd.concat([id_df, prediction_df, date_df, df], axis=1)

        print(final_df.columns)

        # Convert the DataFrame to a dictionary
        result_dict = final_df.to_dict(orient='records')

        # Assuming explain_feature_importance and generate_text are defined elsewhere
        feature_importance = explain_feature_importance(df, explainer, df.columns)
        explainer_prompt_local = explainer_prompt
        for feature, importance in feature_importance.items():
            explainer_prompt_local += f"{feature}: {importance:.3f}\n"

        generated_text = generate_text(explainer_prompt_local)
        return jsonify({'preds': result_dict, 'explain': generated_text})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
