import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/delete';

const event = {
  queryStringParameters: {
    spaceId: 'a552a2be-1c3f-4b9d-ba74-c1df51146a9b',
  },
} as unknown as APIGatewayProxyEvent

handler(event, {} as Context).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
});
