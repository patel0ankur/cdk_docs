### Using cdk-nag to Adhere to Best Practices

cdk-nag is an open-source tool that provides automated checks for AWS CDK code and the resulting Cloudformation templates to help ensure that they adhere to security and compliance best practices.

Here’s an AWS CDK code using cdk-nag in TypeScript to enforce best practices and compliance checks:

1) Set up your AWS CDK project:
```
mkdir my-cdk-nag-project
cd my-cdk-nag-project
cdk init app --language typescript
```

2) Install necessary dependencies:
```
npm install @aws-cdk/assertions @aws-cdk/aws-s3 @aws-cdk/core cdk-nag
```

3) Define a simple CDK stack with *cdk-nag* in *lib/my-stack.ts* file:
```
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AwsSolutionsChecks } from 'cdk-nag';

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an S3 bucket
    new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    // Apply cdk-nag checks
    cdk.Aspects.of(this).add(new AwsSolutionsChecks());
  }
}
```

4) Write test cases for the CDK stack in *test/my-stack.test.ts* file:

```
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyStack } from '../lib/my-stack';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';

test('S3 Bucket Created with Versioning and Encryption', () => {
  const app = new cdk.App();
  const stack = new MyStack(app, 'MyTestStack');

  // Apply cdk-nag checks
  cdk.Aspects.of(stack).add(new AwsSolutionsChecks());

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    VersioningConfiguration: {
      Status: 'Enabled'
    },
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [{
        ServerSideEncryptionByDefault: {
          SSEAlgorithm: 'AES256'
        }
      }]
    }
  });

  // Suppress specific nag warnings if necessary
  NagSuppressions.addResourceSuppressionsByPath(
    stack,
    'MyTestStack/MyBucket/Resource',
    [{ id: 'AwsSolutions-S1', reason: 'This is a sample suppression reason.' }]
  );
});
```

5) Run cdk synth command:
```
cdk synth --all
```

6) Run the tests:
```
npm test
```

This example sets up a simple CDK stack that creates an S3 bucket with versioning and encryption enabled. The cdk-nag checks are applied to enforce best practices, and test cases are written to verify the stack’s resources and properties. Adjust the stack and test cases as needed for your specific use case.