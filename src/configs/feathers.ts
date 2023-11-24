// IMPORT FEATHERS CLIENT / REST ETC
import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

// CONFIGURE FEATHERS
const feathersClient = feathers();

// CHECK IF VITE is --host mode

// CONFIGURE REST CLIENT
const restClient = rest("http://192.168.1.32:3030");

// CONFIGURE AUTHENTICATION
feathersClient.configure(restClient.axios(axios));

feathersClient.configure(
  auth({
    storage: window.localStorage,
    storageKey: "feathers-react-jwt",
  })
);
export default feathersClient;
