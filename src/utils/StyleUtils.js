// @flow

// Remove this command if more functions are included here [MP]
/* eslint-disable import/prefer-default-export */

type Style = string | Object | typeof undefined | null;

/**
 * Merge styles in a classes names string.
 * Each style can be a string or an object. When a string, it will be just included in the result
 * string, but if an object, each key will be included if its value is true.
 * Example:
 * Calling mergeStyles('first', { second: false, third: true }, undefined, null, 'last')
 * results in "first third last".
 * @param  {...any} styles Styles to apply.
 * [MP]
 */
export function mergeStyles(...styles: Array<Style>) {
  const classNames = [];

  styles.forEach((style) => {
    if (style) {
      if (typeof style === 'string') {
        classNames.push(style);
      } else if (typeof style === 'object') {
        Object.entries(style).forEach(([key, value]) => {
          if (value) {
            classNames.push(key);
          }
        });
      }
    }
  });

  return classNames.join(' ');
}
