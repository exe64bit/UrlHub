# 🔗 URL Manager & Shortener (Node.js + Express)

A simple **URL Manager + Shortener web app** built using **Node.js, Express, MongoDB, and EJS**.
Users can sign up, log in, store important URLs, and access them using short links.

---

## 🚀 Features

* 🔐 User Authentication (JWT + Cookies)
* 📝 Add, Edit, Delete URLs
* 🔗 Short URL generation
* 📊 Click tracking for each URL
* 🧑‍💻 User-specific dashboard
* 🎯 Importance tagging for URLs

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Templating Engine:** EJS
* **Authentication:** JWT (JSON Web Token)
* **Other Packages:**

  * dotenv
  * cookie-parser
  * randomstring

---

## 📁 Project Structure

```
project/
│
├── models/
│   ├── userModel.js
│   └── urlModel.js
│
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── add.ejs
│   └── edit.ejs
│
├── .env
├── app.js
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
BASE_URL=http://localhost:3000
```

---

## 🧑‍💻 Installation & Setup

1. Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies

```
npm install
```

3. Start the server

```
npm start
```

Server will run at:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

* User signs up → account stored in DB
* User logs in → JWT token generated
* Token stored in cookies (`LOGIN`)
* Protected routes use middleware (`protect_route`)

---

## 🔗 URL Shortening Logic

* Generates a **unique 5-character alphanumeric ID**
* Stores mapping in database
* Example:

```
http://localhost:3000/abc12 → redirects to original URL
```

---

## 📊 Click Tracking

Each time a short URL is accessed:

* Click count increases
* User can track URL usage

---

## 🧠 Important Notes

* Passwords are stored **in plain text** ⚠️
  👉 You should use **bcrypt** for hashing in production.

* No validation for URLs
  👉 Consider validating URLs before saving.

* No rate limiting or security headers
  👉 Add for production readiness.

---

## 🚧 Future Improvements

* 🔒 Password hashing (bcrypt)
* 📈 Analytics dashboard (charts)
* 🌐 Custom domain support
* 📅 Expiring links
* 📱 Responsive UI

---

## 📜 License

This project is open-source and free to use.

---

## 🙌 Author

Made with ❤️ by you

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share it with others

---
