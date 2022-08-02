import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PreLoad from './PreLoad'

const CardWeather = ({lat, lon}) => {
    
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelcius, setIsCelcius] = useState(true)
    const [preLoad, setPreLoad] = useState(true)


    useEffect(() => {
        if(lat){
            const APIKey = "56a4dc2d715dbf8d44c9a8845669c45f"
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${(res.data.main.temp - 273.15).toFixed(2)} °C`,
                        farenheit: `${((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(2)} °F`
                    }
                    setTemperature(temp)
                    setPreLoad(false)
                }) 
                .catch(err => console.log(`"Ha ocurrido un error" ${err}`))
        }
    }, [lat, lon])

    const handleClick = () => {setIsCelcius(!isCelcius)}

    if (preLoad) {
        return <PreLoad />
    } else {
        return (
            <article className='card__weather'>
                <div className='card__weather--title'>
                    <h1>Weather App</h1>
                    <p>{weather?.name}, {weather?.sys.country}</p>
                </div>

                <div className='card__weather--info'>
                    <div className='card__weather--img'>
                        <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.weather[0].description} />
                    </div>

                    <div className='card__weather--items'>
                        <ul>
                            <li>&#34;{weather?.weather[0].description}&#34;</li>
                            <li><span>icon</span> Wind speed: <strong>{weather?.wind.speed}m/s</strong></li>
                            <li><span>icon</span> Clouds: <strong>{weather?.clouds.all}%</strong></li>
                            <li><span>icon</span> Pressure: <strong>{weather?.main.pressure}mb</strong></li>
                        </ul>
                    </div>
                </div>

                <div className='card__temperature'>
                    <p><strong>{isCelcius ? temperature?.celsius : temperature?.farenheit}</strong></p>
                </div>

                <div className='card__weather--btn'>
                    <button onClick={handleClick}>{isCelcius ? 'Degrees °F' : 'Degrees °C'}</button>
                </div>
            </article>
        )
    }
}

export default CardWeather