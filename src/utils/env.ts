import { cleanEnv, str, num } from "envalid";

export const env = cleanEnv(process.env, {
	API_PORT: num({ default: 3333 }),
});
