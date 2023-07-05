const axios = require("axios");
const Coin = require("../models/coinModel");
const asyncHandler = require("express-async-handler");

const fetchCoins = asyncHandler(async () => {
  
  const existingCoinsCount = await Coin.countDocuments();
  if (existingCoinsCount > 0) {
    console.log("Coins already exist in the database.");
    return; 
  }

  const response = await axios.get("https://api.coingecko.com/api/v3/coins/list");
  const coins = response.data;

  coins.forEach(async (coin) => {
    await Coin.create({
      _id: coin.id,
      coin: coin.id,
    });
  });

  console.log("Cryptos saved.");
});

module.exports = fetchCoins;
