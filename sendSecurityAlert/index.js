const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.handler = async (event) => {
  console.log("🚨 SECURITY ALERT:");
  console.log(`Event: ${event.eventName}`);
  console.log(`Actor: ${event.actor}`);
  console.log(`Risk score: ${event.riskScore}`);

  if (event.riskScore > 80) {
    const params = {
      Message: `🚨 High-risk event detected!\n\nEvent: ${event.eventName}\nActor: ${event.actor}\nRisk Score: ${event.riskScore}`,
      Subject: "🚨 CloudWatch Guardian - High Risk Alert",
      TopicArn: "arn:aws:sns:us-east-1:481665100297:SecurityAlerts"
    };

    await sns.publish(params).promise();
    console.log("📧 SNS alert sent.");
  }

  return { status: "Alert processed", input: event };
};
