A clean, minimalist, and responsive blog platform built to share thoughts, tutorials, and insights.

🚀 Features
Responsive Design: Optimized for mobile, tablet, and desktop views.

Fast Performance: High Lighthouse scores for SEO and accessibility.

Markdown Support: Write posts easily using MDX or standard Markdown.

Dark Mode: System-based or manual toggle for a better reading experience.

SEO Optimized: Meta tags, OpenGraph images, and sitemap integration.

🛠️ Tech Stack
Framework: [e.g., Next.js / React / Astro]

Styling: [e.g., Tailwind CSS / Styled Components]

Content Management: [e.g., Contentlayer / Sanity.io / Local Markdown]

Deployment: [e.g., Vercel / Netlify]

🏁 Getting Started
Prerequisites
Make sure you have Node.js installed on your machine.

Installation
Clone the repository:

Bash
git clone https://github.com/ath4rv04/blog.git
cd blog
Install dependencies:

Bash
npm install
# or
yarn install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

📁 Project Structure
Plaintext
├── content/        # Markdown or MDX files for blog posts
├── public/         # Static assets like images and favicons
├── src/
│   ├── components/ # Reusable UI components
│   ├── layouts/    # Page templates
│   ├── lib/        # Utility functions and API clients
│   └── pages/      # Application routes
└── tailwind.config.js
✍️ Writing a New Post
To add a new blog post, create a .md or .mdx file in the content/ directory with the following frontmatter:

Markdown
---
title: "My New Post"
date: "2023-10-27"
description: "A short summary of the post"
tags: ["tech", "webdev"]
---
Your content goes here...
📄 License
This project is MIT licensed.

👤 Author
GitHub: @ath4rv04