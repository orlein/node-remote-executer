const express = require("express");
// const Helm = require("node-helm").Helm;
const { exec } = require("child_process");

// let helmBinary = "/usr/local/bin/helm"; // 알아서 잘 설정

// const helm = Promise.promisifyAll(new Helm({ helmCommand: helmBinary }));

const app = express();

app.use(express.json()); //Used to parse JSON bodies

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { yield: "hello" });
});

app.post("/api/v1/cli", async (req, res) => {
  const command = req.body.command;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.send({ result: error });
      return;
    }
    if (stderr) {
      res.send({ result: stderr });
      return;
    }
    res.send({ result: stdout });
    return;
  });
});

app.use(express.static("public"));

const port = 3000;

app.listen(port);
