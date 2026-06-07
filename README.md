# CV. Ridho Utama Berkah Export Website

Static multi-page website in English for international buyers.

## Pages
- `index.html` — homepage with hero, about preview, process preview, why choose us, and contact CTA.
- `about.html` — complete company profile, vision and mission, and image section.
- `product.html` — full product catalog with filters.
- `contact.html` — email, WhatsApp, and request inquiry form.
- `procces.html` — detailed product preparation and export process page.
- Detail pages: `arabica-coffee.html`, `robusta-coffee.html`, `cloves.html`, `nutmeg.html`, `cinnamon.html`, `black-pepper.html`.

## Important edits before publishing
1. Open `assets/js/main.js` and update:
   - `email`
   - `whatsappDisplay`
   - `whatsappNumber`
   - social media URLs
2. Update the production domain in:
   - `sitemap.xml`
   - `robots.txt`
   - JSON-LD schema inside the HTML files if your domain is not `https://www.ridhoutamaberkah.com`.
3. Replace or add more product photos in `assets/img/` if available.

## Theme colors
- Navbar/footer: `#8b5a2b`
- Gradient/cards/buttons: `#ede5d8`
- Background: `#8a9a5b`

The website uses only local assets and vanilla HTML/CSS/JavaScript, so it can be uploaded to shared hosting, cPanel, Netlify, Vercel, or any static hosting service.
