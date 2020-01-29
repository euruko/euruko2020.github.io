#!/usr/bin/env ruby

require "bundler/inline"

gemfile do
  source "https://rubygems.org"
  gem "countries"
end

require "csv"
require "json"

ISO3166.configure do |config|
  config.locales = [:en]
end

unless ARGV.length == 1
  abort "Usage: countries.rb CSV_PATH"
end

path = File.expand_path(ARGV[0])

unless File.exists?(path)
  abort "File not found: #{path}"
end

rows = CSV.read(path, headers: :first_row)

stats = rows.reduce({}) do |hash, row|
  country_name = row["Country"]

  if country_name && country_name.length > 0
    country = ISO3166::Country.find_country_by_name(country_name)
    hash[country.alpha3.to_sym] ||= { count: 0, alpha2: country.alpha2, alpha3: country.alpha3, name: country.name }
    hash[country.alpha3.to_sym][:count] += 1
  else
    hash[:other] ||= { count: 0, alpha2: nil, alpha3: nil, name: "Unknown" }
    hash[:other][:count] += 1
  end

  hash
end

counts = stats.values
counts.sort_by! { |c| c[:count] }

puts JSON.pretty_generate(counts)
