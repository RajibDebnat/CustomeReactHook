import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import useFetch from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  try {
    const places = await fetchAvailablePlaces();
    console.log(places)
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedPlaces);
      });
    });
  } catch (error) {
    // Handle fetchAvailablePlaces error
    console.error(error);
    throw new Error('Failed to fetch available places.');
  }
}




export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchData: availablePlaces,
    setFetchData: setAvailablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  // const [isFetching, setIsFetching] = useState(false);
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsFetching(true);

  //     try {
  //       const places = await fetchAvailablePlaces();

  //     } catch (error) {
  //       setError({
  //         message:
  //           error.message || 'Could not fetch places, please try again later.',
  //       });
  //       setIsFetching(false);
  //     }
  //   }

  //   fetchPlaces();
  // }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
