import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Sun from "/src/assets/images/sun.png";
import Cloud from "/src/assets/images/cloud.png";
import DualInput from "../../elements/DualInput";
import useWindowSize from "../../hooks/use-size";
import "./styles.scss";
import { convertTimestamp } from "../../utils/date";

interface WeatherProps {
  description: string;
  tempCelsius: number | string;
  tempMinCelsius: number | string;
  tempMaxCelsius: number | string;
  humidity: number | string;
  time: string;
}

interface HistoryProps {
  city: string;
  country: string;
  time: string;
}

const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [weather, setWeather] = useState<WeatherProps | null>({
    description: "",
    tempCelsius: "",
    tempMinCelsius: "",
    tempMaxCelsius: "",
    humidity: "",
    time: "",
  });
  const [history, setHistory] = useState<HistoryProps[]>([]);
  const [error, setError] = useState("");
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(false);

  const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;

  const fetchWeather = async (city: string, country: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`
      );
      const data = response.data;

      const tempCelsius = kelvinToCelsius(data.main.temp).toFixed(1);
      const tempMinCelsius = kelvinToCelsius(data.main.temp_min).toFixed(1);
      const tempMaxCelsius = kelvinToCelsius(data.main.temp_max).toFixed(1);
      const currentTime = Math.floor(Date.now() / 1000);

      setWeather({
        description: data.weather[0].description,
        tempCelsius: tempCelsius,
        tempMinCelsius: tempMinCelsius,
        tempMaxCelsius: tempMaxCelsius,
        humidity: `${data.main.humidity}%`,
        time: convertTimestamp(data.dt),
      });
      setHistory([
        { city, country, time: convertTimestamp(currentTime) },
        ...history,
      ]);
      setError("");
    } catch (err) {
      setError("Invalid city or country name");
      setWeather(null);
    } finally {
      //fake api loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleSearch = () => {
    fetchWeather(city, country);
  };

  const handleClear = () => {
    setCity("");
    setCountry("");
    setWeather(null);
    setError("");
  };

  const handleDelete = (index: number) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  const renderDetail = () => {
    if (width <= 768) {
      return (
        <>
          <Typography className="fs16w400" gutterBottom>
            Today's Weather
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Typography className="degree" gutterBottom>
              {weather && weather.tempCelsius ? weather.tempCelsius : 0}&#176;
            </Typography>
            <Typography className="fs16w400">
              {weather && weather.description ? weather.description : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {weather && (
              <>
                {" "}
                <Typography className="fs16w400">
                  {`H: ${
                    weather && weather.tempMinCelsius
                      ? weather.tempMinCelsius
                      : 0
                  }° L: ${
                    weather && weather.tempMaxCelsius
                      ? weather.tempMaxCelsius
                      : 0
                  }°`}
                </Typography>
                <Typography className="fs16w400">
                  Humidity: {weather.humidity}
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className="fs16w700">
              {city} {country ? `, ${country}` : " . "}
            </Typography>
            {weather && (
              <>
                <Typography className="fs16w400">{weather.time}</Typography>
              </>
            )}
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Typography className="fs16w400" gutterBottom>
            Today's Weather
          </Typography>
          <Typography className="degree" gutterBottom>
            {weather && weather.tempCelsius ? weather.tempCelsius : 0}&#176;
          </Typography>
          <Typography className="fs16w400">
            {`H: ${
              weather && weather.tempMinCelsius ? weather.tempMinCelsius : 0
            }° L: ${
              weather && weather.tempMaxCelsius ? weather.tempMaxCelsius : 0
            }°`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className="fs16w700">
              {city} {country ? `, ${country}` : " . "}
            </Typography>
            {weather && (
              <>
                <Typography className="fs16w400">{weather.time}</Typography>
                <Typography className="fs16w400">
                  Humidity: {weather.humidity}
                </Typography>
                <Typography className="fs16w400">
                  {weather.description}
                </Typography>
              </>
            )}
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <Box className="search">
        <DualInput
          country={country}
          city={city}
          onCountryChange={setCountry}
          onCityChange={setCity}
        />
        <Button
          className="button-search"
          variant="contained"
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </Box>
      <Box className="container">
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              backgroundColor: "rgba(26, 26, 26, 0.7)",
              zIndex: 1000,
            }}
          >
            <CircularProgress sx={{ color: "#9c27b0" }} />
          </Box>
        )}
        {weather && Number(weather.tempCelsius) <= 20 && (
          <img className="sun" src={Cloud} />
        )}
        {weather && Number(weather.tempCelsius) > 20 && (
          <img className="sun" src={Sun} />
        )}
        {renderDetail()}
        <Box className="history">
          <Typography gutterBottom className="fs16w400">
            Search History
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <List>
            {history.map((record, index) => (
              <ListItem className="fs16w400 item-degree" key={index}>
                <Box sx={{ flex: 1 }} className="item-left">
                  <Typography className="fs16w400" sx={{ marginRight: "auto" }}>
                    {`${record.city}, ${record.country}`}
                  </Typography>
                  <Typography
                    className="item-time fs16w400"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {record.time}
                  </Typography>
                </Box>
                <Box className="item-right">
                  <IconButton
                    edge="end"
                    sx={{ marginRight: "10px" }}
                    onClick={() => fetchWeather(record.city, record.country)}
                  >
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    sx={{ marginRight: "0" }}
                    edge="end"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Weather;
