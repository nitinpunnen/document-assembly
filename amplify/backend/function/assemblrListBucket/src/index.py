import json
import boto3
import urllib.parse
from collections import defaultdict

client = boto3.client('s3')


def lambda_handler(event, context):
    object_list = client.list_objects_v2(
        Bucket='documentassembly-gama-landingzone203749-dev'
    )
    print(object_list['Contents'])

    folder_list = []
    folder_name = ''
    myDict = {}

    for i in object_list['Contents']:
        if i['Size'] == 0:
            folder_name = i['Key'].replace('public/', '').rstrip('/')
            folder_list.append(folder_name)
            myDict[folder_name] = []
        # Files comes after folder
        elif 'public/' + folder_name in i['Key']:
            myDict[folder_name].append(i['Key'])

    folder_list.pop(0)
    print(folder_list)
    print(myDict)

    treeview = {'root': to_dict([i.split('/') for i in folder_list])}

    response = {'folders': {'id': 'public', 'name': 'Public', 'children': treeview['root']}, 'files': myDict}

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response, indent=4, sort_keys=True, default=str)
    }


def to_dict(d, c=[]):
    if not d:
        return {}
    _d, r = defaultdict(list), []
    for a, *b in d:
        _d[a].append(b)
    return [{'name': a, 'id': '/'.join(c + [a]),
             **({} if not (k := list(filter(None, b))) else {'children': to_dict(k, c + [a])})}
            for a, b in _d.items()]
