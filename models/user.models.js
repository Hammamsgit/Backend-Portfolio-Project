const db = require("../db/connection")


exports.fetchUsers = async ()=>{
    const users = await db.query("SELECT * FROM users;")
    console.log(users.rows)
    return users.rows
}