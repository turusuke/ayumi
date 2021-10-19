import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { getDataBase } from "../../src/services/getDataBase";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST"],
  })
);

const actions = (method) => {
  return {
    GET: (async () => {
      return await getDataBase();
    })(),

    POST: {},
  }[method];
};

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);
  const result = await actions(req.method);

  console.log(result);
  res.send(result);
}
