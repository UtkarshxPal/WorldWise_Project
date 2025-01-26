import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

import { useEffect } from "react";
import styles from "./Homepage.module.css";

export default function Homepage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.show);
        }
      });
    });

    const hiddenElements = document.querySelectorAll(`.${styles.hidden}`);
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className={styles.homepage}>
      <PageNav />

      <section className={styles.hero}>
        <div className={`${styles["hero-content"]} ${styles.hidden}`}>
          <h1>
            <span className={styles["gradient-text"]}>WorldWise</span>
            <br />
            <span>Plan Your Adventures</span>
          </h1>
          <p>
            Experience travel like never before with AI-powered itineraries,
            smart note-taking, and a global community of adventurers.
          </p>
          <Link to="/login" className={styles.cta}>
            Start Your Journey
          </Link>
        </div>
        <div className={`${styles["hero-image"]} ${styles.hidden}`}>
          <img src="/travel-bg.jpg" alt="Travel World" />
          <div className={styles.glow}></div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={`${styles["stats-container"]} ${styles.hidden}`}>
          <div className={styles["stat-item"]}>
            <h3>10M+</h3>
            <p>Active Travelers</p>
          </div>
          <div className={styles["stat-item"]}>
            <h3>150+</h3>
            <p>Countries Covered</p>
          </div>
          <div className={styles["stat-item"]}>
            <h3>1M+</h3>
            <p>Itineraries Created</p>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.hidden}>Why Choose WorldWise?</h2>
        <div className={styles["features-grid"]}>
          <div className={`${styles["feature-card"]} ${styles.hidden}`}>
            <div className={styles["feature-icon"]}>🤖</div>
            <h3>AI Itinerary Planner</h3>
            <p>
              Get personalized travel plans crafted by AI based on your
              preferences and interests
            </p>
          </div>
          <div className={`${styles["feature-card"]} ${styles.hidden}`}>
            <div className={styles["feature-icon"]}>📝</div>
            <h3>Smart Notes</h3>
            <p>
              Capture your travel memories with location-tagged notes, photos,
              and recommendations
            </p>
          </div>
          <div className={`${styles["feature-card"]} ${styles.hidden}`}>
            <div className={styles["feature-icon"]}>🗺️</div>
            <h3>Interactive Maps</h3>
            <p>
              Visualize your travels with beautiful interactive maps and track
              your journey
            </p>
          </div>
          <div className={`${styles["feature-card"]} ${styles.hidden}`}>
            <div className={styles["feature-icon"]}>🌍</div>
            <h3>Global Community</h3>
            <p>
              Connect with fellow travelers and share experiences from around
              the world
            </p>
          </div>
        </div>
      </section>

      <section className={styles.destinations}>
        <h2 className={styles.hidden}>Popular Destinations</h2>
        <div className={styles["destinations-grid"]}>
          <div className={`${styles["destination-card"]} ${styles.hidden}`}>
            <img src="/img-1.jpg" alt="Paris" />
            <div className={styles["destination-content"]}>
              <h3>Paris, France</h3>
              <p>
                The City of Light beckons with its iconic architecture and
                culinary delights
              </p>
            </div>
          </div>
          <div className={`${styles["destination-card"]} ${styles.hidden}`}>
            <img src="/img-2.jpg" alt="Tokyo" />
            <div className={styles["destination-content"]}>
              <h3>Tokyo, Japan</h3>
              <p>Where tradition meets future in a vibrant metropolis</p>
            </div>
          </div>
          <div className={`${styles["destination-card"]} ${styles.hidden}`}>
            <img src="/travel-bg.jpg" alt="Santorini" />
            <div className={styles["destination-content"]}>
              <h3>Santorini, Greece</h3>
              <p>
                Stunning sunsets and white-washed beauty of the Mediterranean
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.hidden}>What Our Travelers Say</h2>
        <div className={styles["testimonials-grid"]}>
          <div className={`${styles["testimonial-card"]} ${styles.hidden}`}>
            <div className={styles["testimonial-content"]}>
              <p>
                WorldWise made planning my Europe trip a breeze! The AI
                suggestions were spot-on and saved me hours of research.
              </p>
              <div className={styles["testimonial-author"]}>
                <img src="/logo.png" alt="Sarah M." />
                <div>
                  <h4>Sarah M.</h4>
                  <span>Explored 12 cities</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles["testimonial-card"]} ${styles.hidden}`}>
            <div className={styles["testimonial-content"]}>
              <p>
                The interactive maps and travel notes feature helped me create a
                perfect itinerary for my Japan adventure!
              </p>
              <div className={styles["testimonial-author"]}>
                <img src="/logo.png" alt="David L." />
                <div>
                  <h4>David L.</h4>
                  <span>Explored 8 cities</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles["testimonial-card"]} ${styles.hidden}`}>
            <div className={styles["testimonial-content"]}>
              <p>
                As a solo traveler, the community features helped me connect
                with fellow adventurers and get insider tips.
              </p>
              <div className={styles["testimonial-author"]}>
                <img src="/logo.png" alt="Emma R." />
                <div>
                  <h4>Emma R.</h4>
                  <span>Explored 15 cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.cta_section} ${styles.hidden}`}>
        <h2>Ready to Start Your Adventure?</h2>
        <p>
          Join millions of travelers who trust WorldWise for their journey
          planning
        </p>
        <Link to="/login" className={styles.cta}>
          Get Started Free
        </Link>
      </section>
    </main>
  );
}
