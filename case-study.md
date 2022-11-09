---
layout: page
title: Trellis Case Study
permalink: /case-study/
---

# 1- Introduction

## 2.1- Overall Design Goals

# 2- Technical Background

## 2.1- Why Serverless?

## 2.2- Deployment Options

## 2.3- Centralizing the Build Process

## 2.4- Existing Solutions

# 3- Trellis as a Serverless Application Built for Teams

## 3.1- Building Trellis as a Monolith vs Serverless

## 3.2- High Level Design

## 3.3- Integrating with GitHub

# 4 - Executing Builds and Deployments

## 4.1 - Options for Deploying Users’ Applications

Running the build process and deploying an application to AWS within a serverless application presented another technical challenge. The build server must have access to an underlying file system

### 4.1.1

AWS Lambdas functions are limited to 15 minutes [^1] of

References:

[^1]: [Lambda Quotas - AWS Documentation](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#:~:text=function%20scaling.-,Function%20configuration%2C%20deployment%2C%20and%20execution,-The%20following%20quotas)

# 5. UI AND UX
## 5.1 STREAMING DEPLOYMENT LOGS TO THE USER
After the user deploys their serverless infrastructure using Trellis, the user would want a way to view the state of their deployment and obtain any necessary information to communicate with their recently deployed infrastructure. Without further work from our end, users of Trellis can view the state of their deployment by heading over to the [CloudFormation console](https://aws.amazon.com/cloudformation/) in their respective AWS accounts and monitoring the state of the stacks. However, we wanted to improve the user experience by delivering the state to them without additional work from their end. To accomplish this, two main tasks need to be done:
  1. Retrieve the state of the deployment and store it in the Trellis database
  2. Send the updated state to the client


### 5.1.1 Retrieve the state of the deployment

There are three possibilities to retrieve the state of a deployment.
  1. Update the state through the Fargate container
  2. Retrieve the data from the users' CloudFormation accounts
  3. Retrieve the data from the Trellis CloudWatch log group

Updating the state through the Fargate container would be the most straightforward option, as it doesn't require learning new tools. Our initial attempt was to update the state through the Fargate container to speed up our process and prepare for our first demo. However, updating the state this way slows down the deployment time by a **few** seconds. Because of this drawback, we decided to pursue a different path.

Retrieving the data from CloudFormation would give the most up-to-date state among the three options. However, it’s the most complex method among the three options. To accomplish this, we need a lambda to subscribe to every user's CloudFormation and listen to any event related to the stacks the user deploys. For this to happen, we need the Fargate container to read the files it clones to determine the user's application name and then store the application name in the database to tie the appropriate stacks to the correct stage. Furthermore, every change in resource state triggers an event in CloudFormation. These events will, in turn, trigger the lambda subscribed to CloudFormation. The lambda will need to filter through these events for pertinent details as to only send relevant information to the user. The last drawback of this option is that the Fargate container performs other tasks before starting the deployment process; there is a possibility that the deployment process fails before the stacks are initiated on CloudFormation. If this happens, the user will not be updated that the deployment failed. To account for this, we need the Fargate container to send the necessary updates before deployment to the database.

We decided to use the last option, the CloudWatch log group. We connected a cloud watch log group to the Fargate container. The container sends logs to this log group, and the log group creates a log stream for each deployment. We then connected a lambda function to be triggered every time a log group event is triggered. This lambda function stores the logs in the database. This option provides sufficient details to the user without slowing down the deployment. A drawback of this option is that the state will not be live for the user as there's a latency delay from the container providing the logs to the log group triggering the lambda to the lambda storing the data in the datastore. However, we can accept this delay as it's unnecessary for the state to be updated within the second for our purposes.

## 5.2- Design Choices

# 6- Security

## 6.1- Storing Sensitive Information

### 6.1.1- AWS Credentials

### 6.1.2- Environment Variables

## 6.2- Private and Public Facing Resources

# 7- Future Work

## 7.1- Support a wider range of serverless frameworks

## 7.2- Further CI/CD integration

## 7.3- Integrate with other VCS providers

## 7.4- Improve DX with a CLI for Trellis

## 7.5- Optimize Build Times

# 8- References
