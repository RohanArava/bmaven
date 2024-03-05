import {useState, useEffect} from "react";
export function useFetch(uri, deps=[]){
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!uri) {
            setLoading(false)
            return;
        }
        fetch(uri)
        .then(data => data.json())
        .then(data => {console.log(data); return data;})
        .then(setData)
        .then(()=>setLoading(false))
        .catch(e=>{setError(e);setLoading(false)});
    }, deps);

    return {
        loading,
        data,
        error
    };
}