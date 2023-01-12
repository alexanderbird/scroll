import { Verse } from 'api-sdk/glossary/Verse';

export function serialize(verse: Verse): string {
  const json = JSON.stringify({ ...verse, selected: undefined });
  try {
    return btoa(encodeURIComponent(json));
  } catch(e) {
    throw new Error('Failed to encode verse: ' + json + '\n' + e.message);
  }
}

export function deserialize(text: string): Verse {
  try {
    const encoded = atob(text);
    const json = decodeURIComponent(encoded);
    return JSON.parse(json);
  } catch(e) {
    throw new Error("Failed to deserialize. '" + text + "'\n" + e);
  }
}
