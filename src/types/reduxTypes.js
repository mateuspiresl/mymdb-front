/* @flow */

export type Action = {
  type: string,
  payload?: any,
};

export type Dispatch = Action => void;
