import React, { useState, useEffect } from 'react';

function DropdownMenu() {
  const [selectedSoil, setSelectedSoil] = useState('clay');
  const [recommendedDuration, setRecommendedDuration] = useState('short');
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('254757450716'); // Replace with your phone number
  const [messageSent, setMessageSent] = useState(false);

  const handleSoilChange = (event) => {
    setSelectedSoil(event.target.value);
  };

  const handleCropSelection = (event) => {
    setSelectedCrop(event.target.value);
  };

  const constructMessage = () => {
    // Create the SMS message with the selected options
    return `Recommended crop for ${selectedSoil} soil and ${recommendedDuration} duration: ${selectedCrop}`;
  };

  const handleSendMessage = () => {
    const message = constructMessage();

    // Create the SMS link to open the SMS app with the predefined message
    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
    setMessageSent(true);
  };

  const getDurationRecommendations = (soil) => {
    // Define recommended durations based on the selected soil
    const durationRecommendations = {
      clay: 'short',
      silt: 'medium',
      sand: 'short',
      loam: 'medium',
    };

    setRecommendedDuration(durationRecommendations[soil] || 'short');
  };

  const getCropRecommendations = (soil, duration) => {
    // Define crop recommendations based on the selected soil and duration
    const recommendations = {
      clay: {
        short: ['Tomatoes', 'Potatoes', 'Cabbage'],
        medium: ['Zucchini', 'Pumpkins', 'Peppers'],
        long: ['Squash', 'Watermelons', 'Cantaloupes'],
      },
      silt: {
        short: ['Beans', 'Peas', 'Broccoli'],
        medium: ['Cauliflower', 'Kale', 'Spinach'],
        long: ['Cucumbers', 'Peppers', 'Eggplants'],
      },
      sand: {
        short: ['Carrots', 'Radishes', 'Cucumbers'],
        medium: ['Corn', 'Strawberries', 'Tomatoes'],
        long: ['Squash', 'Watermelons', 'Cantaloupes'],
      },
      loam: {
        short: ['Lettuce', 'Spinach', 'Kale'],
        medium: ['Corn', 'Pumpkins', 'Carrots'],
        long: ['Cabbage', 'Broccoli', 'Cauliflower'],
      },
    };

    const recommended = recommendations[selectedSoil] || {};
    setRecommendedCrops(recommended[recommendedDuration] || []);
  };

  useEffect(() => {
    getDurationRecommendations(selectedSoil);
  }, [selectedSoil]);

  useEffect(() => {
    getCropRecommendations(selectedSoil, recommendedDuration);
  }, [selectedSoil, recommendedDuration]);

  return (
    <div>
      <h1>Select Soil Type and Duration</h1>

      <label htmlFor="soilSelect">Soil:</label>
      <select id="soilSelect" value={selectedSoil} onChange={handleSoilChange}>
        <option value="clay">Clay</option>
        <option value="silt">Silt</option>
        <option value="sand">Sand</option>
        <option value="loam">Loam</option>
      </select>

      <br /><br />

      <h2>Recommended Duration for {selectedSoil} Soil: {recommendedDuration}</h2>

      <br /><br />

      <h2>Recommended Crops for {selectedSoil} Soil and {recommendedDuration} Duration:</h2>
      <select value={selectedCrop} onChange={handleCropSelection}>
        <option value="">Select a crop</option>
        {recommendedCrops.map((crop, index) => (
          <option key={index} value={crop}>{crop}</option>
        ))}
      </select>

      <br /><br />

      <button onClick={handleSendMessage}>Send SMS</button>
      {messageSent && <p>Message sent to {phoneNumber}</p>}
    </div>
  );
}

export default DropdownMenu;
