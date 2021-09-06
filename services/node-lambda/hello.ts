import * as uuid from 'uuid';

async function handler(event: any, context: any) {
  console.log('log event');
  console.log(event);
  return {
    statusCode: 200,
    body: 'Hello from lambda!' + uuid.v4(),
  };
}

export { handler }
