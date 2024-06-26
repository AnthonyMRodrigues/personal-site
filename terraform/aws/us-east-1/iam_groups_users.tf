resource "aws_iam_user" "ses_user" {
  name = "SESUserTF"
}

resource "aws_iam_access_key" "ses_access_key" {
  user = aws_iam_user.ses_user.name
}

resource "aws_iam_group" "ses_group" {
  name = "SESGroupTF"
}

resource "aws_iam_group_membership" "ses_group_membership" {
  name = aws_iam_group.ses_group.name
  users = [aws_iam_user.ses_user.name]
  group = aws_iam_group.ses_group.name
}

resource "aws_iam_group_policy_attachment" "ses_group_template_policy_attachment" {
  group = aws_iam_group.ses_group.name
  policy_arn = aws_iam_policy.amplify_ses_template_policy.arn
}

resource "aws_iam_group_policy_attachment" "ses_group_send_email_policy_attachment" {
  group = aws_iam_group.ses_group.name
  policy_arn = aws_iam_policy.amplify_ses_send_email_policy.arn
}
