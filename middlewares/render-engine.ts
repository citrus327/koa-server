import { VIEWS_PATH } from "@config/server";
import views from "koa-views";

const renderEngine = views(VIEWS_PATH, {
  extension: "html",
  map: {
    html: "mustache",
  },
});

export { renderEngine };
