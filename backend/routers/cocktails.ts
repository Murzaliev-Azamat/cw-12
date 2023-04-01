import express from "express";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import { CocktailMutation } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import Cocktail from "../models/Cocktail";

const cocktailsRouter = express.Router();

cocktailsRouter.get("/", async (req, res, next) => {
  const user_id = req.query.user;
  try {
    if (user_id) {
      const cocktails = await Cocktail.find({ user: user_id });
      return res.send(cocktails);
    }
    const cocktails = await Cocktail.find();
    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.get("/:id", async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    return res.send(cocktail);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const ingredients = JSON.parse(req.body.ingredients);
    const cocktailData: CocktailMutation = {
      user: user._id.toString(),
      name: req.body.name,
      recipe: req.body.recipe,
      image: req.file ? req.file.filename : null,
      ingredients: ingredients,
    };

    const cocktail = new Cocktail(cocktailData);

    console.log(cocktail);

    try {
      await cocktail.save();
      return res.send(cocktail);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

cocktailsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const cocktail = await Cocktail.findOne({ _id: req.params.id });
      if (cocktail) {
        await Cocktail.updateOne(
          { _id: cocktail._id },
          { isPublished: !req.body.isPublished }
        );
        const updatedCocktail = await Cocktail.findOne({ _id: cocktail._id });
        return res.send(updatedCocktail);
      }
    } catch (e) {
      return next(e);
    }
  }
);

cocktailsRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const cocktail = await Cocktail.findOne({ _id: req.params.id });
      if (cocktail) {
        await Cocktail.deleteOne({ _id: cocktail._id });
        return res.send("Cocktail deleted");
      }
    } catch (e) {
      return next(e);
    }
  }
);

export default cocktailsRouter;
