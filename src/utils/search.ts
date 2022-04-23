import { MeiliSearch } from "meilisearch";
import * as dotenv from "dotenv";

dotenv.config();

const client = new MeiliSearch({ host: "https://search.huelet.net", apiKey: process.env.MEILISEARCH_API_KEY });

export default client;