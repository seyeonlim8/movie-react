import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "./App.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setLoading(false);
    setDetails(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.detail-page}>
          <Link to="/">
            <Button text="Home" />
          </Link>
          <h1>Details</h1>
          <img src={details.large_cover_image} alt={details.title_long} />
          <h2>{details.title_long}</h2>
          <div>
            <h3>Year: {details.year}</h3>
            <h3>Rating: {details.rating}</h3>
          </div>
          <div>
            <h5>{details.description_intro}</h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
