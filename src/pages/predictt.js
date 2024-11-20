
import React, { useState } from "react";
import "./predict.css";

const Predictt = () => {
  const [conductivity, setConductivity] = useState("");
  const [nitrate, setNitrate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [turbidity, setTurbidity] = useState("");
  const [wqi, setWQI] = useState("");
  const [qualityMessage, setQualityMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const calculateWQI = () => {
    if (conductivity === ""  || nitrate === "" ||  temperature === "" ||  turbidity === "") {
      alert("All fields are required.");
      return;
    }
    const numFields = [conductivity, nitrate, temperature, turbidity];
    if (numFields.some(field => isNaN(parseFloat(field)) ||  parseFloat(field) < 0)) {
      alert("All fields must be non-negative numerical values.");
      return;
    }

    setIsLoading(true); // Start loading
    setTimeout(() => {
      const conductivityWQI = parseFloat(conductivity) / 5 * 0.006928422;
      const nitrateWQI = parseFloat(nitrate) / 0.5 * 0.06928422;
      const temperatureWQI = parseFloat(temperature) / 0.15 * 0.2309474;
      const turbidityWQI = parseFloat(turbidity) / 0.05 * 0.6928422;
      const wqiValue = conductivityWQI + nitrateWQI + temperatureWQI + turbidityWQI;

      setWQI(wqiValue.toFixed(2));
      if (wqiValue >= 0 && wqiValue <= 25) {
        setQualityMessage("Quality of water is excellent");
      } else if (wqiValue > 25 && wqiValue <= 50) {
        setQualityMessage("Slightly polluted water");
      } else if (wqiValue > 50 && wqiValue <= 75) {
        setQualityMessage("Poor quality water, cleaning needs to be done");
      } else if (wqiValue > 75 && wqiValue <= 100) {
        setQualityMessage("Very poor water, immediate assistance is required");
      } else {
        setQualityMessage("Excessively contaminated water, authorities need to take immediate action");
      }

      setIsLoading(false); // Stop loading
    }, 2000); // Simulate delay
  };

  return (
    <div className="prediction">
      <div className="input-container">
        <h1>WQI Calculator</h1>
        <div className="input-field">
          <label htmlFor="conductivity">Conductivity (μS/cm):</label>
          <input
            type="number"
            id="conductivity"
            value={conductivity}
            onChange={(e) => setConductivity(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="nitrate">Nitrate (mg/l):</label>
          <input
            type="number"
            id="nitrate"
            value={nitrate}
            onChange={(e) => setNitrate(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="temperature">Temperature (°C):</label>
          <input
            type="number"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="turbidity">Turbidity (NTU):</label>
          <input
            type="number"
            id="turbidity"
            value={turbidity}
            onChange={(e) => setTurbidity(e.target.value)}
            min="0"
            required
          />
        </div>
        <div className="output">
          {isLoading ? (
            <div className="spinner"></div> // Spinner shown during loading
          ) : (
            <>
              <strong>WQI:</strong> {wqi}
              <br />
              <strong>Water Quality:</strong> {qualityMessage}
            </>
          )}
        </div>
        <button onClick={calculateWQI}>Predict</button>
      </div>
    </div>
  );
};

export default Predictt;