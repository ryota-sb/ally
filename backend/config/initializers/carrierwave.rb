CarrierWave.configure do |config|
  config.asset_host = ENV['CARRIERWAVE_HOST']
  config.storage = :file
  config.cache_storage = :file
end