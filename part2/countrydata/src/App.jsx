import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const CountryDataDisplay = (props) => {
    return (
        <div>
            {props.show ?
                <div >
                    <h1>{props.countryData.name.common} </h1>
                    <p> Capital {props.countryData.capital}</p>
                    <p> Area {props.countryData.area}</p>
                    <h1> Languages </h1>
                    {(Object.entries(props.countryData.languages)).map(l => <li>{l[1]}</li>)}
                    <img src={props.countryData.flags.png} />
               </div>
             :null }
        </div>
    )
}

const CountryDataDisplayContainer = (props) => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <button name={props.countryData.name.common} onClick={() => setShow(!show)}> show </button>
            <CountryDataDisplay show={show} setShow={setShow}/>
        </div>
    )
}

const CountriesDataDisplay = (props) => {
    
     return (
        props.countryData.length===1 ?
             <div>
                 <CountryDataDisplay countryData={props.countryData[0]} show={true} />
            </div>
            : props.countryData.map(c =>
                <div>
                    {c.name.common} 

                    <CountryDataDisplayContainer countryData={c} />
                </div>  
            )
        
    )
}


const App = () => {
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect run, country is now', country)

    // skip if currency is not defined
    if (country) {
      console.log('fetching country')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => setCountryData(response.data.filter((c) => c.name.common.toLowerCase().includes(country.toLowerCase()))))
    }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Country: <input value={value} onChange={handleChange} />
        <button type="submit">findCountry</button>
      </form>
      <div>
        {countryData.length > 10 ? "Too many matches, specify another filter" :
         <CountriesDataDisplaycontainer countryData={countryData}/>}
      </div>
    </div>
  )
}

export default App