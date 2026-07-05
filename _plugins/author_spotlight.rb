# frozen_string_literal: true

module Jekyll
  module AuthorSpotlight
    module_function

    def site_posts(site)
      if site.posts.respond_to?(:docs)
        site.posts.docs
      else
        site.posts
      end
    end

    def month_key(year, month)
      format('%04d-%02d', year, month)
    end

    def build_author_stats(site, year, month)
      site.data.fetch('team', []).map do |member|
        name = member['name']
        posts = site_posts(site).select { |post| post.data['author'] == name }
        month_posts = posts.select { |post| post.date.month == month && post.date.year == year }
        featured_month = month_posts.count { |post| post.data['featured'] }

        {
          'name' => name,
          'image' => member['image'],
          'link' => member['link'],
          'description' => member['description'],
          'social_link' => member['social-link'] || member['social_link'],
          'total_posts' => posts.size,
          'month_posts' => month_posts.size,
          'featured_month' => featured_month,
          'latest_post_date' => posts.first&.date&.strftime('%B %-d, %Y'),
          'month_articles' => month_posts.map do |post|
            {
              'title' => post.data['title'],
              'url' => post.url,
              'featured' => post.data['featured'] ? true : false,
              'date' => post.date.strftime('%b %-d')
            }
          end
        }
      end
    end

    def compute_month(site, year, month)
      stats = build_author_stats(site, year, month)
      active_this_month = stats.select { |author| author['month_posts'].positive? }
      ranked_month = active_this_month.sort_by do |author|
        [-author['month_posts'], -author['featured_month'], author['name']]
      end

      {
        'key' => month_key(year, month),
        'month_label' => Time.new(year, month, 1).strftime('%B %Y'),
        'month' => month,
        'year' => year,
        'top_authors' => ranked_month.first(3),
        'active_authors' => ranked_month,
        'all_authors' => stats.sort_by { |author| [-author['month_posts'], -author['total_posts'], author['name']] },
        'badges' => build_badges(stats, ranked_month),
        'total_month_articles' => active_this_month.sum { |author| author['month_posts'] }
      }
    end

    def compute(site)
      now = site.time || Time.now
      year = now.year
      current_month = now.month

      months = {}
      month_options = []

      (1..current_month).each do |month|
        data = compute_month(site, year, month)
        months[data['key']] = data
        month_options << { 'key' => data['key'], 'label' => data['month_label'] }
      end

      month_options.reverse!
      current_key = month_key(year, current_month)
      current = months.fetch(current_key)

      current.merge(
        'year' => year,
        'current_key' => current_key,
        'months' => months,
        'month_options' => month_options,
        'message' => site.data.dig('author-spotlight', 'message')
      )
    end

    def slugify(text)
      text.to_s.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')
    end

    def build_badges(stats, ranked_month)
      badges = []

      if (top = ranked_month.first)
        badges << {
          'id' => 'top-contributor',
          'label' => 'Top contributor',
          'detail' => "#{top['month_posts']} article#{'s' unless top['month_posts'] == 1} published",
          'author' => top['name'],
          'image' => top['image'],
          'link' => top['link']
        }
      end

      featured_leader = stats.max_by { |author| author['featured_month'] }
      if featured_leader && featured_leader['featured_month'].positive? && featured_leader['name'] != ranked_month.first&.dig('name')
        badges << {
          'id' => 'featured-star',
          'label' => 'Featured star',
          'detail' => "#{featured_leader['featured_month']} featured article#{'s' unless featured_leader['featured_month'] == 1}",
          'author' => featured_leader['name'],
          'image' => featured_leader['image'],
          'link' => featured_leader['link']
        }
      end

      stats.select { |author| author['month_posts'].positive? && author['month_posts'] == author['total_posts'] }.each do |author|
        badges << {
          'id' => "new-voice-#{slugify(author['name'])}",
          'label' => 'New voice',
          'detail' => 'First articles published this month',
          'author' => author['name'],
          'image' => author['image'],
          'link' => author['link']
        }
      end

      all_time_leader = stats.max_by { |author| author['total_posts'] }
      if all_time_leader && all_time_leader['total_posts'].positive?
        already_badged = badges.any? { |badge| badge['author'] == all_time_leader['name'] && badge['id'] == 'top-contributor' }
        unless already_badged
          badges << {
            'id' => 'all-time-prolific',
            'label' => 'Most published overall',
            'detail' => "#{all_time_leader['total_posts']} total articles",
            'author' => all_time_leader['name'],
            'image' => all_time_leader['image'],
            'link' => all_time_leader['link']
          }
        end
      end

      stats.select { |author| author['month_posts'] >= 2 }.each do |author|
        next if badges.any? { |badge| badge['author'] == author['name'] && badge['id'] == 'top-contributor' }

        badges << {
          'id' => "on-fire-#{slugify(author['name'])}",
          'label' => 'On a roll',
          'detail' => "#{author['month_posts']} articles this month",
          'author' => author['name'],
          'image' => author['image'],
          'link' => author['link']
        }
      end

      badges.uniq { |badge| [badge['id'], badge['author']] }
    end
  end

  class AuthorSpotlightGenerator < Generator
    safe true
    priority :low

    def generate(site)
      site.data['author_spotlight'] = AuthorSpotlight.compute(site)
    end
  end
end
