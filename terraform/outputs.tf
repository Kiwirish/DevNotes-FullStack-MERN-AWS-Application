# outputs.tf

output "frontend_public_ip" {
  description = "Public IP address of the frontend instance"
  value       = aws_instance.frontend.public_ip
}

output "backend_public_ip" {
  description = "Public IP address of the backend instance"
  value       = aws_instance.backend.public_ip
}

output "frontend_public_dns" {
  description = "Public DNS of the frontend instance"
  value       = aws_instance.frontend.public_dns
}

output "backend_public_dns" {
  description = "Public DNS of the backend instance"
  value       = aws_instance.backend.public_dns
}