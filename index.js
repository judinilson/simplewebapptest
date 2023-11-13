require("dotenv").config();
const express = require("express");
const config = require("./config/config.json");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const sequelize = new Sequelize(config.development);
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = require("./models/user")(sequelize, DataTypes);

app.use(express.json());

// Route to update user balance
app.post("/updateBalance", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.balance - amount < 0) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    user.balance -= amount;
    await user.save();

    return res.status(200).json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
});
sequelize.sync({ force: true }).then(async () => {
  // Add one user with a balance of 10000
  await User.create();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
