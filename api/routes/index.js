const actionRoutes = require("./actions/actionRouter");
const projectRoutes = require("./projects/projectRouter");

module.exports = server => {
  server.use("/api/actions", actionRoutes);
  server.use("/api/projects", projectRoutes);
};