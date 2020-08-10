import * as aws from "@pulumi/aws";
import {handlerFactory} from "./lambda-factory"
import {handler} from "./lambda-handler"

const db = new aws.dynamodb.Table("table", {
  billingMode: "PROVISIONED",
  readCapacity: 2,
  writeCapacity: 1,
  hashKey: "pk",
  rangeKey: "sk",
  attributes: [
    {name: "pk", type: "S"},
    {name: "sk", type: "S"},
  ],
})

new aws.lambda.CallbackFunction(
  "lambda-callback-factory",
  {
    memorySize: 128,
    callback: handlerFactory({
      tableName: db.name.apply(s => `${s}`) as unknown as string,
    }),
  },
  {
    // dependsOn: [db] // fails with & without
  }
);

new aws.lambda.CallbackFunction(
  "lambda-callback-handler",
  {
    memorySize: 128,
    callback: handler,
  },
  {
    // dependsOn: [db] // fails with & without
  }
);