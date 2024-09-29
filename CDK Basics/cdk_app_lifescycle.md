
## CDK App LifeCycle: 


Source: [https://docs.aws.amazon.com/cdk/v2/guide/apps.html#lifecycle]

1. Construction or Initialization:  
This is like setting up a new toy or piece of furniture. You take all the pieces(constructs) out of box(your code) and start putting together. This includes main structure(app), smaller sections(stacks) and individual parts (child Constructs).
    
2. Preparation: 
This is like double-checking your work. After building the structure, you tighten all the screws to ensure everything is securely attached. Constructs that implement the prepare method go through a final round of adjustments to set up their final state. This preparation phase happens automatically, and as a user, you won’t see any feedback from it. It’s uncommon to need the prepare hook, and it’s generally not recommended. Be very cautious when making changes to the construct tree during this phase, as the order of operations can affect the behavior.

3. Validation:
This step is like performing a quality check. After assembling everything, you review it to ensure there are no missing pieces and that everything is in the right place.

4. Synthesis:   
Now, your structure (app) is ready to be showcased. This stage involves creating a detailed blueprint of what you’ve built. It’s like taking photos or writing a manual for your assembled structure. This blueprint (cloud assembly) includes all the necessary instructions and details (CloudFormation templates, Lambda bundles, etc.) to recreate your structure in AWS. Typically, you don’t need to worry about creating this blueprint; the CDK handles it for you.

5. Deployment:
This is like relocating your assembled structure to its final destination. The CDK takes the blueprint (cloud assembly) and begins constructing it in AWS. It’s similar to hiring a team to take your plan and build the structure in your backyard. They manage all the details, such as uploading necessary files to Amazon S3, and then initiate the actual building process using AWS.



