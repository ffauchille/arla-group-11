import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { FakeDB } from "./db";
import { HelpRequest } from "./fake-data/help-requests";
import { extractPageOptions } from "./utils";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

const app = express();
const port = 3000;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://arlaide-group-11.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://api.groupe11.arla-sigl.fr",
  issuer: "https://arlaide-group-11.eu.auth0.com/",
  algorithms: ["RS256"],
});

// Setting up CORS; allowing every domains as origin
// This part should be replace once we know which client
// domains are allowed to query the API.
app.use(
  cors({
    origin: "*",
  })
);
// Parsing the request to a JSON for us
app.use(bodyParser.json());

app.get(
  "/v1/help-request",
  jwtCheck,
  (request: express.Request, response: express.Response): void => {
    // Getting value of page and limit query options:
    // ex: http://<domain>/v1/help-request?page=1&limit=10
    //  page == 1
    //  limit == 10
    try {
      const { page, limit } = extractPageOptions(request);

      // Query the page of help requests from the fake database
      const helpRequests: HelpRequest[] = FakeDB.getHelpRequest(page, limit);

      // sends the response back to the client, when node will be ready!
      response.send(helpRequests);
    } catch (e) {
      // Something went wrong internally to the API,
      // so we are returning a 500 HTTP status
      response.statusCode = 500;
      response.send({ error: e.message });
    }
  }
);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
