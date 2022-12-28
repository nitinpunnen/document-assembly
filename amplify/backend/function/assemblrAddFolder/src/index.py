import json
import boto3


def handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = "documentassembly-gama-landingzone203749-dev"
    directory_name = event['queryStringParameters']['parentDir'] + "/" + event['queryStringParameters']['newFolder']
    print(directory_name)
    s3.put_object(Bucket=bucket_name, Key=(directory_name + '/'))

    return 'success'
