const { expect } = require("chai");
const request = require("supertest");
const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const config = require("../config/config.json");

const app = express();
require("dotenv").config();

const sequelize = new Sequelize(config.test);

const User = require("../models/user")(sequelize, DataTypes);

app.use(express.json());

app.post("/updateBalance", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await sequelize.transaction(async (t) => {
      if (user.balance - amount < 0) {
        throw new Error("Insufficient funds");
      }

      user.balance -= amount;
      await user.save({ transaction: t });
    });

    return res.status(200).json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
});

before(async () => {
  await sequelize.sync({ force: true });
  await User.create();
});

describe("updateBalance route", () => {
  it("should update balance successfully", (done) => {
    request(app)
      .post("/updateBalance")
      .send({ userId: 1, amount: 2 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Balance updated successfully");
        done();
      });
  });

  it('should return "User not found" for non-existent user', (done) => {
    request(app)
      .post("/updateBalance")
      .send({ userId: 8, amount: 2 })
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).to.equal("User not found");
        done();
      });
  });

  it('should return "Insufficient funds" for insufficient balance', (done) => {
    request(app)
      .post("/updateBalance")
      .send({ userId: 1, amount: 11000 })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).to.equal("Insufficient funds");
        done();
      });
  });
});
