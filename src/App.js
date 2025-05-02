import React, { useState } from "react";
import axios from "axios";

const HotelSearch = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const body = {
      CheckIn: checkIn,
      CheckOut: checkOut,
      City: city,
      NoOfRooms: 1,
      RoomGuests: [
        {
          NoOfAdults: Number(adults),
          NoOfChild: Number(children),
          ChildAge: []
        }
      ],
      UserId: 1,
      RequestID: "1"
    };

  //   try {
  //     const res = await axios.post("http://localhost:3000/hotels/search", body);

  //     const hotels = res.data || res.data || [];
  //     setResults(hotels);
  //   } catch (error) {
  //     console.error("Error fetching hotels:", error.response?.data || error.message);
  //   }
  //   setLoading(false);
  // };

try {
      const res = await axios.post("http://localhost:3000/hotels/search", body);
      const hotels = res.data?.data || [];

      const matches = hotels.filter(hotel =>
        [hotel.HotelName, hotel.HotelAddress, hotel.searchRequest?.City]
          .some(field => field?.toLowerCase().includes(city.toLowerCase()))
      );

      setResults(matches);
    } catch (error) {
      console.error("Error fetching hotels:", error.response?.data || error.message);
    }

    setLoading(false);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Hotel Search</h2>
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      <input type="number" placeholder="Adults" value={adults} onChange={(e) => setAdults(e.target.value)} />
      <input type="number" placeholder="Children" value={children} onChange={(e) => setChildren(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "20px" }}>
        {results.map((hotel, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h3>{hotel.HotelName}</h3>
            <p>{hotel.HotelAddress}</p>
            <p>₹ {hotel.Price?.Amount}</p>
            <img src={hotel.MainImage} alt={hotel.HotelName} width="200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelSearch;
