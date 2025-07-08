import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://api.adviceslip.com/advice");
    console.log();
    res.render("index", {
      id: result.data.slip.id,
      advice: result.data.slip.advice,
    });
  } catch (error) {
    res.status(500).send("Error fetching advice");
  }
});

export default app;
