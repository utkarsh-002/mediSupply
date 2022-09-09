import json
import boto3
# import requests
import trp.trp2 as t2
import base64
from pprint import pprint
from parser import (
    extract_text,
    map_word_id,
    extract_table_info,
    get_key_map,
    get_value_map,
    get_kv_map,
)

def lambda_handler(event, context):
    print(boto3.__version__)
    textract = boto3.client("textract")
    if event:
        # file_obj = event["Records"][0]
        # bucketname = str(file_obj["s3"]["bucket"]["name"])
        # filename = str(file_obj["s3"]["object"]["key"])

        # print(f"Bucket: {bucketname} ::: Key: {filename}")
        
        eventBody = json.loads(json.dumps(event))['body']
    
        imageBase64 = json.loads(eventBody)['Image']

        response = textract.analyze_document(
            Document={
                # "S3Object": {
                #     "Bucket": bucketname,
                #     "Name": filename,
                # }
                
                'Bytes': base64.b64decode(imageBase64)
            },
            FeatureTypes=["TABLES", "QUERIES"],
            QueriesConfig={
                "Queries": [{
                    "Text": "What is the address?",
                    "Alias": "DOCTOR_ADDRESS"
                },
                {
                    "Text": "What is the registration number?",
                    "Alias": "DOC_REG_NO"
                },
                {
                    "Text": "What is the patient name?",
                    "Alias": "PATIENT_NAME"
                },
                {
                    "Text": "What is the doctor name?",
                    "Alias": "DOCTOR_NAME"
                },
                {
                    "Text": "What is the age?",
                    "Alias": "PATIENT_AGE"
                },
                {
                    "Text": "What is the gender?",
                    "Alias": "PATIENT_GENDER"
                }]
            }
        )

        print(json.dumps(response))

        # raw_text = extract_text(response, extract_by="LINE")
        word_map = map_word_id(response)
        table = extract_table_info(response, word_map)
        # key_map = get_key_map(response, word_map)
        # value_map = get_value_map(response, word_map)
        # final_map = get_kv_map(key_map, value_map)

        print(json.dumps(table))
        # print(json.dumps(final_map))
        # print(raw_text)
        
        d = t2.TDocumentSchema().load(response)
        page = d.pages[0]
        query_answers = d.get_query_answers(page=page)
        
        print(json.dumps(query_answers))
        
        # send_data_to_backend(table)
        
        data={'table':table, 'query_answers':query_answers}

    return {"statusCode": 200, "body": json.dumps(data)}
    
    
# def send_data_to_backend(table):
#     endPoint = "https://53ae-2405-201-3003-20a7-9fea-5fa1-3a0c-cd67.in.ngrok.io/get_data_from_aws"

#     authorization = {}
    
#     print("Data sent from send data function")
    
#     data={'table':table}

#     res = requests.post(
#         url=endPoint,
#         json=data,
#         # authorization = authorization
#     )

#     print(res.json)