import { TextField, Box } from "@mui/material";
import "./styles.scss";

interface InputProps {
  country: string;
  city: string;
  onCountryChange: (e: string) => void;
  onCityChange: (e: string) => void;
}

const DualInput = ({
  country,
  city,
  onCountryChange,
  onCityChange,
}: InputProps) => {
  return (
    <Box className="input-search">
      <TextField
        variant="outlined"
        label="City"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        sx={{
          flex: 1,
          backgroundColor: "transparent",
          borderRadius: "20px",
          "& .MuiInputBase-input": {
            color: "#fff",
            padding: "10px 14px",
          },
          "& .MuiFormLabel-root": {
            color: "#fff", // Color of the label when it is in normal state
            transition: "all 0.3s ease",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", // Remove the border color
            },
            "&:hover fieldset": {
              border: "none", // Ensure border is still none on hover
            },
            "&.Mui-focused fieldset": {
              border: "none", // Ensure border is still none when focused
            },
          },
          "& .MuiInputLabel-shrink": {
            color: "rgba(255, 255, 255, 0.4) !important",
          },
        }}
      />
      <Box
        className="separator"
        sx={{
          color: "#fff",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          mx: 1, // Margin for spacing around the separator
        }}
      >
        |
      </Box>
      <TextField
        variant="outlined"
        label="Country"
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        sx={{
          flex: 1,
          backgroundColor: "transparent",
          borderRadius: "20px",
          "& .MuiInputBase-input": {
            color: "#fff", // Text color inside the input
            padding: "10px 14px",
          },
          "& .MuiFormLabel-root": {
            color: "#fff", // Color of the label when it is in normal state
            transition: "all 0.3s ease",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", // Remove the border color
            },
            "&:hover fieldset": {
              border: "none", // Ensure border is still none on hover
            },
            "&.Mui-focused fieldset": {
              border: "none", // Ensure border is still none when focused
            },
          },
          "& .MuiInputLabel-shrink": {
            color: "rgba(255, 255, 255, 0.4) !important",
          },
        }}
      />
    </Box>
  );
};

export default DualInput;
