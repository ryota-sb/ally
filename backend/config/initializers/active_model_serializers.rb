# テスト環境以外は、レスポンスのキーをキャメルケースで返す
ActiveModelSerializers.config.key_transform = :camel_lower unless Rails.env.test?
