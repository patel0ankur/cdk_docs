import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkTests from '../lib/cdk_tests-stack';

test('S3 Bucket Created', () => {
    const app = new cdk.App();
    const stack = new CdkTests.CdkTestsStack(app, 'MyTestStack');

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
        VersioningConfiguration: {
            Status: 'Enabled'
        }
    });
});

test('S3 Bucket Encryption', () => {
    const app = new cdk.App();
    const stack = new CdkTests.CdkTestsStack(app, 'MyTestStack');

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
