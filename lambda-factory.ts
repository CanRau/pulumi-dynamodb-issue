import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";
const db = new DynamoDB.DocumentClient();
type Props = { tableName: string };

export const handlerFactory = ({
  tableName,
}: Props) => async (): Promise<APIGatewayProxyResult> => {
  db.get({
    TableName: tableName,
    Key: {
      pk: "pk",
      sk: "sk",
    },
  });

  return {statusCode: 200, body: "Ok"}
};