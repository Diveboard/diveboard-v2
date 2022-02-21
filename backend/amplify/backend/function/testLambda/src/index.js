// var aws = require('aws-sdk')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// exports.handler = async event => {
//
//   const region = 'us-east-1'
//   aws.config.update({region});
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   event.Records.forEach(record => {
//     console.log(record.eventID);
//     console.log(record.eventName);
//     console.log('DynamoDB Record: %j', record.dynamodb);
//   });
//   return 'Successfully processed DynamoDB record';
// };
//

// 1. Define and configure packages.
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
// 2. Lambda start

exports.handler = async (event, context) => {
  console.log("Processing event: %j", event);
  //3. Set our constants
  const region = 'us-east-1'

  AWS.config.update({region});

  const POSTTABLE = "Post-lrs6jpz6czbldkwriyfgq5oahi-dev";
  const IndexName = "findTitle";
  //4. Get the title from the event
  const title = event.request.validationData.title
  console.log("username from event: " + title);

  //5. Construct the parameters for our query
  const queryParams = {
    TableName: POSTTABLE,
    IndexName: IndexName,
    KeyConditionExpression: "title = :title",
    ExpressionAttributeValues: {
      ":title": title
    }
  };
  try {
    //6. Check if title exists
    const res = await dynamo.query(queryParams).promise();


    if (res.Count > 0 && res.Items[0].id !== event.identity.sub) {
      throw "Title already exists!";
    }
    //8. Title doesn't exist!
    context.done(null, event);
  } catch (error) {
    //9. Handle errors
    console.log("Error!: " + error);
    return context.done(error, event)
  }
};
