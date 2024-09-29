### CDK Code with Test Cases
AWS CDK code with test cases using the CDK assertions module and Jest as the testing framework:

1) Set up your AWS CDK project:
   
```
mkdir my-cdk-project
cd my-cdk-project
cdk init app --language typescript
```
2) Install necessary dependencies:
```
npm install @aws-cdk/assertions jest @types/jest ts-jest
```
3) Define a simple CDK stack in *lib/my-stack.ts* file:
```
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'MyBucket', {
      versioned: true,
    });
  }
}
```

4) Write test cases for the CDK stack in *test/my-stack.test.ts* file:

```
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyStack } from '../lib/my-stack';

test('S3 Bucket Created', () => {
  const app = new cdk.App();
  const stack = new MyStack(app, 'MyTestStack');

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    VersioningConfiguration: {
      Status: 'Enabled'
    }
  });
});

test('S3 Bucket Encryption', () => {
  const app = new cdk.App();
  const stack = new MyStack(app, 'MyTestStack');

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: [{
        ServerSideEncryptionByDefault: {
          SSEAlgorithm: 'AES256'
        }
      }]
    }
  });
});
```

5) Run the tests:
```
npm test
```

This example sets up a simple CDK stack that creates an S3 bucket with versioning enabled. The test cases use the CDK assertions module to verify that the S3 bucket is created with the correct properties. Adjust the stack and test cases as needed for your specific use case.