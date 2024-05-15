import { FaThermometerHalf } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { IoIosCloudOutline } from "react-icons/io";
import { TbWind } from "react-icons/tb";
import styles from "../components/WeatherDetails/WeatherDetails.module.scss";

export const weatherItems = (weatherData) => [
  {
    label: "Temp max",
    value: weatherData.tempMax,
    icon: <FaThermometerHalf className={styles.iconHeat} />,
    unit: "°",
  },
  {
    label: "Temp min",
    value: weatherData.tempMin,
    icon: <FaThermometerHalf className={styles.iconCold} />,
    unit: "°",
  },
  {
    label: "Humidity",
    value: weatherData.humidity,
    icon: <MdOutlineWaterDrop className="icon" />,
    unit: "%",
  },
  {
    label: "Cloudy",
    value: weatherData.cloudy,
    icon: <IoIosCloudOutline className="icon" />,
    unit: "%",
  },
  {
    label: "Wind",
    value: weatherData.wind,
    icon: <TbWind className="icon" />,
    unit: "km/h",
  },
];
