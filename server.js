const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY,
user TEXT,
pass TEXT,
saldo INTEGER
)`);

db.run(`INSERT OR IGNORE INTO users(id,user,pass,saldo)
VALUES(1,'administrador','123456',999)`);

app.post("/login",(req,res)=>{

let {user,pass}=req.body;

db.get("SELECT * FROM users WHERE user=? AND pass=?",[user,pass],(err,row)=>{

if(!row){

res.json({ok:false});
return;

}

res.json({ok:true,user:row.user,saldo:row.saldo});

});

});

app.post("/generar",(req,res)=>{

let {user,serial}=req.body;

db.get("SELECT * FROM users WHERE user=?",[user],(err,row)=>{

if(row.saldo<=0){

res.json({ok:false,msg:"Sin saldo"});
return;

}

let clave=Buffer.from(serial).toString("base64").substring(0,12);

db.run("UPDATE users SET saldo=saldo-1 WHERE user=?",[user]);

res.json({ok:true,clave});

});

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado");
});

console.log("Servidor iniciado");

});