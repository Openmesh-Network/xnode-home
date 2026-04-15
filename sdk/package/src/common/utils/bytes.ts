export type Bytes = Uint8Array<ArrayBuffer>;
export function isBytes(value: any): value is Bytes {
  return value instanceof Uint8Array;
}
