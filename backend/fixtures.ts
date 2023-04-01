import crypto from "crypto";
import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Photo from "./models/Photo";

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("photos");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [azamat, victor, adilet] = await User.create(
    {
      username: "Azamat",
      password: "12345",
      displayName: "Aza",
      token: crypto.randomUUID(),
    },
    {
      username: "Victor",
      password: "12345",
      displayName: "Victor",
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

  await Photo.create(
    {
      user: adilet._id,
      name: "House",
      image: "fixtures/house.jpeg",
    },
    {
      user: adilet._id,
      name: "Tree",
      image: "fixtures/tree.jpeg",
    },
    {
      user: azamat._id,
      name: "Car",
      image: "fixtures/car.jpeg",
    },
    {
      user: azamat._id,
      name: "Book",
      image: "fixtures/book.jpeg",
    },
    {
      user: victor._id,
      name: "Notebook",
      image: "fixtures/notebook.jpeg",
    },
    {
      user: victor._id,
      name: "Phone",
      image: "fixtures/phone.jpeg",
    }
  );

  await db.close();
};

void run();
