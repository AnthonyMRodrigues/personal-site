resource "aws_ses_domain_identity" "primary_ses_domain" {
  domain = aws_route53_zone.personal_site_zone.name
}

resource "aws_ses_email_identity" "primary_ses_email" {
  email = var.primary_ses_email
}

resource "aws_ses_domain_dkim" "primary_ses_domain_dkim" {
  domain = aws_ses_domain_identity.primary_ses_domain.domain
}

resource "aws_route53_record" "ses_verification_record" {
  zone_id = aws_route53_zone.personal_site_zone.zone_id
  name    = aws_ses_domain_identity.primary_ses_domain.verification_token
  type    = "TXT"
  ttl     = 600
  records = [aws_ses_domain_identity.primary_ses_domain.verification_token]
}

resource "aws_route53_record" "ses_dmarc_record" {
  zone_id = aws_route53_zone.personal_site_zone.zone_id
  name    = "_dmarc.${aws_route53_zone.personal_site_zone.name}"
  type    = "TXT"
  ttl     = 300
  records = ["v=DMARC1; p=none;"]
}

resource "aws_route53_record" "ses_dkim_record" {
  count = 3
  zone_id = aws_route53_zone.personal_site_zone.zone_id
  name    = "${aws_ses_domain_dkim.primary_ses_domain_dkim.dkim_tokens[count.index]}._domainkey.${aws_ses_domain_identity.primary_ses_domain.domain}"
  type    = "CNAME"
  ttl     = 300
  records = ["${aws_ses_domain_dkim.primary_ses_domain_dkim.dkim_tokens[count.index]}.dkim.amazonses.com"]
}
