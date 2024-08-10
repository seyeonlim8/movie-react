import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

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
    <div>
      {loading ? (
        <h1>"Loading..."</h1>
      ) : (
        <div>
          <h2>
            <Link to="/">Home</Link>
          </h2>

          <h1>Details</h1>
          <h2>{details.title_long}</h2>
          <img src={details.large_cover_image} />
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
