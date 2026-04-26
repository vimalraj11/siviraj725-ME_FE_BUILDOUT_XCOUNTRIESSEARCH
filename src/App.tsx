import { useEffect, useState } from "react";
import "./App.css";

type Country = {
  name: string;
  flag: string;
  abbr: string;
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );

        const data: Country[] = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="countries-container">
        {filteredCountries.map((country) => (
          <div className="country-card">
            <img
              src={country.png}
              alt={`${country.common} flag`}
              className="flag"
            />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;