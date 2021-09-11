import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/read';

const event = {
  queryStringParameters: {
    spaceId: '023669d0-2141-4b49-8811-ffac4b96226d',
  },
} as unknown as APIGatewayProxyEvent

handler(event, {} as Context).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
});

const locEvent = {
  queryStringParameters: {
    location: 'London',
  },
} as unknown as APIGatewayProxyEvent

handler(locEvent, {} as Context).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
});
