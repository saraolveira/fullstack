import { useState, useEffect } from "react"
import axios from "axios"

import Country from "./Country.jsx"

const Countries = ({ filteredCountries }) => {
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(null)
    const [temperature, setTemperature] = useState("")
    const [wind, setWind] = useState("")
    const api_key = import.meta.env.VITE_SOME_KEY

    let baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=${api_key}`

    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            setTemperature(response.data.main.temp)
            setWind(response.data.wind.speed)
        })
    }, [])

    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]
        const languages = Object.values(country.languages)
        const lat = country.latlng[0]
        const lon = country.latlng[1]

        baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

        return (
            <Country
                name={country.name.common}
                capital={country.capital}
                area={country.area}
                languages={languages}
                flag={country.flags.png}
                flagAlt={country.flags.alt}
                temperature={temperature}
                wind={wind}
            />
        )
    }

    const handleShow = (country) => {
        setShow(true)
        setSelected(country)
    }

    if (show) {
        const languages = Object.values(selected.languages)
        const lat = selected.latlng[0]
        const lon = selected.latlng[1]
        baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

        return (
            <Country
                name={selected.name.common}
                capital={selected.capital}
                area={selected.area}
                languages={languages}
                flag={selected.flags.png}
                flagAlt={selected.flags.alt}
                temperature={temperature}
                wind={wind}
            />
        )
    }

    return (
        <div>
            {filteredCountries.map((country) => (
                <div key={country.cca3}>
                    {country.name.common}{" "}
                    <button onClick={() => handleShow(country)}>show</button>
                </div>
            ))}
        </div>
    )
}

export default Countries
