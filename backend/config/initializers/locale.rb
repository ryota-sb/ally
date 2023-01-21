I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]
I18n.config.available_locales = :ja
I18n.default_locale = :ja