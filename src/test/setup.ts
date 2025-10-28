import "@testing-library/jest-dom";

// Polyfills for Node.js environment
import { TextEncoder, TextDecoder } from "util";

// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock URL constructor for webidl-conversions
if (typeof URL === "undefined") {
  // @ts-ignore
  global.URL = class URL {
    constructor(url: string, base?: string) {
      // Simple URL mock
      this.href = url;
      this.origin = "";
      this.protocol = "";
      this.host = "";
      this.hostname = "";
      this.port = "";
      this.pathname = "";
      this.search = "";
      this.hash = "";
    }
    href: string;
    origin: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  };
}

// Mock URLSearchParams
if (typeof URLSearchParams === "undefined") {
  // @ts-ignore
  global.URLSearchParams = class URLSearchParams {
    constructor(init?: string | string[][] | Record<string, string>) {
      this.params = new Map();
      if (init) {
        if (typeof init === "string") {
          // Simple parsing
          init.split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            if (key) this.params.set(key, value || "");
          });
        }
      }
    }
    private params: Map<string, string>;
    get(name: string) {
      return this.params.get(name) || null;
    }
    set(name: string, value: string) {
      this.params.set(name, value);
    }
    has(name: string) {
      return this.params.has(name);
    }
    delete(name: string) {
      this.params.delete(name);
    }
    toString() {
      return Array.from(this.params.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    }
  };
}
