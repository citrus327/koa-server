import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const HTTP_PORT = 3000;
export const HTTPS_PORT = HTTP_PORT + 1;
export const ASSETS_PUBLIC_PATH = "/assets";
export const VIEWS_PATH = path.resolve(__dirname, "../views");
