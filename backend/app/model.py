import pandas as pd
import numpy as np
import pickle
from sklearn.decomposition import TruncatedSVD
from sklearn.model_selection import train_test_split

# Load dataset
data_path = './data/Merged_Movie_Recommendation_Dataset.csv'
data = pd.read_csv(data_path)
data.dropna(inplace=True)

# Preprocessing
data['userId'] = data['userId'].astype('category').cat.codes
data['movieId'] = data['movieId'].astype('category').cat.codes

# Build movie ID-to-title mapping
movie_id_to_title = dict(zip(data['movieId'], data['title']))

# Split the dataset into training and test sets
train_data, test_data = train_test_split(data, test_size=0.2, random_state=42)

# Create the user-movie matrix for training
train_user_movie_matrix = train_data.pivot_table(
    index='userId', columns='movieId', values='rating', aggfunc='mean'
).fillna(0)


noise = np.random.normal(0, 0.1, train_user_movie_matrix.shape)  # Mean = 0, Std = 0.1
augmented_train_matrix = train_user_movie_matrix + noise
augmented_train_matrix = np.clip(augmented_train_matrix, 0, 5)  # Ensure ratings are between 0 and 5

# Train model using SVD
svd = TruncatedSVD(n_components=50, random_state=42)
latent_factors = svd.fit_transform(augmented_train_matrix)

# Predict ratings
predicted_matrix = svd.inverse_transform(latent_factors)
predicted_ratings = pd.DataFrame(
    predicted_matrix,
    index=train_user_movie_matrix.index,
    columns=train_user_movie_matrix.columns
)

# Save the model and the mapping
with open('./saved_models/svd_model.pkl', 'wb') as f:
    pickle.dump(predicted_ratings, f)
with open('./saved_models/movie_mapping.pkl', 'wb') as f:
    pickle.dump(movie_id_to_title, f)

# Recommendation function
def recommend_movies(user_id, num_recommendations=5):
    # Load model and movie title mapping
    with open('./saved_models/svd_model.pkl', 'rb') as f:
        predicted_ratings = pickle.load(f)
    with open('./saved_models/movie_mapping.pkl', 'rb') as f:
        movie_id_to_title = pickle.load(f)

    try:
        # Get predicted ratings for the user
        user_ratings = predicted_ratings.loc[user_id]

        # Sort movies by predicted rating in descending order
        sorted_ratings = user_ratings.sort_values(ascending=False)

        # Get the top N recommended movies
        recommendations = sorted_ratings.head(num_recommendations)

        # Return as a list of dictionaries containing movie title and rating
        return [
            {
                'movie_id': int(movie_id),
                'movie_title': movie_id_to_title.get(movie_id, "Unknown Title"),
                'predicted_rating': float(rating)
            }
            for movie_id, rating in recommendations.items()
        ]

    except KeyError:
        return []
