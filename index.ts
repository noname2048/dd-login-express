import express, { Express, Request, Response } from "express";

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typessciprt + Node.js + Express");
});

app.get("/user/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
});

app.listen(port, () => {
  console.log(`[server] Example app listening at http://localhost:${port}`);
});
