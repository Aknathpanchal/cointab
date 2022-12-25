import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/User.css";

const User = () => {
  const [searchname, setSearchname] = useState("");
  const [data, setdata] = useState([]);

  useEffect(() => {
    getDataFunction();
  }, []);
  const getDataFunction = () => {
    axios
      .get(`http://localhost:8080/get`)
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const filterByGender = (e) => {
    axios
      .get(`http://localhost:8080/search/${e.target.value}`)
      .then((res) => {
        setdata(res.data.data);
        if (e.target.value == "Filter by Gender") {
          getDataFunction();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>User Data</h1>
      <div className="filterdiv">
        <div>
          <select
            onChange={filterByGender}
            style={{
              width: "200px",
              height: "40px",
              fontSize: "17px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "30px",
            }}
          >
            <option>Filter by Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <input
            style={{
              width: "200px",
              height: "35px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "30px",
            }}
            type="text"
            placeholder="Filter by Name..."
            onChange={(e) => {
              setSearchname(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <table className="Table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Location</th>
              <th>Nationality</th>
              <th>Pin</th>
            </tr>
          </thead>
          {data
            .filter((elem) => {
              if (searchname === "") {
                return elem;
              } else if (
                elem.first.toLowerCase().includes(searchname.toLowerCase())
              ) {
                return elem;
              }
            })
            .map((e) => {
              return (
                <tbody key={e._id}>
                  <tr>
                    <td>{e.first}</td>
                    <td>{e.last}</td>
                    <td>{e.gender}</td>
                    <td>{e.email}</td>
                    <td>{e.location}</td>
                    <td>{e.nat}</td>
                    <td>{e.pin}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>

      <div>
        <div>
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default User;
