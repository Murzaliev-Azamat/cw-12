import crypto from "crypto";
import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("cocktails");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [azamat, adilet] = await User.create(
    {
      username: "Azamat",
      password: "12345",
      displayName: "Aza",
      token: crypto.randomUUID(),
    },
    {
      username: "Adilet",
      password: "333",
      displayName: "Adik",
      token: crypto.randomUUID(),
      role: "admin",
    }
  );

  await Cocktail.create(
    {
      user: adilet._id,
      name: "Long Island",
      image: "fixtures/long.jpeg",
      recipe: "about recipe",
      ingredients: [
        {
          name: "white rum",
          amount: "10ml",
        },
        {
          name: "tequila",
          amount: "50ml",
        },
      ],
    },
    {
      user: azamat._id,
      name: "Mary",
      image: "fixtures/mary.jpeg",
      recipe: "about recipe",
      ingredients: [
        {
          name: "water",
          amount: "1 bottle",
        },
        {
          name: "yellow lemon",
          amount: "2 slice",
        },
      ],
    }
  );

  await db.close();
};

void run();
