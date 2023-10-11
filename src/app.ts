import express, { Express, Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Typessciprt + Node.js + Express");
});

app.post("/user/login", (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password }: { username: string; password: string } =
    req.body;
  if (username.length > 1 && username === password) {
    res.status(200).json({ accessToken: "" }).send();
  }
  res.status(401).send();
});

const port = 5001;
app.listen(port, () => {
  console.log(`[server] Example app listening at http://localhost:${port}`);
});
