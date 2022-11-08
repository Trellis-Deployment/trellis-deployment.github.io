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

AWS Lambdas functions are limited to [15 minutes][1] of

References:
[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#:~:text=function%20scaling.-,Function%20configuration%2C%20deployment%2C%20and%20execution,-The%20following%20quotas “Lambda Quotas - AWS Documentation”

# 5- UI and UX

## 5.1- Streaming Logs to the Frontend

### 5.1.1- Streaming Logs out of the Build Server

### 5.1.2- Getting Logs to the Frontend - Polling

### 5.1.3- Streaming Logs using Websockets

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
