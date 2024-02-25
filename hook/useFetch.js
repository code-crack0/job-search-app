import {useState,useEffect} from 'react'
import axios from 'axios'


const useFetch = (endpoint,query) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params:{...query},
        headers: {
          'X-RapidAPI-Key': '22d4fa45d7mshe2df8d66a86f9a4p1cb2a3jsna92c662a898d',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.request(options);
          setData(response.data.data);
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      }
        useEffect(()=>{
            fetchData();
        },[])

    const refetch = () => {
        setLoading(true);
        fetchData();
    }
    return {data,loading,error,refetch};
}
export default useFetch;