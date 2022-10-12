const errorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    statusCode: 400,
  },
  DocumentNotFound: {
    message: 'Object not found',
    statusCode: 404,
  },
  EmptyBody: {
    message: 'Request body cannot be empty',
    statusCode: 400,
  },
};

export default errorCatalog;