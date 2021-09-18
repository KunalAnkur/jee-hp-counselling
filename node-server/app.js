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

const {counsellingSix} = require("./db-models/collegeData");

const {couselling_six_data} = require("../couselling_six");

const app = express();

const corsOptions = {
  origin: ['https://jee-counselling.netlify.app/', 'https://hp-jee-server.herokuapp.com/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


let dbConnector = "";
const fileName = "Counsel-six.csv";
const arrayToInsert = [];

const MONGODB_URI = process.env.DEV_DB;
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
    // addCsvDataToMongoAsJson();
  })
  .catch((err) => {
    console.log(err);
  });

async function addCsvDataToMongoAsJson() {
  // return csvtojson()
  //   .fromFile(fileName)
  //   .then((source) => {
  // Fetching the all data from each row
  const source = couselling_six_data;
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
  let collectionName = "couselling-six-second-tests";
  let collection = dbConnector.collection(collectionName);
  collection.insertMany(arrayToInsert, (err, result) => {
    if (err) console.log(err);
    if (result) {
      console.log("Import CSV into database successfully.");
    }
  });
  // });
  return;
}

app.options('*', cors(corsOptions))

app.get("/getCollegeData/:name/:email/:phone", cors(corsOptions), getCollegeData);

app.get("/getCollegeDataFiltering", cors(corsOptions), getCollegeDataFiltering);

app.get("/getData", cors(), (req,res)=>{
  counsellingSix.find({}).then((data)=>{
    // console.log(data.length)
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  })
})

app.get("*", (req, res) => {
  res.send("invalid route");
});

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static('react-client/build'));
}

app.listen(process.env.PORT, () =>
  console.log(`Server is listening at ${process.env.PORT}`)
);

// .env file
// DEV_DB = mongodb+srv://nodoubtapp:Yq6IXnYjTov2ZnQD@cluster0.k468m.mongodb.net/harshpriyam?retryWrites=true&w=majority
// PORT = 5001
