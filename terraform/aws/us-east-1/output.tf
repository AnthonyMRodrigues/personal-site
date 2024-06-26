output "route53_zone_domain_name" {
  value = aws_route53_zone.personal_site_zone.name
  description = "The domain name of the Route 53 zone"
}

output "route53_zone_id" {
  value = aws_route53_zone.personal_site_zone.zone_id
  description = "The zone ID of the Route 53 zone"
}

output "route53_zone_name_servers" {
  value = aws_route53_zone.personal_site_zone.name_servers
  description = "The name servers of the Route 53 zone"
}

output "route53_zone_arn" {
  value = aws_route53_zone.personal_site_zone.arn
  description = "The delegation set of the Route 53 zone"
}


output "route53_id_zone" {
  value = aws_route53_zone.personal_site_zone.id
  description = "The ID of the Route 53 zone"
}

output "amplify_app_id" {
  value = aws_amplify_app.my_amplify_app.id
  description = "The ID of the Amplify app"
}

output "amplify_app_name" {
  value = aws_amplify_app.my_amplify_app.name
  description = "The name of the Amplify app"
}

output "amplify_app_platform" {
  value = aws_amplify_app.my_amplify_app.platform
  description = "The platform of the Amplify app"
}

output "amplify_app_arn" {
  value = aws_amplify_app.my_amplify_app.arn
  description = "The ARN of the Amplify app"
}

output "amplify_app_default_domain" {
  value = aws_amplify_app.my_amplify_app.default_domain
  description = "The default domain of the Amplify app"
}

output "amplify_app_custom_rule" {
  value = aws_amplify_app.my_amplify_app.custom_rule
  description = "The custom rule of the Amplify app"
}

output "ses_domain_identity" {
  value = aws_ses_domain_identity.primary_ses_domain.domain
  description = "The domain identity of the SES domain"
}

output "ses_email_identity" {
  value = aws_ses_email_identity.primary_ses_email.email
  description = "The email identity of the SES email"
}

output "ses_domain_dkim" {
  value = aws_ses_domain_dkim.primary_ses_domain_dkim.dkim_tokens
  description = "The DKIM tokens of the SES domain"
}

output "ses_verification_record" {
  value = aws_route53_record.ses_verification_record.records
  description = "The verification record of the SES domain"
}

output "ses_dmarc_record" {
  value = aws_route53_record.ses_dmarc_record.records
  description = "The DMARC record of the SES domain"
}

output "ses_dkim_record" {
  value = aws_route53_record.ses_dkim_record[*].records
  description = "The DKIM record of the SES domain"
}

output "mx_records" {
  value = aws_route53_record.mx_records[*].records
  description = "The MX records of the Route 53 zone"
}

output "spf_records" {
  value = aws_route53_record.spf_record[*].records
  description = "The SPF records of the Route 53 zone"
}
