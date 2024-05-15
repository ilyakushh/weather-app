import { useEffect, useState, useRef } from "react";

import { Watch } from "react-loader-spinner";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { CSSTransition } from "react-transition-group";
import {
  fetchWeatherData,
  getLocationData,
  updateDate,
  backgroundImage,
  getWeatherIcon,
} from "../../utils/common";
import styles from "./App.module.scss";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    tempMax: "",
    tempMin: "",
    humidity: "",
    cloudy: "",
    wind: "",
  });
  const [inputData, setInputData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [weatherDate, setWeatherDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const transitionRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = await getLocationData(latitude, longitude);
        setSearchQuery(
          locationData.results[0].components.city ||
            locationData.results[0].components.town
        );
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setSearchQuery("Minsk");
      }
    );
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchWeatherData(searchQuery)
        .then((json) => {
          setWeatherData({
            city: json.name,
            averageTemp: Math.round(json.main.temp),
            tempMax: Math.round(json.main.temp_max),
            tempMin: Math.round(json.main.temp_min),
            humidity: json.main.humidity,
            cloudy: json.clouds.all,
            wind: json.wind.speed,
            weather: json.weather[0].main,
            description: json.weather[0].description,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [searchQuery]);

  useEffect(() => {
    setWeatherDate(updateDate());
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSearchQuery(inputData);
    setInputData("");
  };

  return (
    <div
      className={styles.appContainer}
      style={{
        backgroundImage: `url(${backgroundImage(weatherData.weather)})`,
      }}
    >
      <CSSTransition
        nodeRef={transitionRef}
        in={isLoading}
        timeout={500}
        classNames="loader"
        unmountOnExit
      >
        <div ref={transitionRef} className={`${styles.loaderContainer}`}>
          <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="red"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </CSSTransition>

      {!isLoading && (
        <>
          <div className={styles.currentWeather}>
            <p>{weatherData.averageTemp}°</p>
            <div className={styles.details}>
              <div className={styles.location}>
                <p>{weatherData.city}</p>
                <span>{weatherDate}</span>
              </div>
              {getWeatherIcon(weatherData.weather)}
            </div>
          </div>
          <WeatherDetails
            weatherData={weatherData}
            setInputData={setInputData}
            inputData={inputData}
            onSubmitForm={onSubmitForm}
          />
        </>
      )}
    </div>
  );
}

export default App;
