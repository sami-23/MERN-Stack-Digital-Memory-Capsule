```markdown
# 🕰️ MERN-Stack-Digital-Memory-Capsule

A modern web application for storing, scheduling, and sharing digital **time capsules** — messages, images, and videos that unlock on a future date. Securely create personal or shared capsules, visualize them on a timeline, and get notified when your memories are ready to be opened!

---

## ✨ Features

- **User Authentication** – Secure registration & login (JWT, bcrypt)
- **Create Time Capsules** – Store text, images, and videos in a digital capsule
- **Scheduled Unlocking** – Capsules are only accessible after your chosen unlock date
- **Recipient Sharing** – Share capsules with other registered users, or keep them private
- **Timeline Visualization** – See all capsules (sent & received) in a beautiful, date-ordered timeline
- **Notifications** – Get notified when capsules become available to open
- **Simple, Clean UI** – Minimal, intuitive React interface
- **Media Support** – Attach photos and videos to your memories

---

## 🚀 How to Run

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) running locally or on Atlas

### **Setup Steps**

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/MERN-Stack-Digital-Memory-Capsule.git
   cd MERN-Stack-Digital-Memory-Capsule
   ```

2. **Install backend dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory (see `.env` example below):
   ```
   MONGO_URI=mongodb://localhost:27017/digital_capsule
   JWT_SECRET=YourSuperSecretKey
   ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The server runs on [http://localhost:5000](http://localhost:5000) by default.

5. **Set up the frontend:**
   - Navigate to the `src/` directory if using as a standalone React project, or integrate these files into your React setup.
   - Install dependencies if needed:
     ```sh
     npm install
     ```
   - Start the React app:
     ```sh
     npm start
     ```
   - The app will open at [http://localhost:3000](http://localhost:3000).

> **Note:** Backend and frontend can run together if you use [concurrently](https://www.npmjs.com/package/concurrently) or similar tools. API endpoints are proxied for development.

---

## 🛠️ Tech Stack

- **MongoDB** – NoSQL database for capsules and users
- **Express.js** – Robust backend REST API
- **React.js** – Modern frontend framework (with hooks & functional components)
- **Node.js** – JavaScript runtime
- **OpenAI GPT** – README written with help from OpenAI GPT-4!
- **Other Libraries:**  
  `bcrypt`, `jsonwebtoken`, `dotenv`, `mongoose`, `cors`, `nodemon` (dev)

---

## 🎁 Benefits

- **Preserve Memories:** Keep digital time capsules for yourself or loved ones, set to unlock at meaningful times.
- **Share Special Moments:** Gift digital messages and media to friends and family, unlocked on birthdays, anniversaries, or future milestones.
- **Visual Timeline:** Intuitive timeline view helps you track all your capsules, past and future.
- **Educational:** Great starter project for learning full-stack development (MERN).
- **Private & Secure:** All data stored securely with authentication and password hashing.

---

## 🚧 Future Improvements

- **Rich Text Editor:** Upgrade capsule content to full WYSIWYG (currently basic text).
- **Email/Push Notifications:** Notify users via email or browser push when capsules unlock.
- **Better Media Storage:** Integrate cloud storage (AWS S3, Cloudinary) for larger media files.
- **Public Capsules:** Allow users to make capsules public and share via link.
- **Admin Panel:** For user management and moderation.
- **Mobile App:** React Native version for mobile experience.
- **Accessibility/UX:** Further polish for wider usability and accessibility.

---

## 🙏 Credits

Made with ❤️ by **Sami Malik**

---

## 📎 Example .env

```env
MONGO_URI=mongodb://localhost:27017/digital_capsule
JWT_SECRET=YourSuperSecretKey
```

---

**Enjoy building and sharing your digital memories!**  
*Pull requests and suggestions welcome!*
```