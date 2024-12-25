source "https://rubygems.org"

gem "jekyll", "~> 4.3.2"
gem "webrick", "~> 1.8"

# Gems being removed from Ruby standard library
gem "logger", "~> 1.6.0"      # Latest version compatible with Ruby 3.3
gem "csv", "~> 3.2.7"         # Latest version compatible with Ruby 3.3
gem "ostruct", "~> 0.6.0"     # Latest version compatible with Ruby 3.3
gem "base64", "~> 0.2.0"      # Latest version compatible with Ruby 3.3
gem "json", "~> 2.7.0"        # To handle JSON explicitly

# Jekyll dependencies
gem "sassc", "~> 2.4.0"       # Use sassc instead of sass-embedded
gem "jekyll-sass-converter", "~> 2.2.0"  # Version that works with sassc

group :jekyll_plugins do
end

# Windows and JRuby does not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end