import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEYID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESSKEY'),
      region: this.configService.get<string>('AWSREGION'),
    });
  }

  async getPreSignedUrl(
    bucketName: string,
    key: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: expiresIn,
    };
    return this.s3.getSignedUrlPromise('putObject', params);
  }
}
