#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkNagStack } from '../lib/cdk_nag-stack';

const app = new cdk.App();
new CdkNagStack(app, 'CdkNagStack', {


  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

});