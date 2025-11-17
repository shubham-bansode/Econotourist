const mysql = require("mysql");
const hotels = require("./hotels.js");

console.log(hotels.length);

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "econotourist",
    password: "root"

});


const initDB = () =>{
    for(let i=0;i<hotels.length;i++){
    try{
        connection.query("insert into hotels(title,description,image,price,location,country) values (?, ?, ?, ?, ?, ?) ",hotels[i],(err,result) => {
            if(err) throw err;
            console.log(result);
             console.log("successful");
        })
    } catch(err){
        console.log(err);
        console.log("unsuccessful");
    }
}}

initDB();