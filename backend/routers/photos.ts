import express from "express";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import { PhotoMutation } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import Photo from "../models/Photo";

const photosRouter = express.Router();

photosRouter.get("/", async (req, res, next) => {
  const user_id = req.query.user;
  try {
    if (user_id) {
      const photos = await Photo.find({ user: user_id }).populate("user");
      return res.send(photos);
    }
    const photos = await Photo.find().populate("user");
    return res.send(photos);
  } catch (e) {
    return next(e);
  }
});

photosRouter.get("/:id", async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    return res.send(photo);
  } catch (e) {
    return next(e);
  }
});

photosRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    const photoData: PhotoMutation = {
      user: user._id.toString(),
      name: req.body.name,
      image: req.file ? req.file.filename : null,
    };

    const photo = new Photo(photoData);

    try {
      await photo.save();
      return res.send(photo);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

photosRouter.delete(
  "/:id",
  auth,
  permit("admin", "user"),
  async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
      const photo = await Photo.findOne({ _id: req.params.id });
      if (photo) {
        if (
          user.role === "admin" ||
          photo.user.toString() === user._id.toString()
        ) {
          await Photo.deleteOne({ _id: photo._id });
          return res.send("Photo deleted");
        } else {
          return res.status(403).send("Вы не можете удалить чужое фото!");
        }
      }
    } catch (e) {
      return next(e);
    }
  }
);

export default photosRouter;
