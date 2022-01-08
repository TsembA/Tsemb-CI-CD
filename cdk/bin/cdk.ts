#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';
import { App } from 'aws-cdk-lib';

const app = new cdk.App();

new CdkStack(app, 'CdkStack', {
  env: {
    region: 'eu-central-1'
  }
});