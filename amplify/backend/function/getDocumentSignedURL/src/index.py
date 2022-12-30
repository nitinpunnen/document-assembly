import json
import boto3
import urllib.parse
from collections import defaultdict
client = boto3.client('s3')


def lambda_handler(event, context):
    body = json.loads(event['body'])
    print(body)
    signed_urls = []
    for s3_document in body:
        print("Nitin ", s3_document)
        signed_urls.append(create_presigned_url('documentassembly-gama-landingzone203749-dev', s3_document))

    print("Nitin ", len(signed_urls))

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'signed_urls': signed_urls})
    }

    return signed_urls


def create_presigned_url(bucket_name, object_name, expiration=3600):
    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3', region_name="us-west-2", config=boto3.session.Config(signature_version='s3v4', ))
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response
