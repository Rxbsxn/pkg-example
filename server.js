const express = require("express");
const mongoose = require("mongoose");
const User = require('./user')
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.post("/add_user", async (request, response) => {
	const user = new User(request.body);

	try {
		await user.save();
		response.send(user);
	} catch (error) {
		response.status(500).send(error);
	}
});


app.get("/users", async (request, response) => {
  const users = await User.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
