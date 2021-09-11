import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult, APIGatewayProxyEventQueryStringParameters } from "aws-lambda";

const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;
const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from DynamoDb',
  }

  try {
    if (event.queryStringParameters) {
      if (PRIMARY_KEY! in event.queryStringParameters) {
        result.body = await queryWithPrimaryParition(event.queryStringParameters);
      } else {
        result.body = await queryWithSecondaryParition(event.queryStringParameters);
      }
    } else {
      result.body = await scanTable();
    }
  } catch (error: any) {
    result.body = error.message;
  }

  return result;
}

async function queryWithPrimaryParition(queryParams: APIGatewayProxyEventQueryStringParameters) {
  const keyValue = queryParams[PRIMARY_KEY!];
  const queryResponse = await dbClient.query({
    TableName: TABLE_NAME!,
    KeyConditionExpression: '#a = :b',
    ExpressionAttributeNames: {
      '#a': PRIMARY_KEY!,
    },
    ExpressionAttributeValues: {
      ':b': keyValue,
    },
  }).promise();

  return JSON.stringify(queryResponse);
}

async function queryWithSecondaryParition(queryParams: APIGatewayProxyEventQueryStringParameters) {
  const queryKey = Object.keys(queryParams)[0];
  const queryValue = queryParams[queryKey];

  const queryResponse = await dbClient.query({
    TableName: TABLE_NAME!,
    IndexName: queryKey,
    KeyConditionExpression: '#a = :b',
    ExpressionAttributeNames: {
      '#a': queryKey,
    },
    ExpressionAttributeValues: {
      ':b': queryValue,
    },
  }).promise();

  return JSON.stringify(queryResponse);
}

async function scanTable() {
  const queryResponse = await dbClient.scan({
    TableName: TABLE_NAME!,
  }).promise();

  return JSON.stringify(queryResponse);
}

export {
  handler
}
