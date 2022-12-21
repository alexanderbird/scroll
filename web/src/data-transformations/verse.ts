import { Verse } from 'api-sdk/glossary/Verse';

export function serialize(verse: Verse): string {
  const json = JSON.stringify(verse);
  try {
    return btoa(encodeURIComponent(json));
  } catch(e) {
    throw new Error('Failed to encode verse: ' + json + '\n' + e.message);
  }
}

export function deserialize(text: string): Verse {
  const json = decodeURIComponent(atob(text));
  return JSON.parse(json);
}
