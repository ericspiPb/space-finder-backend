import * as uuid from 'uuid';
import { S3 } from "aws-sdk";

const s3Client = new S3({ region: 'ap-southeast-1' });

async function handler(event: any, context: any) {
  // aws sdk v2 method
  const buckets = await s3Client.listBuckets().promise();

  console.log('log event');
  console.log(event);
  return {
    statusCode: 200,
    body: 'Here are your buckets' + JSON.stringify(buckets.Buckets),
  };

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

export { handler }
