import * as uuid from 'uuid';
import { S3 } from "aws-sdk";
import { APIGatewayProxyEvent } from 'aws-lambda';

const s3Client = new S3({ region: 'ap-southeast-1' });

async function handler(event: any, context: any) {
  // aws sdk v2 method
  const buckets = await s3Client.listBuckets().promise();

  if (isAuthorized(event)) {
    return {
      statusCode: 200,
      body: 'You are authorized',
    }
  } else {
    return {
      statusCode: 200,
      body: 'You are NOT authorized',
    }
  }

  // aws sdk v3 method
  /*
  try {
    const buckets = await s3Client.send(new ListBucketsCommand({}));

    console.log('log event');
    console.log(event);
    return {
      statusCode: 200,
      body: 'Here are your buckets' + JSON.stringify(buckets.Buckets),
    };
  } catch(error: any) {
    console.log(error.stack);
  }

  return {
    StatusCode: 400,
    body: 'hello world',
  };
  */
}

function isAuthorized(event: APIGatewayProxyEvent): boolean {
  const groups = event.requestContext.authorizer?.claims['cognito:groups'];
  if (groups) {
    return (groups as string).includes('admins')
  } else {
    return false
  }
}

export { handler }
