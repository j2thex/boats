# Naustvik Slipp & Båtbyggeri

A multilingual (Norwegian/English) website for Naustvik Slipp & Båtbyggeri built with Jekyll.

## Structure
├── data/ # Translation files
│ └── i18n/
│ ├── en/ # English translations
│ │ ├── nav.yml # Navigation translations
│ │ ├── home.yml # Home page translations
│ │ └── ... # Other section translations
│ └── no/ # Norwegian translations
├── includes/ # Reusable components
│ ├── header.html # Site header with navigation
│ ├── footer.html # Site footer
│ └── i18n.html # Translation helper
├── layouts/ # Page layouts
│ └── default.html # Main layout template
├── assets/ # Static files
│ ├── css/ # Stylesheets
│ │ └── main.scss # Main stylesheet
│ └── js/ # JavaScript files
│ ├── main.js # Main JavaScript
│ └── calendar-init.js # Calendar initialization
├── en/ # English pages
│ ├── index.html # Home page
│ ├── book/ # Booking page
│ └── facilities/ # Facilities page
├── no/ # Norwegian pages
│ ├── index.html # Home page
│ ├── book/ # Booking page
│ └── facilities/ # Facilities page
├── config.yml # Site configuration
└── index.html # Root redirect

### 2. Navigation

- Header navigation is dynamic based on language
- URLs are prefixed with language code (e.g., /en/, /no/)
- Language switcher maintains current page when switching languages
- Mobile navigation uses a hamburger menu

### 3. Pages

Each language version includes:
- Home page (index.html)
- Booking page (book/)
- Facilities page (facilities/)

### 4. Booking System

The booking system integrates with Google Calendar:
- Uses Google Calendar Appointments
- Includes a form for additional boat details
- Calendar is initialized via calendar-init.js

### 5. Styling

- Uses SCSS for styling
- Responsive design with mobile-first approach
- Custom variables for consistent theming
- Modular CSS organization

### 6. Development

Prerequisites:
- Ruby
- Jekyll
- Bundler

Setup:
bash

Install dependencies
`bundle install`

Start development server
`bundle exec jekyll serve`


### 7. Deployment

The site is deployed using GitHub Pages:
1. Push to main branch
2. GitHub Actions builds the site
3. Deployed to hunsbeth.com

### 8. Adding Content

To add new content:
1. Add translations to `_data/i18n/[lang]/`
2. Create pages in both `en/` and `no/` directories
3. Use the translation helper for text content

### 9. Configuration

Key configurations in `_config.yml`:
- Site settings
- Build settings
- Language defaults
- Plugin configurations

### 10. Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Progressive enhancement for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit a pull request

## License

All rights reserved © Naustvik Slipp & Båtbyggeri