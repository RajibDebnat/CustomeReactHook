import { useState,useEffect } from "react";

export default function useFetch(fetchFn,initialValue){
    // i can't use useEffect hooks inside an ordinary function because of i have added use before useFetch function therby i am able to call this useffect hooks 

    const [isFetching,setIsFetching]=useState(false);
    const [error,setError]=useState();
    const [fetchData,setFetchData]=useState(initialValue);

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            // i want here a dynamic fetch function so i can use function arguments 
            const places = await fetchFn();
            console.log(places)
            setFetchData(places);
          } catch (error) {
            console.log(error.message)
            setError({ message: error.message || 'Failed to fetch Data...' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, []);

      return {
        isFetching,error,fetchData,setFetchData
      }
}