import { useEffect, useState } from "react";
import "./App.css";

type Country = {
  common: string;
  png: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  // API CALL
  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => res.json())
      .then((data: Country[]) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error(error); // IMPORTANT for test
      });
  }, []);

  // FILTER LOGIC
  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* COUNTRY LIST */}
      <div className="countriesContainer">
        {filteredCountries.map((country, index) => (
          <div className="countryCard" key={index}>
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;