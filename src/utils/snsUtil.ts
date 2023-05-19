import AWS from 'aws-sdk';

const sns = new AWS.SNS({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const getTopicArnFromName = async (topicName: string) => {
  try {
    const topics = await sns.listTopics().promise();
    
    if (topics && topics.Topics && topics.Topics.length > 0) {
      let topic = null;

      for (let item of topics.Topics) {
        if (item?.TopicArn?.includes(topicName)) {
           topic = item
        }
      }

      if (topic?.TopicArn) {
        return topic.TopicArn;
      } else {
        return ""
      }
    } else {
      throw new Error('Topic not found');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};



export const sendNotification = async (message: string, subscribers: string[]) => {
    const topicArn = await getTopicArnFromName("InvetoryWarning");
    try {
      const publishParams = {
        Message: message,
        TopicArn: topicArn,
        MessageAttributes: {
          subscribers: {
            DataType: 'String.Array',
            StringValue: JSON.stringify(subscribers)
          }
        }
      };

      const response = await sns.publish(publishParams).promise();
      console.log('Notification sent:', response.MessageId);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
};
