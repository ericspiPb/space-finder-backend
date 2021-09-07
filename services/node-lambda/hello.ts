import * as uuid from 'uuid';
import { S3Client } from "@aws-sdk/client-s3";
import { ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: 'ap-east-1' });

async function handler(event: any, context: any) {
  const buckets = await s3Client.send(new ListBucketsCommand({}));

  console.log('log event');
  console.log(event);
  return {
    statusCode: 200,
    body: 'Here are your buckets' + JSON.stringify(buckets.Buckets),
  };
}

export { handler }
