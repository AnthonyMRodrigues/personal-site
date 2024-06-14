terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = ""
    key    = "us-east-1/personal-site/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}


resource "aws_route53_zone" "personal_site_zone" {
  name = var.domain_name
}

resource "aws_amplify_app" "my_amplify_app" {
  name                = var.my_amplify_app_name
  build_spec = <<-EOT
            version: 1
            frontend:
              phases:
                preBuild:
                  commands:
                    - npm ci --cache .npm --prefer-offline
                build:
                  commands:
                    - env | grep -e NEXT_PUBLIC_ >> .env.production
                    - npm run build
              artifacts:
                baseDirectory: .next
                files:
                  - '**/*'
              cache:
                paths:
                  - .next/cache/**/*
                  - .npm/**/*
            EOT
  platform = "WEB_COMPUTE"
  repository = var.github_repo
  oauth_token = var.github_token
  custom_rule {
    source = "/<*>"
    target = "/index.html"
    status = "404-200"
  }
  environment_variables = {
    NEXT_PUBLIC_INITIAL_YEAR = var.app_env_vars.INITIAL_YEAR
    NEXT_PUBLIC_GITHUB_ACCOUNT = var.app_env_vars.GITHUB_ACCOUNT
    NEXT_PUBLIC_LINKEDIN_ACCOUNT = var.app_env_vars.LINKEDIN_ACCOUNT
    NEXT_PUBLIC_TELEGRAM_ACCOUNT = var.app_env_vars.TELEGRAM_ACCOUNT
    NEXT_PUBLIC_GOODREADS_ACCOUNT = var.app_env_vars.GOODREADS_ACCOUNT
    NEXT_PUBLIC_MEDIUM_ACCOUNT = var.app_env_vars.MEDIUM_ACCOUNT
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.my_amplify_app.id
  branch_name = "main"
  stage = "PRODUCTION"
  framework = var.framework
  ttl = var.ttl
}


resource "aws_amplify_domain_association" "personal_site_domain" {
  app_id      = aws_amplify_app.my_amplify_app.id
  domain_name = aws_route53_zone.personal_site_zone.name
  sub_domain {
    branch_name = "main"
    prefix = ""
  }
}

resource "aws_route53_record" "mx_records" {
  zone_id = aws_route53_zone.personal_site_zone.zone_id
  name    = ""
  type    = "MX"
  ttl     = 300
  records = var.mx_records
}

resource "aws_route53_record" "spf_record" {
  zone_id = aws_route53_zone.personal_site_zone.zone_id
  name    = ""
  type    = "TXT"
  ttl     = 300
  records = var.spf_records
}
