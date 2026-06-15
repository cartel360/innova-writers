name: Article submission

about: Submit a new blog article for review

assignees: []

labels:
  - article

body:
  - type: markdown
    value: |
      Thanks for contributing an article. A reviewer must approve this PR before it can be merged to `main`.

  - type: checkboxes
    id: checklist
    attributes:
      label: Submission checklist
      options:
        - label: Post file is named `YYYY-MM-DD-lowercase-slug.md` in `_posts/`
          required: true
        - label: Cover image is included in `assets/images/`
          required: true
        - label: Front matter includes layout, title, author, categories, tags, description, and image
          required: true
        - label: Author name matches an entry in `_data/team.yml`
          required: true

  - type: textarea
    id: summary
    attributes:
      label: Short summary
      description: One or two sentences about the article for reviewers.
      placeholder: What is this article about?
    validations:
      required: true
