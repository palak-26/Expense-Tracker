# 💰 Expense Tracker

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/palak-26/Expense-Tracker)
[![Made with React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)](https://react.dev/)
[![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Database MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)


An intuitive and responsive web application to manage and track your daily expenses efficiently.  
Built with **React.js**, **Node.js**, **Express**, and **MongoDB**, this project allows users to add, view, and delete expenses with real-time updates.

---

## 🚀 Features

- 📌 **Add New Expenses** — Quickly log your daily expenses.
- 📊 **Expense List** — View all recorded expenses with details.
- 🗑 **Delete Functionality** — Remove expenses you no longer want to track.
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile devices.
- ⚡ **Real-time Updates** — Changes reflect instantly without page reloads.
- 📊 **Charts Analysis** - Expense analysis through colourfull charts.

---

## 🛠 Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Tools:** npm, Concurrently

---

## 📂 Project Structure

```
Expense-Tracker/
│
├── backend/ # Node.js + Express API
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── server.js # Main backend entry
│
├── frontend/ # React.js app
│ ├── src/ # Components & pages
│ ├── App.js
│ ├── index.js
│
└── package.json # Root for concurrent running
```
---

## ⚙️ Installation & Setup

**1️⃣ Clone the repository**
```bash
git clone https://github.com/palak-26/Expense-Tracker.git
cd Expense-Tracker
```

**2️⃣ Install dependencies**

```
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

**3️⃣ Set up environment variables**

 ```
Create a .env file in the backend/ folder and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**4️⃣ Run the app concurrently**

```
npm run dev
```


**📸 Screenshots**

```Desktop View	```
<img width="1919" height="928" alt="Screenshot 2025-08-14 170552" src="https://github.com/user-attachments/assets/60371505-0429-4127-851c-0f1fc8bcfeac" />
<img width="1919" height="925" alt="Screenshot 2025-08-14 170540" src="https://github.com/user-attachments/assets/e08b029c-0ed2-4a94-9b03-b74ece7c5316" />
<img width="1919" height="928" alt="Screenshot 2025-08-14 170552" src="https://github.com/user-attachments/assets/60371505-0429-4127-851c-0f1fc8bcfeac" />
<img width="1919" height="929" alt="Screenshot 2025-08-14 170617" src="https://github.com/user-attachments/assets/71a64856-918e-402d-b4c5-df4f3adeefaa" />
<img width="1919" height="928" alt="Screenshot 2025-08-14 170627" src="https://github.com/user-attachments/assets/5eab8141-89c8-43f2-8be0-59c79acca8ce" />
<img width="1919" height="907" alt="Screenshot 2025-08-14 170653" src="https://github.com/user-attachments/assets/1ed03e5f-ea85-4f6c-beb9-cc66c46352b0" />
<img width="1897" height="903" alt="Screenshot 2025-08-14 170710" src="https://github.com/user-attachments/assets/9e78ca05-4cb4-4d3d-a800-eddd26e087b2" />



```Mobile View```

	

<img width="397" height="809" alt="Screenshot 2025-08-14 171056" src="https://github.com/user-attachments/assets/54e81020-4e6b-4be5-9adc-5c45f06a60ed" />
<img width="397" height="805" alt="Screenshot 2025-08-14 171117" src="https://github.com/user-attachments/assets/5c76ab89-dde5-45d5-9785-5b8ed743f75c" />
<img width="394" height="802" alt="Screenshot 2025-08-14 171105" src="https://github.com/user-attachments/assets/620738c7-4753-4383-ac80-40de4db78092" />
<img width="397" height="805" alt="Screenshot 2025-08-14 171317" src="https://github.com/user-attachments/assets/0f099fee-9732-4ddb-9f18-6dc5bec30259" />
<img width="396" height="804" alt="Screenshot 2025-08-14 171259" src="https://github.com/user-attachments/assets/6cdc48b1-6c1c-4225-9a4e-16a3b0ba9345" />
<img width="398" height="802" alt="Screenshot 2025-08-14 171210" src="https://github.com/user-attachments/assets/37cdbd66-66c9-4f86-946c-c80f31521818" />
<img width="398" height="804" alt="Screenshot 2025-08-14 171150" src="https://github.com/user-attachments/assets/9c5c1b3c-948b-42cf-be9d-edc2a513bf57" />
<img width="398" height="805" alt="Screenshot 2025-08-14 171352" src="https://github.com/user-attachments/assets/0590a5b7-81d2-4446-ba6e-f6c55a1cd1c0" />
<img width="399" height="803" alt="Screenshot 2025-08-14 171330" src="https://github.com/user-attachments/assets/d3a6eacf-18ef-4e6e-807a-a0d3a5fcb29d" />

**📌 Future Enhancements**

🔐 User authentication through google and github (login/signup)

💾 Export/ Download expense data (in .pdf format)

**👨‍💻 Developed by:**

**Palak Neekhra**
📧 Email: palakneekhra1234@gmail.com
🌐 GitHub: palak-26
