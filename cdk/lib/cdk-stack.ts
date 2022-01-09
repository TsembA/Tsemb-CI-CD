import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creating S3Bucket
    const bucket = new s3.Bucket(this, "GatsbyBucket", {
      bucketName: "tsembenhoi",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html"
    });

    // Deployment
    const src = new s3deploy.BucketDeployment(this, "DeployToS3", {
      sources: [s3deploy.Source.asset("../Tsemb-CI-CD/public")],
      destinationBucket: bucket
    });


    // Add CloudFront distribution
    const cf = new cloudfront.CloudFrontWebDistribution(this, "CloudFront", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{isDefaultBehavior: true}]
        },
      ]
    });
  }
}