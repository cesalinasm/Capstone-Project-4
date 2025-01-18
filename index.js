import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.openbrewerydb.org/v1/breweries"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.render("index.ejs", {time: new Date()});
});

app.post("/", async (req, res) => {
  try {
    var input_country = req.body["country-name"];
    //console.log(input_country);
    var response = await axios.get(API_URL+"/random");
    console.log(response);
    while (input_country!=response.data[0].country) {
      response = await axios.get(API_URL+"/random");
    };
    const result = response.data[0];
    res.render("index.ejs", {data: result, time: new Date()});
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});