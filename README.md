<div align="center">

<a href="https://barestore.ahmadrka.com" target="_blank"><img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/logo.png" width="120" alt="Logo" /></a>

<h1>BareStore POS</h1>

<p>
Welcome to BareStore, a Retail Management System app that use POS (Point Of Sale) system, built by <a href="https://ahmadrka.com">Ahmadrka</a>, with Next.js framework.
</p>

<a href="https://github.com/ahmadrka/barestore" target="_blank"><img src="https://img.shields.io/badge/BareStore-Frontend_Repo-blue?style=flat&logo=github"></a>
<a href="https://github.com/ahmadrka/barebase" target="_blank"><img src="https://img.shields.io/badge/BareBase-Backend_Repo-red?style=flat&logo=github"></a>
<a href="https://github.com/ahmadrka/barestore/releases" target="_blank"><img src="https://img.shields.io/github/downloads/ahmadrka/barestore/total?style=flat&logo=github&color=brightgreen"></a>
<a href="https://github.com/ahmadrka/barestore/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/ahmadrka/barestore?style=flat&logo=reverbnation&color=yellow"></a>

<br><br>

<h3><code>looking for backend project? <a href="https://github.com/ahmadrka/barebase" target="_blank">click here</a></code></h3>

</div>

<br>

## 📸 Demo Gallery

<details>

<summary><b>💻 Desktop Screenshots</b> <i>(click to view)</i></summary>

<div align="center">

<h4>Landing Page</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/landing-page.png" width="90%" alt="Landing Page" />

<br>

<h4>Authentication</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/auth-page.png" width="90%" alt="Authentication" />

<br>

<h4>Home</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/home-page.png" width="90%" alt="Home" />

<br>

<h4>Dashboard</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/dashboard.png" width="90%" alt="Dashboard" />

<br>

<h4>Product Management</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/products-management.png" width="90%" alt="Products Management" />

</div>

</details>

<details>

<summary><b>📱 Mobile Screenshots</b> <i>(click to view)</i></summary>

<div align="center">

<h4><i>coming soon</i></h4>

</div>

</details>

## ⚙️ Tech Stack

### Core

