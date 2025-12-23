# AWS Lambda Deployment Guide for CatchUpX

## Prerequisites

1. **AWS Account** with access to:
   - AWS Lambda
   - AWS Bedrock (Claude 3 Sonnet model)
   - IAM for permissions

2. **AWS CLI** installed and configured:
   ```bash
   aws configure
   ```

## Deployment Steps

### 1. Create IAM Role for Lambda

Create a role with these policies:
- `AWSLambdaBasicExecutionRole` (for CloudWatch logs)
- Custom policy for Bedrock access:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeModel"
            ],
            "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
        }
    ]
}
```

### 2. Package Lambda Function

```bash
cd backend
zip -r catchupx-lambda.zip lambda_handler_complete.py
```

### 3. Create Lambda Function

Using AWS CLI:
```bash
aws lambda create-function \
    --function-name catchupx-quiz-analyzer \
    --runtime python3.11 \
    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/YOUR_LAMBDA_ROLE \
    --handler lambda_handler_complete.lambda_handler \
    --zip-file fileb://catchupx-lambda.zip \
    --timeout 60 \
    --memory-size 512 \
    --region us-east-1
```

Or using AWS Console:
1. Go to Lambda Console
2. Create Function → Author from scratch
3. Runtime: Python 3.11
4. Upload `catchupx-lambda.zip`
5. Handler: `lambda_handler_complete.lambda_handler`
6. Timeout: 60 seconds
7. Memory: 512 MB

### 4. Configure API Gateway

1. **Create REST API**:
   - Go to API Gateway Console
   - Create API → REST API
   - Name: `CatchUpX API`

2. **Create Resource**: `/analyze-quiz`

3. **Create POST Method**:
   - Integration type: Lambda Function
   - Select your Lambda function
   - Enable Lambda Proxy Integration

4. **Enable CORS**:
   - Actions → Enable CORS
   - Allow Origins: `*` (or your frontend domain)
   - Allow Headers: `Content-Type`
   - Allow Methods: `POST, OPTIONS`

5. **Deploy API**:
   - Actions → Deploy API
   - Stage: `prod`
   - Get your API URL: `https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/analyze-quiz`

### 5. Update Frontend

Update your frontend API endpoint:

```typescript
// frontend/src/config.ts or similar
const API_ENDPOINT = 'https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/analyze-quiz';
```

### 6. Test the Lambda

Test payload:
```json
{
    "body": "{\"grade\":\"8\",\"subject\":\"mathematics\",\"answers\":[{\"question_id\":\"MATH_8_Q1\",\"selected_option\":\"A\"},{\"question_id\":\"MATH_8_Q2\",\"selected_option\":\"B\"}]}"
}
```

Expected response:
```json
{
    "statusCode": 200,
    "body": "{\"weakness_report\":\"...\",\"priority_concepts\":[...],\"lesson_explanation\":\"...\",\"worked_example\":\"...\",\"practice_questions\":[...],\"youtube_videos\":[...],\"study_plan\":{...}}"
}
```

## Monitoring

1. **CloudWatch Logs**: 
   - Log Group: `/aws/lambda/catchupx-quiz-analyzer`
   - View execution logs and errors

2. **CloudWatch Metrics**:
   - Invocations
   - Duration
   - Errors
   - Throttles

## Cost Optimization

- **Lambda**: Pay per request (~$0.20 per 1M requests)
- **Bedrock**: Claude 3 Sonnet pricing
  - Input: ~$3 per 1M tokens
  - Output: ~$15 per 1M tokens
- **API Gateway**: ~$3.50 per 1M requests

**Estimated cost for 1000 quiz analyses**: ~$2-5

## Troubleshooting

### Lambda timeout
- Increase timeout in Lambda configuration (max 15 minutes)

### Bedrock access denied
- Check IAM role has Bedrock permissions
- Verify model ID is correct
- Check region (us-east-1)

### CORS errors
- Enable CORS in API Gateway
- Verify OPTIONS method exists
- Check response headers

### Cold start issues
- Consider provisioned concurrency for production
- Optimize Lambda package size

## Security Best Practices

1. **API Key**: Add API key requirement in API Gateway
2. **Rate Limiting**: Configure throttling (e.g., 1000 requests/sec)
3. **VPC**: Not required for Bedrock, but can add for security
4. **Environment Variables**: Store sensitive config in Lambda env vars
5. **Input Validation**: Already included in code

## Local Testing

Use AWS SAM for local testing:

```bash
# Install SAM CLI
# Create template.yaml
sam local invoke catchupxQuizAnalyzer --event test_event.json
```

## Continuous Deployment

Use GitHub Actions or AWS CodePipeline for automated deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy Lambda
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Lambda
        run: |
          cd backend
          zip -r function.zip lambda_handler_complete.py
          aws lambda update-function-code \
            --function-name catchupx-quiz-analyzer \
            --zip-file fileb://function.zip
```

## Support

For issues:
1. Check CloudWatch logs
2. Review IAM permissions
3. Verify Bedrock model access in your region
4. Test with simplified payload
