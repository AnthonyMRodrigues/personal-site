terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.36.0"
    }
  }
}

provider "digitalocean" {
    token = var.do_token
}

import {
  id = "change-me"
  to = digitalocean_project.personal_site_project
}

resource "digitalocean_project" "personal_site_project" {
  name = "personal site"
  is_default = true
}

resource "digitalocean_domain" "personal_site_domain" {
  name = var.domain_name
}

import {
  id = "2041b4a7-0805-4060-b7fc-2621a0d406e4"
  to = digitalocean_app.personal_site_app
}

resource "digitalocean_app" "personal_site_app" {
  spec {
    name   = "personal-site"

    alert {
      rule = "DEPLOYMENT_FAILED"
    }
    alert {
      rule = "DOMAIN_FAILED"
    }

    features = [
      "buildpack-stack=ubuntu-22"
    ]

    ingress {
      rule {
        component {
          name = "frontend"
        }
        match {
          path {
            prefix = "/"
          }
        }
      }
    }

    service {
      name = "frontend"
      github {
        repo = var.github_repo
        branch = "main"
        deploy_on_push = true
      }
      source_dir = "/"


      alert {
        operator = "GREATER_THAN"
        rule     = "MEM_UTILIZATION"
        value    = 50
        window   = "FIVE_MINUTES"
      }

      alert {
        operator = "GREATER_THAN"
        rule     = "CPU_UTILIZATION"
        value    = 50
        window   = "FIVE_MINUTES"
      }

      http_port = 3000

      build_command = "npm run build"
      run_command   = "npm start"

      instance_size_slug = "apps-s-1vcpu-0.5gb" # Smallest instance type
      instance_count     = 1           # No autoscaling
    }

    domain {
      name = digitalocean_domain.personal_site_domain.name
      type = "PRIMARY"
      zone = digitalocean_domain.personal_site_domain.name
    }
  }
}
