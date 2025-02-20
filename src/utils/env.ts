import { cleanEnv, num, url } from "envalid";

export const env = cleanEnv(process.env, {
	API_PORT: num({ default: 3333 }),
	POSTGRES_URL: url(),
	REDIS_URL: url(),
	WEB_URL: url(),
});
