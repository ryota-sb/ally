CarrierWave.configure do |config|
  config.asset_host = "http://backend:3000"
  config.storage = :file
  config.cache_storage = :file
end