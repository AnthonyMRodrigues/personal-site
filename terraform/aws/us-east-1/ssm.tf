resource "aws_ssm_parameter" "ses_user_access_key" {
  name  = "/prod/ses/user/access_key"
  type  = "SecureString"
  value = aws_iam_access_key.ses_access_key.id
}

resource "aws_ssm_parameter" "ses_user_secret_key" {
  name  = "/prod/ses/user/secret_key"
  type  = "SecureString"
  value = aws_iam_access_key.ses_access_key.ses_smtp_password_v4
}

resource "aws_ssm_parameter" "ses_user_name" {
  name  = "/prod/ses/user/name"
  type  = "String"
  value = aws_iam_user.ses_user.name
}
