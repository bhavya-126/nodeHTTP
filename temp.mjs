// const http = require("http");
// const url = require("url");
// const fs = require("node:fs");
// const getUsers = require("fs.mjs");

import http from "http";
import url from "node:url";
import fs from "node:fs";
import { getUsers, addUser } from "./fs.mjs";

let port = 9000;

const server = http.createServer((req, res) => {
  let path = url.parse(req.url);
  let requestUrl = path.pathname;
  console.log(path.pathname);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    console.log(body);
  });
  // res.writeHead(200, { "Content-Type": "application/json" });
  try {
    if (requestUrl === "/user" && req.method === "GET") {
      let user = getUsers();
      console.log(user.toString());
      
      res.write(user);
      // res.writeHead(201, "User fetched successfully.");
      // res.statusCode = 201;
      // res.statusMessage = "user fetched";
      res.end();
    } else if (requestUrl === "/user" && req.method === "POST") {
      res.on("end", () => {
        // let user = fs.readFileSync("db/user.json", "utf-8");
        // user = JSON.parse(user);
        // const bodyToPush = JSON.parse(body);

        // user.data.push(bodyToPush);
        // fs.writeFileSync("db/user.json", JSON.stringify(user));

        if (addUser(body)) {
          console.log("user added");
          res.end({
            status: 201,
            message: "User added successfully.",
          });
        } else {
          res.end({
            status: 400,
            message: "email already exists",
          });
        }

        // res.end({
        //   status: 201,
        //   message: "User added successfully.",
        // });
        // npm;
      });
    } else if ((requestUrl = "/user" && req.method === "DELETE")) {
      let id = path.query.id;
      res.end("delete");
    } else if ((requestUrl = "/user" && req.method === "PUT")) {
      res.end("path not exist");
    } else {
      res.end("path not exist");
    }
  } catch (e) {
    res.end(e.message);
  }
});

server.listen(port, () => {
  console.log(`listening at ${port}`);
});
