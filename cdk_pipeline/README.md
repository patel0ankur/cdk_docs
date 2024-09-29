# Enhanced CI/CD with CDK Pipelines

1) Create a new directory under the main directory of your CDK project to store CDK pipeline code:

```
mkdir cdk_pipeline && cd cdk_pipeline
```

2) Initialize the CDK app. 

```
sudo cdk init app --language typescript
```

3) Update the *bin/cdk_pipeline.ts* file to add the *account* and *region* details for *CdkPipelineStack* stack. 

```
new CdkPipelineStack(app, 'CdkPipelineStack', {  
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
```