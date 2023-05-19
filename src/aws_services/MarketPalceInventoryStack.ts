import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';

export class MarketPalceInventoryStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // SQS Queue
        const queue = new sqs.Queue(this, 'InventoryQueue', {
            queueName: 'InventoryQueue',
            visibilityTimeout: cdk.Duration.seconds(30)
        });

        // Lambda Function
        const lambdaFn = new lambda.Function(this, 'ProductLog', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(__dirname + '/../lambda'),
            environment: {
                QUEUE_URL: queue.queueUrl
            },
        });

        // Grant Lambda permissions to consume messages from the SQS Queue
        // queue.grantConsumeMessages(lambdaFn);

        // Add event source map to lambda
        lambdaFn.addEventSourceMapping('SQSEventSourceMapping', {
            eventSourceArn: queue.queueArn,
        });

        // SNS Topic
        const topic = new sns.Topic(this, 'InvetoryWarning', {
            topicName: 'InvetoryWarning',
        });
    }
}

const app = new cdk.App();
new MarketPalceInventoryStack(app, 'MarketPalceInventoryStack', {
    env: {
    //   account: '000000000000',
    //   region: 'us-east-1',
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    },
  });
app.synth();