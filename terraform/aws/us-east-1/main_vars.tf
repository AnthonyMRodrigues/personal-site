variable "domain_name" {
    type = string
    description = "Domain name"
}

variable "github_repo" {
    type = string
    description = "GitHub repository"
}

variable "github_token" {
    type = string
    description = "GitHub token"
    sensitive = true
}

variable "framework" {
    type = string
    description = "Framework"
}

variable "ttl" {
    type = number
    description = "TTL"
    default = 5
}

variable "my_amplify_app_name" {
    type = string
    description = "Amplify app name"
}

variable "public_app_env_vars" {
    type = object({
        INITIAL_YEAR = number
        GITHUB_ACCOUNT = string
        LINKEDIN_ACCOUNT = string
        TELEGRAM_ACCOUNT = string
        GOODREADS_ACCOUNT = string
        MEDIUM_ACCOUNT = string
    })
    description = "App environment variables"
}

variable "mx_records" {
    type = list(string)
    description = "List of records"
}

variable "spf_records" {
    type = list(string)
    description = "List of records"
}

variable "primary_ses_domain" {
    type = string
    description = "Primary email domain"
}

variable "primary_ses_email" {
    type = string
    description = "Primary email"
}

variable "private_app_env_vars" {
    type = object({
        AWS_REGION = string
        SENDER_EMAIL_ADDRESS = string
        EMAIL_ADDRESS = string
        SMTP_EMAIL_ADDRESS = string
        SMTP_EMAIL_PORT = number
    })
    description = "Private app environment variables"
}

variable "main_branch" {
    type = string
    description = "Main branch"
    default = "main"
}

variable "branch_stage" {
    type = string
    description = "Branch stage"
    default = "PRODUCTION"
}

variable "amplify_platform" {
    type = string
    description = "Amplify platform"
    default = "WEB_COMPUTE"
}

variable "main_branch_prefix" {
    type = string
    description = "Main branch prefix"
    default = ""
}
