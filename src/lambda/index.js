exports.handler = async (event, context) => {
  try {
    for (let record of event['Records']) {
        console.log(record['body'])
    }

    return {
      statusCode: 200,
      body: 'Message processed successfully.'
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Error processing the message.'
    };
  }
};
