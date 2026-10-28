/// <reference types="vite/client" />

import 'react';
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    /** React 18 ainda não tipa `inert`. */
    inert?: '' | undefined;
  }
}
