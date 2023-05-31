declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    AUTH0_ID: string;
    AUTH0_SECRET: string;
    AUTH0_ISSUER: string;
    DATABASE_URL: string;
  }
}
