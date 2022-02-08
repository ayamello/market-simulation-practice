import "reflect-metadata";
import app from "./app";
import connectDatabase from "./configs/database";

connectDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
