#!/usr/bin/env ruby

require "bundler/inline"

gemfile do
  source "https://rubygems.org"
  gem "countries", "~> 3.0"
  gem "pry"
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
    unofficial = country.unofficial_names.first
    name = unofficial.length < country.name.length ? unofficial : country.name
    hash[country.alpha3.to_sym] ||= { count: 0, alpha2: country.alpha2, alpha3: country.alpha3, name: name }
    hash[country.alpha3.to_sym][:count] += 1
  else
    hash[:other] ||= { count: 0, alpha2: nil, alpha3: nil, name: "Unknown" }
    hash[:other][:count] += 1
  end

  hash
end

total = stats.values.reduce(0) { |t, c| t += c[:count] }

percentages = stats.values.map do |row|
  count = row.delete(:count)
  percentage = ((count.to_f / total) * 100)
  row[:percentage] = percentage < 4 ? percentage.ceil : percentage.round
  row
end

percentages.sort_by! {|p| p[:percentage]}
percentages

puts JSON.pretty_generate(percentages)
