require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const passportSetup = require("..oauthserver/passport")
const cookieSession = require("cookie-session");
const passportStrategy = require("../oauthserver/passport");

const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["Nelson"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize())
app.use(passport.session())

app.use(
    cors({
        origin: "http://localhost:5000",
        methods: "GET,POST,PUT,DELETE",
        credentials:true,
    })
);
app.use("/", authRoute)
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}`))