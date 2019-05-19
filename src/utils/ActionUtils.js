/* eslint-disable import/prefer-default-export */
/* @flow */

import type { AxiosError } from 'axios';

type ErrorObject = { error: string };
type ErrorMap = { [key: string]: ErrorObject };
type StringErrorMap = { [key: string]: string };

const createError = (error: string): ErrorObject => ({ error });

const MESSAGE_TIMEOUT_ERROR = createError('Request timeout. Check your connection.');
const MESSAGE_UNKNOWN_REQUEST_ERROR = createError('An unknown error happened.');
const MESSAGE_UNKNOWN_ERROR = createError('Couldn\'t reach the server. Check your connection.');

const ERROR_STATUS_MAP: ErrorMap = {
  '408': MESSAGE_TIMEOUT_ERROR,
};

const ERROR_CODE_MAP: ErrorMap = {
  ECONNABORTED: MESSAGE_TIMEOUT_ERROR,
  ETIMEDOUT: MESSAGE_TIMEOUT_ERROR,
};

/**
 * Creates an error parser.
 * @param {Object} customErrorStatusMap Map of status code to error message.
 * @returns {Object} The error payload.
 */
export function errorParser(customErrorStatusMap?: StringErrorMap) {
  const errorStatusMap: ErrorMap = { ...ERROR_STATUS_MAP };

  if (customErrorStatusMap !== undefined) {
    // This is needed because flow can not recognize customErrorStatusMap as StringErrorMap and not
    // as ?StringErrorMap, causing an error when trying to access any element with a key from the
    // Object.keys call
    const errorMap: StringErrorMap = customErrorStatusMap;

    Object.keys(errorMap).forEach((key: string) => {
      errorStatusMap[key] = createError(errorMap[key]);
    });
  }

  return (error: AxiosError) => {
    // Request errors
    if (error.response) {
      const { data, status } = error.response;

      // Server mapped errors
      if (data && data.message) {
        const dot = !data.message.endsWith('.') ? '.' : '';
        return createError(`${data.message}${dot}`);
      }

      // Default and client mapped errors
      if (errorStatusMap[status]) {
        return errorStatusMap[status];
      }

      // Unknown request error
      return MESSAGE_UNKNOWN_REQUEST_ERROR;
    }

    if (error.request) {
      // Connection errors
      if (ERROR_CODE_MAP[error.code]) {
        return ERROR_CODE_MAP;
      }

      // Unknown errors that should never happen
      // Logging to ease debugging
      // eslint-disable-next-line no-console
      console.error(error);

      return MESSAGE_UNKNOWN_ERROR;
    }

    throw error;
  };
}
