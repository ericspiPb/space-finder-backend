import * as uuid from 'uuid';

async function handler(event: any, context: any) {
  return {
    statusCode: 20,
    body: 'Hello from lambda!' + uuid.v4(),
  };
}

export { handler }
