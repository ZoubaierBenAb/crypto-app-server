const mongoose = require("mongoose");
const coinSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  coin: {
    type: String,
    required: true,
  },
  bearish: {
    type: Number,
    default: 0,
  },
  bullish: {
    type: Number,
    default: 0,
  },
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
