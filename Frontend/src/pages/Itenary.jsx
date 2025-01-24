import Button from "../Components/Button";
import ItineraryCards from "../Components/ItineraryCards";
import PageNav from "../Components/PageNav";
import Sidebar from "../Components/Sidebar";
import styles from "./Itenary.module.css";

function Itenary() {
  return (
    <div>
      <div className={styles.itenary}>
        <PageNav></PageNav>
        {/* <h1></h1>
        <section>
          <img
            src="img-1.jpg"
            alt="person with dog overlooking mountain with sunset"
          />
          <div>
            <h2> Create your custom Itenary </h2>
            <p>
              Plan your journey your way with our custom itinerary feature!
              Whether you're dreaming of a relaxing getaway, an adventure-packed
              trip, or a mix of both, our platform allows you to create a
              personalized travel plan tailored to your preferences. Add your
              favorite destinations, activities, and travel dates with ease.
              Enjoy the flexibility to craft an itinerary that perfectly matches
              your style and needs, making your travel experience truly unique
              and unforgettable!
            </p>
            <p></p>
          </div>
        </section> */}
        <div>
          <ItineraryCards></ItineraryCards>
        </div>
        <Button type="primary">Lets Plan!</Button>
      </div>
    </div>
  );
}

export default Itenary;
