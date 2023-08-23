CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_public = false # リソースへの直接アクセスを制限
    config.storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory = 'ally-image-bucket'
    config.asset_host = 'https://ally-image-bucket.s3-ap-northeast-1.amazonaws.com'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY'],
      aws_secret_access_key: ENV['AWS_SECRET_KEY'],
      region: 'ap-northeast-1'
    }
  else
    config.asset_host = 'http://backend:3000'
    config.storage = :file
    config.cache_storage = :file
  end
end
