import path from "node:path";

export const HTTP_PORT = 3000;
export const HTTPS_PORT = HTTP_PORT + 1;
export const ASSETS_PUBLIC_PATH = "/assets";
export const VIEWS_PATH = path.resolve(__dirname, "../views");
