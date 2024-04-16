require("../server/node_modules/dotenv").config();
const router = require("../server/node_modules/express").Router();
const { register, getPassword, getUserID } = require("../database/auth_db");
const bcrypt = require("../server/node_modules/bcrypt");
const jwt = require("../server/node_modules/jsonwebtoken");

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      res.status(400).json({ success: false, message: "Käyttäjänimi tai salasana puuttuu." });
      return;
    }
    const pwHash = await bcrypt.hash(password, 10);
    await register(username, pwHash);
    res.json({
      success: true,
      message: "Käyttäjä rekisteröity onnistuneesti.",
    });
  } catch (error) {
    if (error.message === "Username already exists") {
      res.status(409).json({ success: false, message: "Käyttäjänimi on varattu." });
    } else if (error.message === "Username and password are required") {
      res.status(400).json({ success: false, message: "Käyttäjänimi tai salasana puuttuu." });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: "Virhe käyttäjän rekisteröinnissä" });
    }
  }
});


router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      res.status(400).json({ success: false, message: "Käyttäjänimi tai salasana puuttuu." });
      return;
    }

    const db_pass = await getPassword(username);
    const userid = await getUserID(username);

    if (!db_pass) {
      res.status(404).json({ success: false, message: "Käyttäjää ei löytynyt" });
      return;
    }

    const isAuth = await bcrypt.compare(password, db_pass);
    if (isAuth) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, jwtToken: token, userid: userid });
    } else {
      res.status(401).json({ success: false, message: "Väärä salasana" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Virhe kirjautumisessa" });
  }
});

module.exports = router;
