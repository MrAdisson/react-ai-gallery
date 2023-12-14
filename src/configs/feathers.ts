// IMPORT FEATHERS CLIENT / REST ETC
import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

// CONFIGURE FEATHERS
const feathersClient = feathers();

// CONFIGURE REST CLIENT
const restClient = rest("http://localhost:3030");

// CONFIGURE AUTHENTICATION
feathersClient.configure(restClient.axios(axios));

feathersClient.configure(
  auth({
    storage: window.localStorage,
    storageKey: "feathers-react-jwt",
  })
);
export default feathersClient;
