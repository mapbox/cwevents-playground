'use strict';

const cf = require('@mapbox/cloudfriend');

module.exports = {
  AWSTemplateFormatVersion: '2010-09-09',
  Description: 'cwevents-playground',
  Parameters: {
    NotificationEmail: {
      Type: 'String',
      Description: 'Email address to send CloudWatch Event details to'
    }
  },
  Resources: {
    NotificationTopic: {
      Type: 'AWS::SNS::Topic',
      Properties: {
        Subscription : [
          {
            Endpoint: cf.ref('NotificationEmail'),
            Protocol: 'email'
          }
        ]
      }
    },
    NotificationEventRule: {
      Type: 'AWS::Events::Rule',
      Properties: {
        Description: cf.sub('Event rule resulting in email notification to ${NotificationEmail}'),
        EventPattern: {
          source: ['aws.ec2'],
          'detail-type': ['EC2 Instance State-change Notification'],
          detail: { state: ['stopped'] }
        },
        State: 'ENABLED',
        Targets: [{
          Arn: cf.ref('NotificationTopic'),
          Id: 'send-email-when-ec2-stops'
        }]
      }
    }
  }
};
