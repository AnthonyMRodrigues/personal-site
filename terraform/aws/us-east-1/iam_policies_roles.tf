resource "aws_iam_policy" "amplify_policy_logs" {
  name        = "AmplifyPushToCloudWatchLogsTF"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams",
          "logs:PutLogEvents",
          "logs:GetLogEvents",
          "logs:FilterLogEvents",
        ],
        Resource = [
          aws_cloudwatch_log_group.amplify_logs.arn, "${aws_cloudwatch_log_group.amplify_logs.arn}:*",
          "${aws_cloudwatch_log_group.amplify_logs.arn}:*:log-stream:*"
        ]
      }
    ]
  })
}

resource "aws_iam_policy" "amplify_ses_send_email_policy" {
  name        = "AmplifySESSendEmailTF"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ses:SendEmail",
          "ses:SendTemplatedEmail",
          "ses:SendRawEmail",
          "ses:SendBulkTemplatedEmail"
        ],
        Resource = [
          aws_ses_email_identity.primary_ses_email.arn,
          aws_ses_domain_identity.primary_ses_domain.arn,
          "arn:aws:ses:us-east-1:${data.aws_caller_identity.current.account_id}:configuration-set/*",
          "arn:aws:ses:us-east-1:${data.aws_caller_identity.current.account_id}:template/*"
        ]
      }
    ]
  })
}

resource "aws_iam_policy" "amplify_ses_template_policy" {
  name        = "AmplifySESTemplateTF"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ses:ListTemplates",
          "ses:GetTemplate",
          "ses:ListIdentities"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_policy" "amplify_sts_policy" {
  name        = "AmplifySTSTF"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "sts:AssumeRole",
          "amplify:*",
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role" "amplify_role" {
  name = "AmplifyRoleTF"
    assume_role_policy = jsonencode({
        Version : "2012-10-17",
        Statement : [
          {
              Effect : "Allow",
              Principal : {
                Service : "amplify.amazonaws.com"
              },
              Action : "sts:AssumeRole"
          }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "amplify_logs_policy_attachment" {
  role       = aws_iam_role.amplify_role.name
  policy_arn = aws_iam_policy.amplify_policy_logs.arn
}
