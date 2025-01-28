const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Contact Management API',
      description: 'An API for managing contacts, including CRUD operations.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};
  
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)