import { createClient } from "redis";

const redisUrl = "redis://127.0.0.1:6379";
const client = createClient(redisUrl);
console.log("isOpen: ", client.isOpen);
client.connect();
client.on("error", (err) => console.log("Redis Client Error", err));

export { client as Client };
