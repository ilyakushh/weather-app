import clouds from "../img/clouds.jpg";
import axios from "axios";
import clear from "../img/clear2.jpg";
import thunderstorm from "../img/thunderstorm.jpg";
import rain from "../img/rain.jpg";
import drizzle from "../img/drizzle.jpg";
import mist from "../img/mist.jpg";
import snow from "../img/snow.jpg";
import styles from "../components/App/App.module.scss";
import {
  WiRain,
  WiStormShowers,
  WiShowers,
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiSnow,
  WiSmoke,
  WiDust,
  WiSandstorm,
  WiTornado,
} from "react-icons/wi";

export const updateDate = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${hours}:${minutes} - ${weekday}, ${day} ${month} ${year}`;
};

export const fetchWeatherData = (searchQuery) => {
  const api_key = import.meta.env.VITE_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${api_key}`;
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("City not found");
    }
    return res.json();
  });
};

export const getLocationData = async (latitude, longitude) => {
  const api_key = import.meta.env.VITE_GEOLOCATION_KEY;
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`
  );
  return response.data;
};

export const backgroundImage = (weather) => {
  switch (weather) {
    case "Clouds":
      return clouds;
    case "Rain":
      return rain;
    case "Thunderstorm":
      return thunderstorm;
    case "Drizzle":
      return drizzle;
    case "Clear":
      return clear;
    case "Mist":
      return mist;
    case "Snow":
      return snow;
    default:
      return drizzle;
  }
};
export const getWeatherIcon = (weather) => {
  switch (weather) {
    case "Clouds":
      return <WiCloudy className={styles.icon} />;
    case "Rain":
      return <WiRain className={styles.icon} />;
    case "Thunderstorm":
      return <WiStormShowers className={styles.icon} />;
    case "Drizzle":
      return <WiShowers className={styles.icon} />;
    case "Clear":
      return <WiDaySunny className={styles.icon} />;
    case "Mist" || "Fog":
      return <WiFog className={styles.icon} />;
    case "Snow":
      return <WiSnow className={styles.icon} />;
    case "Smoke":
      return <WiSmoke className={styles.icon} />;
    case "Dust":
      return <WiDust className={styles.icon} />;
    case "Sand":
      return <WiSandstorm className={styles.icon} />;
    case "Tornado":
      return <WiTornado className={styles.icon} />;
    default:
      return <WiCloudy className={styles.icon} />;
  }
};
