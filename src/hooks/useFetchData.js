import { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

const useFetchEVData = (csvFilePath) => {
  const [data, setData] = useState([]);
  const [totalEVs, setTotalEVs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(csvFilePath);
        Papa.parse(response.data, {
          header: true,
          complete: (results) => {
            setData(results.data);
            setTotalEVs(results.data.length);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          },
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [csvFilePath]);

  return { data, totalEVs, loading, error };
};

export default useFetchEVData;
