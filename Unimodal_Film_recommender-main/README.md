### **README for Unimodal Film Recommender**

---

## **Project Overview**
The **Unimodal Film Recommender** is a film recommendation system built using Python (backend) and React (frontend). It leverages a dataset of movie ratings and a trained recommendation model to suggest films to users based on their preferences.

---

## **Features**
- Recommends films tailored to user preferences.
- Utilizes a pre-trained **SVD (Singular Value Decomposition)** model.
- Offers a user-friendly interface for smooth interaction.
- Designed with a clean and scalable architecture.

---

## **Tech Stack**
- **Backend**: Python (Flask or FastAPI).
- **Frontend**: React.js.
- **Data**: Preprocessed and merged movie recommendation dataset.
- **Model**: Trained using the SVD algorithm.

---

## **Folder Structure**
```
backend/
├── app/
│   ├── __init__.py         # App initialization
│   ├── config.py           # Configuration file
│   ├── model.py            # Machine learning model handling
│   ├── routes.py           # Backend API routes
├── data/
│   ├── Merged_Movie_Recommendation_Dataset.csv  # Dataset file
├── saved_models/
│   ├── movie_mapping.pkl   # Mapping of movie IDs to names
│   ├── svd_model.pkl       # Pre-trained SVD model
├── requirements.txt        # Python dependencies
├── run.py                  # Script to run the backend
```

---

## **Setup and Installation**

### **Backend**
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```bash
   python run.py
   ```
   The backend should now be running at `http://localhost:5000`.

### **Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

---

## **Usage**
1. Open the frontend at `http://localhost:3000`.
2. Enter your preferences or interact with the interface.
3. Receive personalized film recommendations instantly.

---

## **Dataset**
- The dataset used is located at `data/Merged_Movie_Recommendation_Dataset.csv`.
- It contains merged data of user ratings and movie metadata for training and evaluation.

---

## **Trained Models**
- Pre-trained models are stored in the `saved_models` folder:
  - `svd_model.pkl`: The SVD model for recommendations.
  - `movie_mapping.pkl`: Maps movie IDs to movie names.

---

## **API Endpoints**
1. **Base URL**: `http://localhost:5000`
2. **Endpoints**:
   - `/recommend`: Returns film recommendations for a given user.
   - `/movies`: Lists all available movies.

---

## **Future Enhancements**
- Expand to multimodal recommendations (e.g., combining genres, reviews, etc.).
- Add user authentication and profile management.
- Explore advanced recommendation algorithms (e.g., neural networks).

---

## **Contributing**
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and push them to your fork.
4. Create a pull request for review.

---

## **License**
This project is licensed under the MIT License.
