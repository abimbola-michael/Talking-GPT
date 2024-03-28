#!/usr/bin/node

import cors from "cors";
import express from "express";
import morgan from "morgan";
import httpStatusCode from "http-status-codes";
import path from "path";
import ApiRoutes from "../routes";
import ApiError, { errorResponse } from "../middleware/error";

const logger = morgan("combined");

export default function setUpApp(app) {
  app.use(express.json());
  app.use(logger);
  app.use(cors());
  app.use("/api/v1", ApiRoutes.apiRoutes);
  app.use("/api/v1", ApiRoutes.authRoutes);
  app.use("/api/v1", ApiRoutes.userRoutes);
  app.use("/api/v1", ApiRoutes.categoryRouter);
  app.use("/api/v1", ApiRoutes.chatRoutes);
  app.all("*", (req, res, next) => {
    errorResponse(
      new ApiError(httpStatusCode.NOT_FOUND, "Not found"),
      req,
      res,
      next
    );
  });
  app.use(errorResponse);
}
