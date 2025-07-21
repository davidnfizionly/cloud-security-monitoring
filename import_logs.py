import boto3

client = boto3.client('cloudtrail')

response = client.start_import(
    sourceS3Uri='s3://cloudwatch-guardian-logs/mock_cloudtrail_logs.json',
    eventDataStore='cloudwatch-guardian-store',
    importId='cloudwatch-guardian-import'
)

print("✅ Import triggered successfully.")
print(response)
