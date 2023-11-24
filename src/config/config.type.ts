export type AppConfig = {
    nodeEnv: string;
    name: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
    fallbackLanguage: string;
    headerLanguage: string;
  };
  
  export type DatabaseConfig = {
    db_host: string;
    db_port: string;
    db_username: string;
    db_passwd: string;
    db_database: string;
  };
  
  export type AllConfigType = {
    app: AppConfig;
    db: DatabaseConfig;
  };
  