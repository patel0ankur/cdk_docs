import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AwsSolutionsChecks } from 'cdk-nag';
import { NagSuppressions } from 'cdk-nag';

export class CdkNagStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the logging bucket to pass the Nag errors
    // const loggingBucket = new s3.Bucket(this, 'LoggingBucket', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
    //   encryption: s3.BucketEncryption.S3_MANAGED,
    //   enforceSSL: true,
    //   serverAccessLogsPrefix: 'logs/',
    // });

    // Define an S3 bucket
    new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      // blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // enforceSSL: true,
      // removalPolicy: cdk.RemovalPolicy.DESTROY,
      // serverAccessLogsBucket: loggingBucket,
      // serverAccessLogsPrefix: 'logs/',
    });
    


    // Apply cdk-nag checks
    cdk.Aspects.of(this).add(new AwsSolutionsChecks({ verbose: true }));

    // NagSuppressions.addResourceSuppressionsByPath(this, '/CdkNagStack/MyBucket/Resource',
    //   [{ id: 'AwsSolutions-S1', reason: 'This is a sample suppression reason.' }]
    // );
  }
}
