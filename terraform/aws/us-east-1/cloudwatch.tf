resource "aws_cloudwatch_log_group" "amplify_logs" {
    name = "/aws/amplify/${aws_amplify_app.my_amplify_app.id}"
    retention_in_days = 30
    tags = {
        Name = "AmplifyLogs"
    }
}
