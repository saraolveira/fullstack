const Country = ({
    name,
    capital,
    area,
    languages,
    flag,
    flagAlt,
    temperature,
    wind,
}) => {
    return (
        <div>
            <h2>{name}</h2>
            <div>capital {capital}</div>
            <div>area {area}</div>
            <h3>languages:</h3>

            <ul>
                {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={flag} alt={flagAlt} />
            <h2>Weather in {capital}</h2>
            <div>temperature {temperature}</div>
            <div>wind {wind} m/s</div>
        </div>
    )
}

export default Country
