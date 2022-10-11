export enum ErrorTypes {
  DocumentNotFound = 'DocumentNotFound',
  InvalidMongoId = 'InvalidMongoId',
  EmptyBody = 'EmptyBody',
}

type ErrorResponse = {
  message: string,
  statusCode: number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse
};

export const errorCatalog: ErrorCatalog = {
  DocumentNotFound: {
    message: 'Document not found',
    statusCode: 404,
  },
  InvalidMongoId: {
    message: 'Invalid id was provided or item was not found',
    statusCode: 400,
  },
  EmptyBody: {
    message: 'Request body cannot be empty',
    statusCode: 400,
  },
};
