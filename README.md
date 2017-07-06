# cwevents-playground

A simple architecture for testing [AWS CloudWatch](https://aws.amazon.com/documentation/cloudwatch/) event patterns *in situ* using [AWS CloudFormation](https://aws.amazon.com/documentation/cloudformation/). The CloudFormation template is comprised of the following:

- `NotificationEmail` **Parameter** Email address to send AWS CloudWatch event details to
- `NotificationTopic` **Resource** [AWS Simple Notification Service (SNS)](https://aws.amazon.com/documentation/sns/) topic
- `NotificationEventRule` **Resource** The AWS CloudWatch event rule to test

## Install

```sh
$ git clone git@github.com:mapbox/cwevents-playground.git
$ cd cwevents-playground
$ npm install
```

## Configure the CloudWatch event pattern

By default, the CloudWatch event pattern in the CloudFormation is configured to poll for EC2 instances that have transitioned into a stopped state:

```js
EventPattern: {
  source: ['aws.ec2'],
  'detail-type': ['EC2 Instance State-change Notification'],
  detail: { state: ['stopped'] }
}
```

Update the default event pattern to the pattern you would like to test.

## Create your stack

You can build your template and print the result in your console:

```sh
$ npm run build
```

Or, you can create a stack with the [cfn-config](https://github.com/mapbox/cfn-config) CLI:

```sh
$ npm install -g cfn-config
$ cfn-config create <environment> cloudformation/cwevents-playground.template.js [options]
```
