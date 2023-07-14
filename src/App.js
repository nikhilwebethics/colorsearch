import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchcolor, setsearchcolor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
     
        let data = await axios.get(
          "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
        );
        const res = data.data.colors;
        const filteredData = res.filter((color) => {
          return (
            color.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
            color.hex.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

        setData(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchcolor]);

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    setSearchQuery(trimmedQuery);
    setsearchcolor(trimmedQuery);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Color</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter color"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
 
{data.length ?
      <table className="color-table">
        <thead>
          <tr>
            <th></th>
            <th> Name</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((color, index) => (
            <ColorItem key={index} color={color} />
          ))}
        </tbody>
      </table>
      :<span style={{color:"red"}}>Sorry no color found</span>}
    </div>
  );
}

const ColorItem = ({ color }) => {
  const { color: name, hex } = color;

  return (
    <tr>
      <td>
        <div className="color-box" style={{background: hex }}></div>
      </td>
      <td>{name}</td>
      <td>{hex}</td>
    </tr>
  );
};
