import styles from "./ItineraryCards.module.css";

function ItineraryCards() {
  return (
    <div className={styles["cards-container"]}>
      {/* Card 1 */}
      <div className={styles.card}>
        <div className={styles["card-header"]}>1</div>
        <h2>Input Your Details</h2>
        <p>
          Tell us your destination, budget, and travel duration. Add any
          specific preferences or interests.
        </p>
        <div className={styles.shadow}>
          <ul>
            <li>Destination</li>
            <li> Budget Range</li>
            <li> Trip Duration</li>
          </ul>
        </div>
      </div>

      {/* Card 2 */}
      <div className={styles.card}>
        <div className={styles["card-header"]}>2</div>
        <h2>AI Processing</h2>
        <p>
          Our AI analyzes thousands of possibilities to create your perfect
          personalized itinerary.
        </p>
        <div className={styles["progress-bar"]}></div>
      </div>

      {/* Card 3 */}
      <div className={styles.card}>
        <div className={styles["card-header"]}>3</div>
        <h2>Get Your Itinerary</h2>
        <p>
          Receive your detailed day-by-day plan with all arrangements and
          recommendations.
        </p>
        <div className={styles.shadow}>
          <ul>
            <li>Detailed Schedule</li>
            <li>Activity Details</li>
            <li>Cost Breakdown</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCards;