- [Typescript](https://www.typescriptlang.org/)
- [Next.js 16](http://nextjs.org/)
- [Tanstack Query v5](https://tanstack.com/query/latest)

### Dependencies

- [Axios](https://axios-http.com/)
- [Sonner](https://www.npmjs.com/package/sonner)
- [Zod](https://zod.dev/)
- [nextjs-toploader](https://www.npmjs.com/package/nextjs-toploader)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [@ducanh2912/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa)

## 📄 Pages

- **Landing Page:** initial view of this website.
  - Login, signup or contact button.
  - Image screenshot for sevice demo.
  - Comprehensive service description and information.
- **Authentication:** login or signup page.
  - Login with email and password.
  - Login with oauth (like Google, Microsoft, Facebook).
  - Signup page with verification and set password page.
- **Home:** the page where it all started.
  - Store list for joined store.
  - Join or Create store page.
  - User profile management (profile, logout, etc).
- **Dashboard:** dashboard for selected store.
  - Statistic data (total member & products, working hour, etc).
  - Store information.
- **Products Management:** products list from selected store.
  - Comprehensive list of product.
  - Search bar and sort by/filter button.
  - Checkbox for select many products.
  - Product information and edit page.
  - Create product page for new products.
- **Staff Management:** manage staff from selected store.
  - Comprehensive list of staffs.
  - Search bar and sort by/filter button.
  - Checkbox for select many staffs.
  - Staff information and update page.
  - Staff invitation page for invitation or invite token.
- **Statistic:** data analytic and statistic for selected store
- **Transaction:** cashier tansaction for selected store

## 📖 Features

### Appearance

- **Web Design:** user-friendly with modern and minimalism web design.
- **Accessibility:** use standard web accessibility (WCAG 2.1 AA).
- **Modern Color Scheme:** use OKLCH color space with css color variables.
- **Responsive** _(on progress)_ <!-- allows users to switch between dark and light mode. -->
- **Dark/Light Mode** _(on progress)_ <!-- allows users to switch between dark and light mode. -->
- **System Theme** _(on progress)_ <!-- automatically switches between dark and light mode based on system theme. -->

### Security

- **Cookie Storage:** use cookie for token and session management.
- **Authentication:** allows users to login using email and password, or oauth (google, microsoft, facebook).
- **User Registration:** allows users to register using username, email and password with email verification.
- **Role-Based Access Control:** users can only access a feature if they have permission to do so.

### Internationalization

- **Multi-Language Support** _(on progress)_ <!-- allows users to switch between different languages. -->
- **Multi-Currency Support** _(on progress)_ <!-- allows users to switch between different currencies. -->

### Performance

- **Lazy Loading:** prioritize loading pages with lazy loading.
- **Image Optimization:** automatically resize and optimize images for faster loading.
- **Query Caching:** use query caching for faster data fetching.

### Admin

- **Admin Panel:** allows users with admin role to moderate and manage users or stores.

### Others

- **404 Not Found:** custom 404 not found page.
- **PWA:** allows users to install the app on their device.
- **Toaster Notification:** toast notification for users.
- **Form Validation:** automatically validate form inputs.
- **File Upload:** _(on progress)_ <!-- allows users to upload files. -->

## 📦 Deployment

### Deployment Demo

<div align="center">
<h4>You can see live demo in here</h4>

<h4>👉 <a href="https://barestore.ahmadrka.com" target="_blank">https://barestore.ahmadrka.com</a> 👈</h4>

Hosted on <a href="https://netlify.com" target="_blank">Netlify</a>

</div>

### Deployment Setup

1. Make sure you have installed [**Node.js**](https://nodejs.org/) (v18+ recommended).

2. Clone or download [this repository](https://github.com/ahmadrka/barestore).

```bash

git clone https://github.com/ahmadrka/barestore.git

cd barestore

```

3. Download all dependencies modules.

```bash

npm install

```

4. Set environment variables, or copy environment example file for reference.

```bash

cp .env.example .env

```

5. Now, you can run the server,

```bash

# Run command
npm run dev

```

then, server will running on [http://localhost:3000](http://localhost:3000) by default.

6. Or, you can also run server with production mode.

```bash

# Build command
npm run build

# Run Command
npm run start

```

Congrats, now you running this BareStore POS frontend side app.

### Common Issues

<details>

<summary><b>Unable to start the project.</b></summary>

<p>Node.js is not installed or not running, or you have not installed all dependencies modules.</p>

<p><b>Solution: </b>make sure you have installed <a href="https://nodejs.org/">Node.js</a> (v18+ recommended), and run <code>npm install</code> to download all dependencies modules.</p>

</details>
<details>
<summary><b>Project has started but "can't reach this page".</b></summary>

<p>You opened the incorrect port or maybe there is another project running on the same port.</p>

<p><b>Solution: </b>check project port in console when you run the project, or set port in <code>.env</code> file. Make sure you open the same port in your browser.</p>

</details>
<details>
<summary><b>Backend Error or Axios Network Error.</b></summary>

<p>Backend server is not running or not accessible.</p>

<p><b>Solution: </b>make sure you have started the backend server properly, and set the correct backend server url in <code>.env</code> file.</p>

</details>
<details>
<summary><b>Application or Browser Error.</b></summary>

<p>Browser cookies conflict or extension prevent the page to open.</p>

<p><b>Solution: </b>check console for error message, or try to use incognito mode or different browser.</p>

</details>
<details>
<summary><b>Blocked by CORS.</b></summary>

<p>The backend server running on different origin or different domain.</p>

<p><b>Solution: </b>configure the backend server to allow requests from the frontend url. alternatively, you can use a browser extension to disable CORS (e.g. <a href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf">Allow CORS: Access-Control-Allow-Origin</a> for Chrome).</p>

</details>
