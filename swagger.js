const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users Api",
    description: "Users Api",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./routes/usersRoutes.js",
  "./routes/bookingsRoutes.js",
  "./routes/destinationsRoutes.js",
  "./server.js",
];

//This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
