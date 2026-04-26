import { useEffect, useState } from "react";
import "./App.css";

type Country = {
  common: string;
  png: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => res.json())
      .then((data: Country[]) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error(error); // IMPORTANT
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* MUST HAVE */}
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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