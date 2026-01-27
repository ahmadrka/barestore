<div align="center">

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/logo.png" width="120" alt="Logo" />

<h1>BareStore POS</h1>

<p>
Welcome to BareStore, a Retail Management System app that use POS (Point Of Sale) system, built by <a href="https://ahmadrka.com">Ahmadrka</a>, with Next.js framework.
</p>

<a href="https://github.com/ahmadrka/barestore"><img src="https://img.shields.io/badge/BareStore-Frontend_Repo-blue?style=flat&logo=github"></a>
<a href="https://github.com/ahmadrka/barebase"><img src="https://img.shields.io/badge/BareBase-Backend_Repo-red?style=flat&logo=github"></a>
<a href="https://github.com/ahmadrka/barebase/releases"><img src="https://img.shields.io/github/downloads/ahmadrka/barebase/total?style=flat&logo=github&color=brightgreen"></a>
<a href="https://github.com/ahmadrka/barebase/stargazers"><img src="https://img.shields.io/github/stars/ahmadrka/barebase?style=flat&logo=reverbnation&color=yellow"></a>

<br><br>

<h3><code>looking for backend project? <a href="https://github.com/ahmadrka/barebase">click here</a></code></h3>

</div>

<br>

## Demo Gallery

<details>

<summary><b>💻 Desktop Screenshots</b> <i>(click to view)</i></summary>

<div align="center">

<h4>Landing Page</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/landing-page.png" width="90%" alt="Landing Page" />

<br>

<h4>Authentication</h4>

<img src="https://raw.githubusercontent.com/ahmadrka/barestore/main/public/demo/auth-page.png" width="90%" alt="Authentication" />

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

## Tech Stack

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

## Pages

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

## Features

### Minimalism and Modern Design

### Authentication & Authorization

- **Login with Email and Password:** allows users to login using email and password.

- **Hashed Passwords:** passwords are stored in hashed form in the database.

- **Email Verification:** automatically sends emails for account creation or password reset.

- **OAuth 2.0 Support:** user can login or signup using their Google, Microsoft or Facebook account.

- **Multi-Tenancy Store:** user can only access and manage if they are members of the store.

- **User and Store Role:** users can only access a feature if they have permission to do so.

### POS (Point Of Sale)

- **Store:**

- **Products:**

- **Staffs:**

-

### Theme and Languages support _(coming soon)_

## Deployment

### Deployment Demo

<div align="center">

<h4>You can see live demo in here</h4>

<h4>👉 <a href="https://barestore.ahmadrka.com">https://barestore.ahmadrka.com</a> 👈</h4>

Hosted on <a href="https://netlify.com">Netlify</a>

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

4. Copy environment example file for reference

```bash

cp .env.example .env

```

5. Now, you can run the server,

```bash

npm run dev

```

then, server will running on [http://localhost:3000](http://localhost:3000)

6. Or, you can also run server with production mode.

```bash

npm run build

npm run start

```

Congrats, now you running this BareStore POS frontend side app.
