import { IAPI } from "./types";

let Service: IAPI;
if (process.env.REACT_APP_WHOAMI === "frontend") {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	Service = require("./api-frontend").default as IAPI;
} else {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	Service = require("./api-fullstack").default as IAPI;
}

export default Service;
