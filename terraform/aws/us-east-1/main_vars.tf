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
