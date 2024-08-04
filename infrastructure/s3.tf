// This file will deploy a publicly accessible aws s3 bucket 

resource "aws_s3_bucket" "host_bucket" {
bucket = "subly-tech-test"
  tags = {
    Project = "subly"
  }
}

resource "aws_s3_bucket_website_configuration" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_cors_configuration" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id  

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }  
}

resource "aws_s3_bucket_public_access_block" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id
  policy = data.aws_iam_policy_document.host_bucket.json
  depends_on = [aws_s3_bucket_public_access_block.host_bucket]
}

data "aws_iam_policy_document" "host_bucket" {
  statement {
    effect = "Allow"
    sid = "PublicReadGetObject"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = ["s3:GetObject"]
    resources = [ "arn:aws:s3:::${aws_s3_bucket.host_bucket.id}/*" ]
  }
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.host_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
  depends_on = [aws_s3_bucket_public_access_block.host_bucket]
}

resource "aws_s3_bucket_acl" "host_bucket" {
  bucket = aws_s3_bucket.host_bucket.id
  acl = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
}