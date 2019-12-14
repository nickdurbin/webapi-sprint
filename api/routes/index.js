const actionsRoutes = require("./projects/projectsRouter");
const projectsRoutes = require("./actions/actionsRouter");

module.exports = server => {
  server.use("/api/actions", actionsRoutes);
  server.use("/api/projects", projectsRoutes);
};