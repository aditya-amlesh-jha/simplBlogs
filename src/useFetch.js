import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortConst = new AbortController();

        fetch(url,{signal: abortConst.signal},{
            mode: 'no-cors'
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("could not fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if(err.name === "AbortError"){
                    console.log("fetch aborted");
                }
                else{
                    setIsPending(false);
                    setError(err.message);
                }
            })

        return ()=> abortConst.abort();
    }, [])

    return {data,isPending,error};
}

export default useFetch;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const source = axios.CancelToken.source();

//     axios
//       .get(url, { cancelToken: source.token })
//       .then((response) => {
//         setData(response.data);
//         setIsPending(false);
//         setError(null);
//       })
//       .catch((error) => {
//         if (axios.isCancel(error)) {
//           console.log("Request canceled");
//         } else {
//           setIsPending(false);
//           setError(error.message);
//         }
//       });

//     return () => {
//       source.cancel("Request canceled");
//     };
//   }, [url]);

//   return { data, isPending, error };
// };

// export default useFetch;