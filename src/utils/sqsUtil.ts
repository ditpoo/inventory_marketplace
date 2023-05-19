import AWS from 'aws-sdk';

const sqs = new AWS.SQS({
    endpoint: 'http://localhost:4566',
    region: 'us-east-1',
    accessKeyId: 'test',
    secretAccessKey: 'test'
});

// const queueUrl = 'http://localhost:4566/queue/InventoryQueue';
const queueUrl = 'http://localhost:4566/000000000000/InventoryQueue';


export const sendMessageToQueue = async (message: string) => {
    try {
        const params = {
          MessageBody: JSON.stringify(message),
          QueueUrl: queueUrl
        };
    
        const response = await sqs.sendMessage(params).promise();
        console.log('Message sent to SQS:', response.MessageId);
    } catch (error) {
        console.error('Error sending message to SQS:', error);
    }
};
  
