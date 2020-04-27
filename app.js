const express = require("express");
const mongoose = require("mongoose");

const httpLogger = require("./middleware/http-logger");
const logger = require("./utils/logger");

const usersRoutes = require("./routes/usersRoutes");
const HttpError = require("./models/http-error");

const PORT = process.env.PoRt || 5004;

const app = express();

// Parse json body
app.use(express.json());

// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

// Main routes
app.use("/api/users", usersRoutes);

// Handle not found routes
app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

// Delete uploaded file if creating item fails
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

// Connect to db
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => app.listen(PORT, logger.info(`running on PORT ${PORT}`)))
  .catch(error => logger.error(error));
