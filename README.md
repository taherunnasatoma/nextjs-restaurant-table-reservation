# 🍽 Next.js Restaurant Table Reservation

A modern and responsive **restaurant table reservation** application built with Next.js, allowing users to view restaurant details, browse menus, and reserve tables online. Designed for fast performance, mobile responsiveness, and ease of use.

## 📜 Project Description

This web app allows customers to seamlessly browse restaurants, check availability, and reserve a table in real time. It includes dedicated sections like About, FAQ, Testimonials, and a responsive Footer. The app is connected to MongoDB for storing reservation and restaurant data, making it scalable for production use.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Node.js, API Routes (Next.js)
- **Database:** MongoDB (Atlas)
- **Deployment:** Vercel
- **Package Manager:** npm / pnpm / yarn
- **Version Control:** Git & GitHub

---

## ✨ Features

- 📱 **Fully responsive** for mobile, tablet, and desktop.
- 📅 **Table reservation system** integrated with MongoDB.
- 🏠 **Homepage** with hero section, about, menu highlights, and contact details.
- ℹ **About Page** with restaurant information.
- ❓ **FAQ Section** for quick answers.
- 💬 **Testimonials** from customers.
- 📌 **Footer with navigation links**.
- 🔍 **SEO-friendly** with Next.js.
- 🚀 **Fast deployment** on Vercel.

---

## ⚙ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/taherunnasatoma/nextjs-restaurant-table-reservation.git
cd nextjs-restaurant-table-reservation

2️⃣ Install dependencies
using npm:
npm install
Or using pnpm:
pnpm install

3️⃣ Create .env.local file
env
NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name

4️⃣ Run the development server
npm run dev

Visit http://localhost:3000 in your browser.

5️⃣ Build for production
npm run build
npm start

