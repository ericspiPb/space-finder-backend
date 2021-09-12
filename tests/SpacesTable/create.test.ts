import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/create';

const event = {
  body: {
    name: 'paris',
  },
} as unknown as APIGatewayProxyEvent;

handler(event, {} as Context);
