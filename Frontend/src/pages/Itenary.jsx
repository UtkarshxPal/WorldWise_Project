import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "./CreateItinerary.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import PageNav from "../components/PageNav";

import styles from "./Itenary.module.css";

function CreateItinerary() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    duration: "",
    people: "1",
  });

  const [itinerary, setItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Create a detailed day-by-day travel itinerary for ${formData.people} people traveling to ${formData.destination} for ${formData.duration} with a budget of ${formData.budget}. 
      Include recommendations for:
      • Accommodations (with estimated prices)
      • Activities and attractions (with estimated costs)
      • Restaurants and dining options (with price ranges)
      • Transportation options and costs
      
      Format each day as:
      Day X: [Day Title]
      • Morning: [Activities]
      • Afternoon: [Activities]
      • Evening: [Activities]
      • Estimated daily cost: [Amount]
      
      Make sure to use bullet points (•) for all items and include specific details like prices and durations.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setItinerary(text);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setError(
        error.message || "Failed to generate itinerary. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <main className={styles.createItinerary}>
      {/* <PageNav /> */}

      <section className={styles.container}>
        <div className={styles.content}>
          <h2>Create Your Travel Itinerary</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="destination">Where are you planning to go?</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                placeholder="e.g., Paris, France"
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="budget">Whats your budget?</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                placeholder="e.g., $2000"
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="duration">How long is your trip?</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="e.g., 5 days"
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="people">Number of people</label>
              <input
                type="number"
                id="people"
                name="people"
                value={formData.people}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => navigate("/login")}
              >
                &larr; Open map
              </button>
              <button
                type="submit"
                className={styles.button}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Itinerary"}
              </button>
            </div>
          </form>

          {error && <p className={styles.error}>{error}</p>}

          {itinerary && (
            <div className={styles.itineraryResult}>
              <h3>Your Personalized Itinerary</h3>
              <div className={styles.itineraryContent}>{itinerary}</div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CreateItinerary;
