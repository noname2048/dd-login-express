import express, { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secretKey = "secretKey";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Typessciprt + Node.js + Express");
});

app.post("/user/login", (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;
  if (username.length > 1 && username === password) {
    const refreshToken = jwt.sign({ username }, secretKey, {
      expiresIn: "3m",
    });
    res
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .json({ message: "Login success" })
      .send();
  } else {
    res.status(401).json({ message: "username and password mismatch" }).send();
  }
});

app.get("/user/accessToken", (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.status(401).json({ message: "RefreshToken not found" }).send();
  }
  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const { username } = decoded as { username: string };
    res.status(200).json({ username }).send();
  } catch (err) {
    res.status(401).json({ message: "RefreshToken cannot verified" }).send();
  }
});

const port = 5001;
app.listen(port, () => {
  console.log(`[server] Example app listening at http://localhost:${port}`);
});
