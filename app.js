const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const {
  getCollegeData,
  getCollegeDataFiltering,
} = require("./controllers/college-data-controller");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.urlencoded({ limit: "30mb", extended: true }));

let dbConnector = "";
const fileName = "Counselling-1.csv";
const arrayToInsert = [];

const MONGODB_URI = process.env.DEV_DB
// process.env.NODE_ENV === 'production' ? process.env.PROD_DB : process.env.DEV_DB
mongoose
  .connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((client) => {
    dbConnector = client.connections[0].db;
    console.log("database is connected");
    // uncommenting this line will re-upload data to db
    // addCsvDataToMongoAsJson()
  })
  .catch((err) => {
    console.log(err);
  });

async function addCsvDataToMongoAsJson() {
  return csvtojson()
    .fromFile(fileName)
    .then((source) => {
      // Fetching the all data from each row
      for (let i = 0; i < source.length; i++) {
        let oneRow = {
          institute: source[i]["Institute"],
          academic_program_name: source[i]["Academic Program Name"],
          quota: source[i]["Quota"],
          seat_type: source[i]["Seat Type"],
          gender: source[i]["Gender"],
          opening_rank: source[i]["Opening Rank"],
          closing_rank: source[i]["Closing Rank"],
        };
        arrayToInsert.push(oneRow);
      }
      //inserting into the table “employees”
      let collectionName = "college-datas";
      let collection = dbConnector.collection(collectionName);
      collection.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log("Import CSV into database successfully.");
        }
      });
    });
}

app.get("/getCollegeData/:name/:email/:phone", getCollegeData);

app.get("/getCollegeDataFiltering", getCollegeDataFiltering);

app.get("*", (req, res) => {
  res.send("invalid route");
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening at ${process.env.PORT}`)
);

// .env file
// DEV_DB = mongodb+srv://nodoubtapp:Yq6IXnYjTov2ZnQD@cluster0.k468m.mongodb.net/harshpriyam?retryWrites=true&w=majority
// PORT = 5001
