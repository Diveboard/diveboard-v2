
var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()


exports.handler = async (event, context) => {
    const date = new Date();

    const tableName = 'User-lrs6jpz6czbldkwriyfgq5oahi-dev';
    const region = 'us-east-1'

    aws.config.update({region});

    if (!event.request.userAttributes.sub) {
        console.log("Error: Nothing was written to DDB or SQS");
        return context.done(null, event);
    }

    const ddbParams = {
        TableName: tableName,
        Item: {
            'id': {S: event.request.userAttributes.sub},
            '__typename': {S: 'User'}, 'username': {S: event.userName},
            'email': {S: event.request.userAttributes.email},
            'createdAt': {S: date.toISOString()},
            'updatedAt': {S: date.toISOString()},
        }
    };

    try {
        ddbResult = await ddb.putItem(ddbParams).promise();
        console.log("Success");
    } catch (err) {
        console.log("Error", err);
    }

    console.log("Success: Everything executed correctly")
    context.done(null, event);
}
