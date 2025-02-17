import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

if (
  typeof globalThis.TextEncoder === "undefined" ||
  typeof globalThis.TextDecoder === "undefined"
) {
  globalThis.TextEncoder = TextEncoder as any;
  globalThis.TextDecoder = TextDecoder as any;
  globalThis.Uint8Array = Uint8Array;
}