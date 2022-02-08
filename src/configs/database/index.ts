import { createConnection } from "typeorm";

const connectDatabase = async () => {
  await createConnection().then(() => {
    console.log("Database Connected");
  });
};

export default connectDatabase;
