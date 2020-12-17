import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { DocumentDB, FakeDB, RDS, UserHelpRequest } from "./db";
import { HelpRequest } from "./fake-data/help-requests";
import { UserProfile } from "./fake-data/user-profiles";
import { extractPageOptions, asNumber } from "./utils";

const app = express();
const port = 3000;

const jwtCheck: express.RequestHandler = jwt({
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

const profilesFullAccess = "profiles:full-access";

/**
 * Checks if user has all permissions in parameter. If not all permissions are matched,
 * user is unauthorized.s
 * @param permissions permissions users needs to have to be authorized
 */
const permissionContains = (permissions: string[]) => (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const userPermissions: string[] = (request as any)?.user?.permissions;
  const allIncluded = permissions.reduce(
    (includeAll, p) => includeAll && userPermissions.includes(p),
    true
  );

  if (allIncluded) {
    next();
  } else {
    response.statusCode = 403;
    response.send({ error: "not enough permissions" });
  }
};

const isPremium: express.RequestHandler = permissionContains([
  profilesFullAccess,
]);

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
  async (request: express.Request, response: express.Response) => {
    // Getting value of page and limit query options:
    // ex: http://<domain>/v1/help-request?page=1&limit=10
    //  page == 1
    //  limit == 10
    try {
      const { page, limit } = extractPageOptions(request.query);

      // Query the page of help requests from the fake database
      const helpRequests: UserHelpRequest[] = await RDS.getHelpRequests(page, limit);

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

app.get(
  "/v1/permissions",
  jwtCheck,
  (request: express.Request, response: express.Response) => {
    try {
      const permissions: string[] = (request as any)?.user?.permissions || [];
      response.send(permissions);
    } catch (error) {
      console.log(error);
      response.statusCode = 500;
      response.send({ error });
    }
  }
);

app.get(
  "/v1/user-profile",
  jwtCheck,
  isPremium,
  (request: express.Request, response: express.Response): void => {
    try {
      const { page, limit } = extractPageOptions(request.query);
      const userProfiles: UserProfile[] = FakeDB.getUserProfiles(page, limit);
      response.send(userProfiles);
    } catch (e) {
      response.statusCode = 500;
      response.send({ error: e.message });
    }
  }
);

app.get(
  "/v1/comment",
  jwtCheck,
  async (request: express.Request, response: express.Response) => {
    try {
      const helpRequestId: number = asNumber(request.query, 'helpRequestId');
      const comments = await DocumentDB.getHelpRequestComments(helpRequestId);
      response.send(comments);
    } catch (e) {
      response.statusCode = 200;
      response.send([]);
    }
  }
)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
