const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Book Management API',
      description: 'An API for managing books, including CRUD operations.',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};
  
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)