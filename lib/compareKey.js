import SafeCompare from "safe-compare";

/**
 * @returns {boolean}
 */
export function compareKey(apiKey) {
  return SafeCompare(apiKey, process.env.API_KEY);
}
