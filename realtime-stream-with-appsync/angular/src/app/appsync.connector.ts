import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'

export class AppSyncClientConnector {

    private static appSyncClient: any;

    private constructor() {}

    public static getInstance() {
        if( this.appSyncClient == null ) {
            this.appSyncClient = new AWSAppSyncClient({
                url: 'APPSYNC_ENDPOINT_URL',
                region: 'APPSYNC_REGION',
                auth: {
                  type: AUTH_TYPE.API_KEY,
                  apiKey: 'APPSYNC_API_KEY',
                }
            });        
        }

        return this.appSyncClient;
    }
}