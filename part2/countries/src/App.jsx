import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries.jsx"

const App = () => {
    const [countries, setCountries] = useState([])
    const [countrySearch, setCountrySearch] = useState("")

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    )

    useEffect(() => {
        axios
            .get("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => {
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (event) => {
        setCountrySearch(event.target.value)
    }

    return (
        <>
            <div>
                find countries{" "}
                <input value={countrySearch} onChange={handleSearch} />
            </div>
            {filteredCountries.length > 10 && (
                <p> Too many matches, specify another filter </p>
            )}
            {filteredCountries.length <= 10 && filteredCountries.length > 0 && (
                <Countries filteredCountries={filteredCountries} />
            )}
            {filteredCountries.length === 0 && (
                <p> No matches, specify another filter </p>
            )}
        </>
    )
}

export default App
