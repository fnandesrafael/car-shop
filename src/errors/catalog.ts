export enum ErrorTypes {
  DocumentNotFound = 'DocumentNotFound',
  InvalidMongoId = 'InvalidMongoId',
  EmptyBody = 'EmptyBody',
}

type ErrorResponse = {
  error: string,
  statusCode: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse
};

export const errorCatalog: ErrorCatalog = {
  DocumentNotFound: {
    error: 'Object not found',
    statusCode: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    statusCode: 400,
  },
  EmptyBody: {
    error: 'Request body cannot be empty',
    statusCode: 400,
  },
};
