import { APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/create';

const event = {
  body: `{ "location": "Paris" }`,
} as APIGatewayProxyEvent;

handler(event, {} as Context);
