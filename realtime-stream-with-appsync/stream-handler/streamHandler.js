'use strict';

require('isomorphic-fetch');
const AWS = require('aws-sdk')
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');

const mutation = gql(`mutation CreateOrder($input: CreateOrderInput!){
  createOrder(input: $input){
    id
    productId
    productName
    productAmount
    productPrice
    deliveryState
    deliveryAddress
    expiresAt
    createdAt
  }
}`);

exports.handler = async (event, context) => {

  const url = 'APPSYNC_ENDPOINT_URL';
  const region = 'APPSYNC_REGION';
  const authType = 'API_KEY';
  const apiKey = 'APPSYNC_API_KEY';
 
  const appSyncClient = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
      type: authType,
      apiKey: apiKey
    },
    disableOffline: true,
  });


  for(let record of event.Records) {
    let dynamoData = AWS.DynamoDB.Converter.unmarshall( record.dynamodb.NewImage );
    dynamoData.expiresAt = new Date().getTime() + 3600;
    const params = { input: dynamoData };
    console.log(params);

    try {
      await appSyncClient.mutate({
        variables: params,
        mutation: mutation
      });

      console.log("success")
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
};
