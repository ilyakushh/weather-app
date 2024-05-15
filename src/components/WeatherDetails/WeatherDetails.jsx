import styles from "./WeatherDetails.module.scss";
import { FaSearch } from "react-icons/fa";
import { weatherItems } from "../../utils/constants";

const WeatherDetails = ({
  weatherData,
  setInputData,
  inputData,
  onSubmitForm,
}) => {
  const items = weatherItems(weatherData);

  return (
    <div className={styles.weatherDeatailsContainer}>
      <form className={styles.searchBar} onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Search location..."
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
        />
        <FaSearch className={styles.searchIcon} />
      </form>
      <h4>Weather Details</h4>
      <p>{weatherData.description}</p>
      <ul className={styles.detailsList}>
        {items.map((item) => (
          <li key={item.label}>
            <p>{item.label}</p>
            <div>
              <p>{`${item.value}${item.unit}`}</p>
              {item.icon}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDetails;
