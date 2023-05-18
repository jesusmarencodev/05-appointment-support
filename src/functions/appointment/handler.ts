import * as AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();
export const appointmentHandler = async (event) => {
  console.log("estoy desde la lambda que ejecutara operaciones desde Appointment-Support");
  console.log(event);
  const records = event.Records;
  const listPromise = [];
  for (const record of records) {
    const body = JSON.parse(record.body);
    const id = body.detail.id;
    listPromise.push(dynamodb.update({
      TableName: "Appointment-dev",
      UpdateExpression: "set status_appointment=:status_appointment",
      ExpressionAttributeValues: {
        ":status_appointment": 3
      },
      Key: { id },
      ReturnValues: "ALL_NEW"
  
    }).promise());
  }
  const result = await Promise.all(listPromise);
  console.log("RESULT: ", result);
  return {
    statusCode: 200,
    event
  };
};
