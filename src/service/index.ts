import { IAPI } from "./types";

let Service: IAPI;

Service = require("./todo.service").default as IAPI;

export default Service;
