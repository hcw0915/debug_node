// Node.js
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

// const db = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "letter",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("無法連接到資料庫:", err);
//     return;
//   }
//   console.log("已連接到資料庫");
// });

app.post('/submit', (req, res) => {
	console.log('req', req.body) //! 資料OK 後端基本沒問題
	const formData = req.body
	const sql =
		'INSERT INTO contactus (Fullname, Phone, Email, Title, Content) VALUES (?, ?, ?, ?, ?)'

	const values = [
		formData.Fullname,
		formData.Phone,
		formData.Email,
		formData.Title,
		formData.Content
	]

	// db.query(sql, values, (err, result) => {
	//   if (err) {
	//     console.error("插入數據時發生錯誤:", err);
	//     return res.status(500).send("發生錯誤，請重試");
	//   }
	//   console.log("數據已插入到資料庫");
	//   res.send("數據已成功提交");
	// });
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`伺服器正在監聽連接埠 ${port}`)
})
