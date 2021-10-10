import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData]= useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect( ()=> {
        const abortCont = new AbortController();

            fetch(url, { signal: abortCont.signal })
            .then((response) => {
                if (!response.ok) {
                    throw Error('Desolé, une erreur est survenu 😥');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setIsLoading(false)
                setError(null)
            })
            .catch(err=>  {
                if (err.name === "AbortError") {
                    console.log("La requête a été annulée");
                } else {
                    // console.log(err.message)
                    setError(err.message)
                    setIsLoading(false)
                }
            })        


        return ()=> abortCont.abort();

        // console.log(blogs);
    }, [url]);

    return {data, isLoading, error};
}

export default useFetch;