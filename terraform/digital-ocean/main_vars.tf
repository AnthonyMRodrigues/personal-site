variable "do_token" {
    type = string
    description = "Digital Ocean API token"
    sensitive = true
}

variable "default_project_id" {
    type = string
    description = "Default project ID"
    sensitive = true
}

variable "domain_name" {
    type = string
    description = "Domain name"
}

variable "github_repo" {
    type = string
    description = "GitHub repository"
}

variable "alert_email" {
    type = string
    description = "Email address for alerts"
}
