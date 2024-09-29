import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { CdkNagStack } from '../lib/cdk_nag-stack';

test('S3 Bucket Created with Versioning and Encryption', () => {
    const app = new cdk.App();
    const stack = new CdkNagStack(app, 'MyTestStack');

    // Apply cdk-nag checks
    cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));

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
    NagSuppressions.addResourceSuppressionsByPath(stack, 'MyTestStack/MyBucket/Resource',
        [{ id: 'AwsSolutions-S1', reason: 'This is a sample suppression reason.' }]
    );
});


