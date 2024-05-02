import React, { useState } from "react";
import "./predict.css";
import axios from 'axios';

const Predict = () => {
  const [conductivity, setConductivity] = useState("");
  const [nitrate, setNitrate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [turbidity, setTurbidity] = useState("");
  const [wqi, setWQI] = useState("");
  const [qualityMessage, setQualityMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const isNonNegativeNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const validateInputs = () => {
    const errors = {};

    if (!isNonNegativeNumber(conductivity)) {
      errors.conductivity = "Conductivity must be a non-negative number.";
    }
    if (!isNonNegativeNumber(nitrate)) {
      errors.nitrate = "Nitrate must be a non-negative number.";
    }
    if (!isNonNegativeNumber(temperature)) {
      errors.temperature = "Temperature must be a non-negative number.";
    }
    if (!isNonNegativeNumber(turbidity)) {
      errors.turbidity = "Turbidity must be a non-negative number.";
    }

    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateWQI = async () => {
    if (!validateInputs()) {
      return;
    }
    
    try {
      const response = await axios.post('/predict', {
        Conductivity: conductivity,
        NO3: nitrate,
        Temp: temperature,
        Turbidity: turbidity
      });
      const { prediction } = response.data;
      setWQI(prediction);

      // Determine water quality message based on WQI value
      if (prediction >= 0 && prediction <= 25) {
        setQualityMessage("Quality of water is excellent");
      } else if (prediction > 25 && prediction <= 50) {
        setQualityMessage("Slightly polluted water");
      } else if (prediction > 50 && prediction <= 75) {
        setQualityMessage("Poor quality water, cleaning needs to be done");
      } else if (prediction > 75 && prediction <= 100) {
        setQualityMessage("Very poor water, immediate assistance is required");
      } else {
        setQualityMessage("Excessively contaminated water, authorities need to take immediate action");
      }
    } catch (error) {
      console.error('Error predicting WQI:', error);
    }
  };

  return (
    <div className="prediction">
      <div className="input-container">
        <div className="input-field">
          <label htmlFor="conductivity">Conductivity:</label>
          <input
            type="text"
            id="conductivity"
            value={conductivity}
            onChange={(e) => {
              setConductivity(e.target.value);
              setInputErrors({ ...inputErrors, conductivity: "" });
            }}
          />
          {inputErrors.conductivity && <span className="error">{inputErrors.conductivity}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="nitrate">Nitrate:</label>
          <input
            type="text"
            id="nitrate"
            value={nitrate}
            onChange={(e) => {
              setNitrate(e.target.value);
              setInputErrors({ ...inputErrors, nitrate: "" });
            }}
          />
          {inputErrors.nitrate && <span className="error">{inputErrors.nitrate}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="text"
            id="temperature"
            value={temperature}
            onChange={(e) => {
              setTemperature(e.target.value);
              setInputErrors({ ...inputErrors, temperature: "" });
            }}
          />
          {inputErrors.temperature && <span className="error">{inputErrors.temperature}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="turbidity">Turbidity:</label>
          <input
            type="text"
            id="turbidity"
            value={turbidity}
            onChange={(e) => {
              setTurbidity(e.target.value);
              setInputErrors({ ...inputErrors, turbidity: "" });
            }}
          />
          {inputErrors.turbidity && <span className="error">{inputErrors.turbidity}</span>}
        </div>
        <div className="output">
          {wqi && <strong>WQI:</strong>} {wqi} <br />
          {qualityMessage && <strong>Water Quality:</strong>} {qualityMessage}
        </div>
        <button onClick={calculateWQI}>Predict</button>
      </div>
    </div>
  );
};

export default Predict;














// import React, { useState } from "react";
// import "./predict.css";
// import axios from 'axios';

// const Predict = () => {
//   const [conductivity, setConductivity] = useState("");
//   const [nitrate, setNitrate] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [turbidity, setTurbidity] = useState("");
//   const [wqi, setWQI] = useState("");

//   const calculateWQI = async () => {
//     try {
//       const response = await axios.post('/predict', {
//         Conductivity: conductivity,
//         NO3: nitrate,
//         Temp: temperature,
//         Turbidity: turbidity
        
//       });
//       console.log(conductivity);
//       const { prediction } = response.data;
//       setWQI(prediction);
//     } catch (error) {
//       console.error('Error predicting WQI:', error);
//     }
//   };

//   return (
//     <div className="prediction">
//       <div className="input-container">
//         <div className="input-field">
//           <label htmlFor="conductivity">Conductivity:</label>
//           <input
//             type="text"
//             id="conductivity"
//             value={conductivity}
//             onChange={(e) => setConductivity(e.target.value)}
//           />
//         </div>
//         <div className="input-field">
//           <label htmlFor="nitrate">Nitrate:</label>
//           <input
//             type="text"
//             id="nitrate"
//             value={nitrate}
//             onChange={(e) => setNitrate(e.target.value)}
//           />
//         </div>
//         <div className="input-field">
//           <label htmlFor="temperature">Temperature:</label>
//           <input
//             type="text"
//             id="temperature"
//             value={temperature}
//             onChange={(e) => setTemperature(e.target.value)}
//           />
//         </div>
//         <div className="input-field">
//           <label htmlFor="turbidity">Turbidity:</label>
//           <input
//             type="text"
//             id="turbidity"
//             value={turbidity}
//             onChange={(e) => setTurbidity(e.target.value)}
//           />
//         </div>
//         <div className="output">
//           {wqi && <strong>WQI:</strong>} {wqi}
//         </div>
//         <button onClick={calculateWQI}>Predict</button>
//       </div>
//     </div>
//   );
// };

// export default Predict;


