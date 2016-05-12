import { Map, fromJS } from 'immutable'

export const NOLANG = 'nolang';

export function extractLocalizedValue(lang, value, defaultValue = null) {

  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (value instanceof Map && value.has('variants')) {
    if (value.get('variants').has(lang)) {
      return value.get('variants').get(lang);
    } else if (value.get('variants').has(NOLANG)) {
      return value.get('variants').get(NOLANG);
    } else {
      // TODO: return first available value
      return defaultValue;
    }
  } else if (value.variants) {
    if (lang in value.variants) {
      return value.variants[lang];
    } else if (NOLANG in value.variants) {
      return value.variants[NOLANG];
    } else {
      // TODO: return first available value
      return defaultValue;
    }
  } else if (value instanceof String || typeof value == "string") {
    return value + '';
  } else {
    return defaultValue;
  }
}

export function normalizeLocalizedValue(value) {
  const normalizedEmpty = fromJS({ variants: {} });

  if (value === undefined || value === null) {
    return normalizedEmpty;
  } else if (value instanceof Map && value.has('variants')) {
    return value;
  } else if (value.variants) {
    return fromJS({ variants: value.variants });
  } else if (value instanceof String || typeof value == "string") {
    return fromJS({ variants: { [NOLANG]: value }});
  } else {
    return normalizedEmpty;
  }
}