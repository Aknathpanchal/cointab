import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../App.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [sign, setSign] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:8080/get`)
      .then((res) => {
        let arr = res.data.data;

        if (arr.length === 0) {
          setSign(false);
          getData();
        } else {
          setSign(true);
        }
      })
      .catch((e) => console.log(e));
  };
  const navigate = useNavigate();

  const fetchButton = () => {
    if (sign === false) {
      axios.post("http://localhost:8080/post").then((res) => {
        getData();
        setSign(true);
      });
      alert("Data Added Successfully ");
    } else {
      alert("Data Already Added");
    }
  };

  const deleteButton = () => {
    if (sign == true) {
      axios.delete("http://localhost:8080/delete").then((res) => {
        getData();
      });
      alert("Data Successfully Deleted");
    } else {
      alert("Data not Found");
    }
  };

  const userButton = () => {
    navigate("/users");
  };

  return (
    <div className="App">
      <button onClick={fetchButton}>Fetch Users</button>
      <button onClick={deleteButton}>Delete Users</button>
      <button onClick={userButton}>View Users</button>
    </div>
  );
};

export default Home;
