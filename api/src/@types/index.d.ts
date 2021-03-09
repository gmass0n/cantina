/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    APP_API_URL: string;
    PORT: number;
  }
}
