const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const mapboxgl = require('mapbox-gl');
let path = require('path');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host: 'smtp.gmail.com',
        port:465,
        auth:{
           user: 'econotourist07@gmail.com',
            pass: 'woefuejrdsygijka'
        }
    }
);

// let distanceInKm = require("/js/instation.js");
// let value = require("../pblmyself/public/js/login.js");
// module.exports = app;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Econotourist",
    password: "root"
});
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req,res) => {
   req.flash("Hello There");
   });
   

app.get('/main', async (req,res) => {
    
        res.render("main.ejs");
});

app.get('/dist', async (req,res) => {
    
    res.render("dist.ejs");
});


//create route 
app.get('/main/login', (req,res) => {
       res.render("login.ejs");
})

app.get('/mainlogin/:id', async (req,res) => {
    let {id} = req.params;
    // console.log(id);
   
    try{
   
        await connection.query("select * from user where id = ?",id,(err,result) => {
                if(err) throw err;
                // console.log(result);
                res.render("mainlogin.ejs",{data : result});
            })
        } catch(err){
            console.log(err);
        }
})

app.post("/main/login",async(req,res) => {
    let {user,email2,pass2,passcon,email,pass} = req.body;

let id =Math.floor(Math.random() * (1000000000));

      try{
        
        if(req.body.user != undefined)
        {
        await connection.query("insert into user (id,username,email,password) values (? ,? ,? ,?) ",[id,req.body.user,req.body.email2,req.body.pass2],(err,result) => {
             if(err) throw err;
              res.redirect("/main/login");         
         })
        }else
        {
            connection.query("select * from user where email = ?",[req.body.email],(err,result) => {
                if(err) throw err;
                if(req.body.pass == result[0].password)
                {
                        res.redirect(`/mainlogin/${result[0].id}`); 
                }else
                {
                    res.redirect("/login");     
             }
            })
        }
     } catch(err){
         console.log(err);
     }

     try{
       
     } catch(err){
        
         console.log(err);
     }

})

// app.get('/logindone', (req,res) => {
//     res.sendFile(__dirname+"/mainloginedin.html");
// })

// app.post('/login',(req,res)=>{
// })

app.get('/mainlogin/:id/register', (req,res) => {
    let {id} = req.params;
    console.log(id);

    try{
    connection.query("select * from register where id = ? ",id,(err,result) => {
        if(err) throw err;
        // console.log(result[0]);
        if(result[0] == undefined)
        {
            connection.query("select * from user where id = ? ",id,(err,result) => {
                if(err) throw err;
            res.render("register.ejs",{data : result});
          })
        }
        else{
            res.render("registeredit.ejs",{data: result});
        }
           
    })
} catch(err){
    console.log(err);
}

 
    // res.render("register.ejs", {});
})

app.post("/mainlogin/:id/registerdone",(req,res) => {
    let {id} = req.params;

  let {fname,lname,age,email,password,dob,gender,phoneno} = req.body;

         try{ 
            connection.query("insert into register(id,firstname,lastname,age,email,password,DateofBirth,Gender,phoneno) values (?,?,?,?,?,?,?,?,?) ",[id,req.body.fname,req.body.lname,req.body.age,req.body.email,req.body.password,req.body.dob,req.body.gender,req.body.phoneno],(err,result) => {
                if(err) throw err;
                res.redirect(`/mainlogin/${id}`);
            })
        } catch(err){
            console.log(err);
        }
})
    
app.post("/mainlogin/:id/edit",(req,res)=>{
let {id} = req.params;
let {fname,lname,age,email,password,dob,gender,phoneno} = req.body;

    try{
        connection.query("update register set firstname=?,lastname=?,age=?,email=?,password=?,DateofBirth=?,Gender=?,phoneno=? where id = ?",[req.body.fname,req.body.lname,req.body.age,req.body.email,req.body.password,req.body.dob,req.body.gender,req.body.phoneno,id],(err,result) => {
            if(err) throw err;
            res.redirect(`/mainlogin/${id}/register`)
        })
     }
      catch(err){
            console.log(err);
        }
})



//-----------------FOR HOTELS------------------------//
app.get("/mainlogin/:id/hotels",async (req,res) =>{
    let {id} = req.params;

    try{
        await connection.query("select * from hotels",(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("hotels/hotels.ejs",{ hotel : result});
        })
    } catch(err){
        console.log(err);
    }

});

app.get("/mainlogin/hotels/add",(req,res)=>{
    res.render("hotels/hotelform.ejs");
 });

app.get("/mainlogin/hotels/:h_id",async (req,res)=>{
    let {h_id} = req.params;
    //  console.log(h_id);
    try{
        await connection.query("select * from hotels where h_id = ?",h_id,(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("hotels/hotelsdetails.ejs",{ hotel : result});
        })
    } catch(err){
        console.log(err);
    }
});



app.post("/mainlogin/hotels/add",async(req,res)=>{
 let {id} = req.params;
 let {title,description,image,price,location,country} = req.body;
 console.log(id);

    try{
        await connection.query("insert into hotels(title,description,image,price,location,country) values (?, ?, ?, ?, ?, ?) ",[req.body.title,req.body.description,req.body.image,req.body.price,req.body.location,req.body.country],(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
        //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
        res.redirect(`/mainlogin/${id}/hotels`);
        })
    } catch(err){
        console.log(err);
    }

 });

 app.get("/mainlogin/hotels/:h_id/edit",(req,res)=> {
       let {h_id} = req.params;
 
       try{
        connection.query("select * from hotels where h_id = ? ",h_id,(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("hotels/hotelformedit.ejs",{ hotel : result});
        })
    } catch(err){
        console.log(err);
    }

       
 });

 app.post("/mainlogin/hotels/:h_id/edit",(req,res) => {
     
    let {h_id} = req.params;
 let {title,description,image,price,location,country} = req.body;
//   console.log(req.body);

     try{
          connection.query("update hotels set title = ?,description =?,image =?,price=?,location=?,country=? where h_id = ? ",[req.body.title,req.body.description,req.body.image,req.body.price,req.body.location,req.body.country,h_id],(err,result) => {
             if(err) throw err;
             // hotels =[id,result];
         //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
         res.redirect(`/mainlogin/hotels/${h_id}`);
         })
     } catch(err){
         console.log(err);
     }
 })

 app.get("/mainlogin/hotels/:h_id/delete", (req,res) => {
    let {h_id} = req.params;
    let {id} = req.params;

    try{
        connection.query("delete from hotels where h_id = ? ",h_id,(err,result) => {
           if(err) throw err;
           // hotels =[id,result];
       //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
       res.redirect(`/mainlogin/:id/hotels`);
       })
   } catch(err){
       console.log(err);
   }
 })

 //===========================attraction Points===========================

app.get("/mainlogin/:id/attraction",(req,res)=>{
    let {id} = req.params;

    try{
        connection.query("select * from TouristSpots",(err,result) => {
           if(err) throw err;
           console.log(result);
           res.render("attraction/attraction.ejs",{data : result});
       })
    } catch(err){
       console.log(err);
    }
})

//-----------------FOR PLAN A TRIP------------------------//

app.get("/mainlogin/:id/planatrip",(req,res) => {
    
    let {id} = req.params;
    console.log(id);

    try{
        connection.query("Select * from user where id = ? ",id,(err1,result1) => {
           if(err1) throw err1;
           connection.query("Select * from pat where id = ? ",id,(err2,result2) => {
            if(err2) throw err2;

            // const combineData = {
            //     table1: result1,
            //     table2: result2
            //   };
            // console.log(result1);
            // console.log(result2);
  
             res.render("planatrip/planatrip.ejs",{table1: result1,table2: result2});
    //          if(id == undefined)
    //        {
    //         connection.query("select * from user where id = ? ",id,(err,result) => {
    //             if(err) throw err;
    //             console.log("first");
    //             res.render("planatrip/patform.ejs",{data : result});
    //         })
    //        }else {
    //         console.log("second");
    //         res.render("planatrip/patform.ejs",{data : result});
    //        }
    //        res.render("planatrip/planatrip.ejs",{data : result});
       })
    })

   } catch(err){
       console.log(err);
   }
 
})

app.get("/mainlogin/:id/planatrip/add",(req,res) => {
    let {id} = req.params;
   
    const query1 = "select * from user where id = ?";

    try{
        connection.query(query1,id,(err1,result1) => {
           if(err1) throw err1;
            // console.log(combineData);
           res.render("planatrip/patform.ejs",{data : result1});
       })
   } catch(err){
       console.log(err);
   }
})

app.get("/mainlogin/:id/estimate", (req, res) => {
    let { id } = req.params;
    try{
         connection.query("select * from user where id = ?",id,(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("map/estimate.ejs",{ data : result});
        })
    } catch(err){
        console.log(err);
    }
});


app.get("/mainlogin/:id/finalestimate",(req,res) => {

      let { id } = req.params;
    const stationtype = req.query.stationType;
    const transportMode = req.query.transportMode;
    switch (stationtype) {
        case 'inStation':
            res.render("map/instationdis.ejs", { id: id });
            break;
        case 'outStation':
            switch(transportMode) {
                case 'ola':
                    res.render("map/instationdis.ejs", { id: id });
                    break;
                case  'trains':
                    res.render("map/train.ejs", { id: id });
                    break;
                default:
                    res.status(400).send('Invalid Option');
            }
            break;
        default:
            res.status(400).send('Invalid Option');
    }
})

app.get("/mainlogin/:id/map", (req, res) => {
    let { id } = req.params;
    console.log(id);
    try{
        connection.query("select * from user where id = ?",id,(err,result) => {
            if(err) throw err;
            // hotels =[id,result];
           res.render("map/estimate.ejs",{ data : result});
        })
    } catch(err){
        console.log(err);
    }
});
app.get("/mainlogin/:id/map/estimate", (req, res) => {
    let { id } = req.params;
    res.render("map/estimatemenu.ejs",{ data :[{id : id}]}); 
});

app.post("/mainlogin/:id/:tripid/ride",(req,res) => {
    let {id,tripid} = req.params;
  let  {source,destination,distance,ola_price,rickshaw_price} = req.body;
  
  try{
    connection.query("insert into ride_details(id,tripid,source,destination,distance,ola_price,rickshaw_price) values(?,?,?,?,?,?,?)",[id,tripid,req.body.source,req.body.destination,req.body.distance,req.body.ola_price,req.body.rickshaw_price],(err,result) => {
        if(err) throw err;
        // hotels =[id,result];
       console.log(result);
    })
} catch(err){
    console.log(err);
}

res.redirect(`/mainlogin/${id}/planatrip`);
})

app.get("/RideDetails/:id", (req, res) => {
    let { id } = req.params;
    const stationtype = req.query.stationType;
    const transportMode = req.query.transportMode;
    switch (stationtype) {
        case 'inStation':
            res.render("map/instationmenu.ejs", { id: id });
            break;
        case 'outStation':
            switch(transportMode) {
                case 'ola':
                    res.render("map/instationmenu.ejs", { id: id });
                    break;
                case  'trains':
                    res.render("map/train.ejs", { id: id });
                    break;
                default:
                    res.status(400).send('Invalid Option');
            }
            break;
        default:
            res.status(400).send('Invalid Option');
    }
});


// Endpoint to fetch train details based on source and destination
app.post("/mainlogin/mapdetails", (req, res) => {
    // const sourceStation = req.body.source;
    // const destinationStation = req.body.destination;

    let {source,destination} = req.body;

    console.log("%"+req.body.source+"%");

    // Fetch train details from the database based on source and destination
    // try{
    // connection.query("SELECT * FROM trains  where (source_station_name like (?) OR station_name like (?)) AND destination_station_name like (?)",["%"+req.body.source+"%","%"+req.body.source+"%","%"+req.body.destination+"%"], (error, results) => {
    //     if (error) {
    //         console.log(results);
    //         // console.error('Erro fetching trains from database:', error);
    //         // res.status(500).send('Error fetching trains from database');
    //     } else {
    //         // Send the results directly to the client without converting to JSON
    //         res.send(results);
    //     }
    // });

    try{
        connection.query("SELECT * FROM trains  where (source_station_name like (?) OR station_name like (?)) AND destination_station_name like (?)",["%"+req.body.source+"%","%"+req.body.source+"%","%"+req.body.destination+"%"], (error, results) => {
           if(error) throw error;
           console.log(results);
           res.render("map/trainmain.ejs",{data : results});
           // hotels =[id,result];
       //    res.render("hotels/hotelsdetails.ejs",{ hotel : result});
       })
   } catch(error){
       console.log(error);
   }
});



   
app.post("/mainlogin/:id/planatrip/add",(req,res) => {
    let {id} = req.params;
    console.log(id);
let {tripname,startdate,enddate,overallbudget,triptype,destination,source,No_person} = req.body;
let tripid  =Math.floor(Math.random() * (1000000));
let userid = id;

try{
    connection.query("insert into pat (tripid,id,tripname,startdate,enddate,overallbudget,triptype,destination,No_person) values (? , ? , ? , ? , ? , ? ,? , ?,?) ",[tripid,id,req.body.tripname,req.body.startdate,req.body.enddate,req.body.overallbudget,req.body.triptype,req.body.destination,req.body.No_person],(err,result) => {
       if(err) throw err;
       res.redirect(`/mainlogin/${id}/planatrip`);
   })
} catch(err){
   console.log(err);
}

})

// Define the calculation functions
function calculateFinalAmountWithOla(data1, data2, data3) {
    const startdate = data3[0].startdate;
    const enddate = data3[0].enddate;
    var diff = new Date(enddate)- new Date(startdate);
    var no_nights = Math.ceil(diff/(1000*60*60*24));
    var No_person_ola = 4;
    var No_person_hotel = 2;
    var No_of_cabs = Math.ceil(data3[0].No_person / No_person_ola);
    var No_of_hotel_rooms = Math.ceil(data3[0].No_person / No_person_hotel);
    var hotel_final = data1[0].hotel_price * No_of_hotel_rooms * no_nights;
    var attraction_price_all = 0;
    for (let i = 0; i < data1.length; i++) {
        attraction_price_all += data1[i].attraction_price;
    }
    var attraction_final = attraction_price_all * data3[0].No_person;

    var total_ola = 0;
    for (let i = 0; i < data2.length; i++) {
        total_ola += data2[i].ola_price;
    }

    var final_ola_price = total_ola * No_of_cabs;

    return hotel_final + attraction_final + final_ola_price;
}

function calculateFinalAmountWithRickshaw(data1, data2, data3) {
    const startdate = data3[0].startdate;
    const enddate = data3[0].enddate;
    var diff = new Date(enddate)- new Date(startdate);
    var no_nights = Math.ceil(diff/(1000*60*60*24));
    var No_person_ola = 4;
    var No_person_rickshaw = 3;
    var No_of_rickshaw = Math.ceil(data3[0].No_person / No_person_rickshaw);
    var No_person_hotel = 2;
    var No_of_hotel_rooms = Math.ceil(data3[0].No_person / No_person_hotel);
    var hotel_final = data1[0].hotel_price * No_of_hotel_rooms * no_nights;
    var attraction_price_all = 0;
    for (let i = 0; i < data1.length; i++) {
        attraction_price_all += data1[i].attraction_price;
    }
    var attraction_final = attraction_price_all * data3[0].No_person;

    var total_rickshaw = 0;
    for (let i = 0; i < data2.length; i++) {
        total_rickshaw += data2[i].rickshaw_price;
    }

    var final_rickshaw_price = total_rickshaw * No_of_rickshaw;

    return hotel_final + attraction_final + final_rickshaw_price;
}


app.get("/mainlogin/:id/history", (req, res) => {
    let { id } = req.params;
    try {
        
                    connection.query("SELECT * FROM pat where id = ?",id,(err, result) => {
                        if (err) throw err;
                    // console.log(result);
                    res.render("final/triphist.ejs", {
                        data: result,
                    });
                });
    } catch (err) {
        console.log(err);
    }
});


app.get("/mainlogin/:id/history/:tripid", (req, res) => {
    let { id } = req.params;
    let {tripid} = req.params;
    console.log(tripid);
    try {
        connection.query("SELECT * FROM trip_history WHERE (trip_id = ? && user_id = ?)", [tripid,id], (err1, result1) => {
            if (err1) throw err1;
            if(result1[0] != undefined)
                {
            connection.query("SELECT * FROM ride_details WHERE (tripid = ? && id = ?)",[tripid,id], (err2, result2) => {
                if (err2) throw err2;
                connection.query("SELECT * FROM pat WHERE tripid = ?", tripid, (err3, result3) => {
                    if (err3) throw err3;
                

                    // console.log(result1);
                    // console.log(result2);
                    // console.log(result3);

                    // Calculate final amounts
                    let final_amount_with_ola = calculateFinalAmountWithOla(result1, result2, result3);
                    let final_amount_with_rickshaw = calculateFinalAmountWithRickshaw(result1, result2, result3);

                    // Render the EJS template with the calculated values
                    res.render("final/trip_history.ejs", {
                        data1: result1,
                        data2: result2,
                        data3: result3,
                        final_amount_with_ola: final_amount_with_ola,
                        final_amount_with_rickshaw: final_amount_with_rickshaw
                    });
                });
            });
        }else{
            res.redirect(`/mainlogin/${id}/${tripid}`);
        }
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/mainlogin/:id/finalresult",(req,res) => {
    let {id} = req.params;

    console.log(id);

    res.render("map/instation.ejs");
})


app.get("/mainlogin/:id/:tripid",(req,res) => {
    let {id,tripid} = req.params;

    try{
        connection.query("select * from trip_details where tripid = ?",tripid,(err5,result5) => {
           if(err5) throw err5;

           if(result5[0] == undefined)
           {
            connection.query("select * from user where id = ?",id,(err1,result1) => {
           if(err1) throw err1;
           connection.query("select * from pat where tripid = ?",tripid,(err2,result2) => {
            if(err2) throw err2;
            // console.log(result2[0].overallbudget);
            const startdate = result2[0].startdate;
            const enddate = result2[0].enddate;
            var diff = new Date(enddate)- new Date(startdate);
            var no_nights = Math.ceil(diff/(1000*60*60*24));
            let hotel_budget = ((result2[0].overallbudget*25)/100)/no_nights;
            let attraction_budget = (result2[0].overallbudget*10)/100;
            // console.log(hotel_budget);

           connection.query("select * from hotels where price <= ?",hotel_budget,(err3,result3) => {
            if(err3) throw err3;
            connection.query("select * from touristspots where Entrance_Fee_INR <= ? && City = ?",[attraction_budget,result2[0].destination],(err4,result4) => {
                if(err4) throw err4;
                // console.log(result4);
            // console.log(result3);
            
            // console.log(combineData);
           res.render("planatrip/patdetails.ejs",{data1 : result1 , data2 : result2, data3 : result3, data4: result4});
       })
    })
    })
})
           }else{
           res.render("map/estimate.ejs",{data : result5})
           }
           })
            } catch(err){
       console.log(err);
   }
})

// app.post("/mainlogin/pat",(req,res) => {
//      let {checks} = req.body;
//      console.log(checks);
// })

app.get("/mainlogin/:id/:tripid/finalinstation",(req,res) => {
    let {id,tripid} = req.params;
    const stationtype = req.query.stationType;
    const transportMode = req.query.transportMode;
    switch (stationtype) {
        case 'inStation':
            try{
                connection.query("select * from trip_details where tripid = ?",tripid,(err4,result4) => {
                    if(err4) throw err4;
                    connection.query("select * from ride_details where tripid = ?",tripid,(err10,result10) => {
                        if(err10) throw err10;
                        
                res.render("map/instation.ejs",{data : result4, data10 : result10})
            })
        })
                } catch(err){
                   console.log(err);
                }
            break;
        case 'outStation':
            switch(transportMode) {
                case 'ola':
                    try{
                        connection.query("select * from trip_details where tripid = ?",tripid,(err4,result4) => {
                            if(err4) throw err4;
                            connection.query("select * from ride_details where tripid = ?",tripid,(err10,result10) => {
                                if(err10) throw err10;
                                console.log(result10);
                        res.render("map/instation.ejs",{data : result4, data10 : result10})
                    })
                    })
                        } catch(err){
                           console.log(err);
                        }
                    break;
                case  'trains':
                    try{
                        connection.query("select * from trip_details where tripid = ?",tripid,(err4,result4) => {
                            if(err4) throw err4;
                        res.render("map/train.ejs",{data : result4})
                    })
                        } catch(err){
                           console.log(err);
                        }
                    break;
                default:
                    res.status(400).send('Invalid Option');
            }
            break;
        default:
            res.status(400).send('Invalid Option');
    }
})



app.post("/mainlogin/:id/:tripid/pat",(req,res) => {
    let {id,tripid} = req.params;

    console.log(id);
    console.log(tripid);
    //  let tourist = {check,tour} = req.body;
    //  console.log(check);
    //  console.log(tour);
    // for(let i=0;i<50;i++){
    //     console.log(tourist);
    // }
   let tourist = [];
    
    for (let i = 0; i <= 325; i++) {
        if(req.body['tour' + i] != undefined)
        {
        tourist.push([req.body['tour' + i]]);
        }
    }
    console.log(tourist);
    console.log(tourist.length);
     
    
     let check = req.body.checks;
    //  let tourist = [];
    //  for(let i=0;i<=5;i++)
    //  {
    //     tourist = [req.body.tour];
    //  }
    //  console.log(check);
    //  console.log(tourist);
    //  console.log(tour.length);

     try{
        connection.query("select * from hotels where title = ?",check,(err1,result1) => {
            if(err1) throw err1;
            console.log(result1[0].title);

            if(tourist.length == 0)
            {
                connection.query("insert into trip_details (id,tripid,hotel_name,hotel_price,hotel_image,hotel_location,attraction_name,attraction_price,attraction_image,timetovisit) values (?, ? ,? , ? , ? ,? ,? ,? ,? ,?)",[id,tripid,result1[0].title,result1[0].Price,result1[0].image,result1[0].Location,null,null,null,null],(err4,result4) => {
                    if(err4) throw err4;  
             })
            }else{
               for(let i=0;i<tourist.length;i++){
        //    connection.query("select * from pat where id= ?",id,(err3,result3) => {
        //     if(err3) throw err3;
                connection.query("select * from touristspots where Name = ?",[tourist[i]],(err3,result3) => {
                if(err3) throw err3;
               connection.query("insert into trip_details (id,tripid,hotel_name,hotel_price,hotel_image,hotel_location,attraction_name,attraction_price,attraction_image,timetovisit) values (?, ? ,? , ? , ? ,? ,? ,? ,? ,?)",[id,tripid,result1[0].title,result1[0].Price,result1[0].image,result1[0].Location,result3[0].Name,result3[0].Entrance_Fee_INR,result3[0].Image_URL,result3[0].Time_Needed_Hrs],(err4,result4) => {
                 if(err4) throw err4;  
          
        // console.log(result4);
       })
    // })
})
} 
            }
res.redirect(`/mainlogin/${id}/${tripid}`);
    })
    } catch(err){
       console.log(err);
    }
})

app.get("/mainlogin/:id/:tripid/fin",(req,res) => {
   let {id,tripid} = req.params;

    try{
    connection.query("select * from trip_details where tripid = ?",tripid,(err4,result4) => {
        if(err4) throw err4;
    res.render("map/estimate.ejs",{data : result4})
})
    } catch(err){
       console.log(err);
    }
})

app.post("/mainlogin/:id/sendmail", (req, res) => {
    console.log("I am sending mail");
    let { id } = req.params;
    try {
        connection.query("SELECT * FROM trip_history WHERE user_id = ?", [id], (err1, result1) => {
            if (err1) throw err1;
            connection.query("SELECT * FROM ride_details WHERE id = ?", id, (err2, result2) => {
                if (err2) throw err2;
                connection.query("SELECT * FROM pat WHERE tripid = ?", result1[0].trip_id, (err3, result3) => {
                    if (err3) throw err3;
                    connection.query("SELECT * FROM user WHERE id = ?", id, (err4, result4) => {
                        if (err4) throw err4;

                        // Calculate final amounts
                        let final_amount_with_ola = calculateFinalAmountWithOla(result1, result2, result3);
                        let final_amount_with_rickshaw = calculateFinalAmountWithRickshaw(result1, result2, result3);

                        // Render the EJS template with the calculated values
                        transporter.sendMail({
                            to: result4[0].email,
                            subject: "EconoTourist Details",
                            html: `
                                <p>Dear <b>${result4[0].username}</b>,</p>
                                <p>Thank you for using <b>EconoTourist</b>! Here’s a detailed summary of your recent trip expenses:</p>
                                <hr>
                                <h3>Your Expense Breakdown</h3>
                                <ul>
                                    <li><b>Total Amount can be used:</b> ₹${result3[0].overallbudget}</li>
                                    <li><b>Amount Spent with Ola:</b> ₹${final_amount_with_ola}</li>
                                    <li><b>Amount Spent with Rickshaws:</b> ₹${final_amount_with_rickshaw}</li>
                                    <li><b>Total Savings with EconoTourist by using Ola:</b> ₹${result3[0].overallbudget - final_amount_with_ola}</li>
                                    <li><b>Total Savings with EconoTourist by using Rickshaws:</b> ₹${result3[0].overallbudget - final_amount_with_rickshaw}</li>
                                </ul>
                                <hr>
                                <p>By choosing <b>EconoTourist</b>, you have not only saved money but also traveled efficiently and comfortably.</p>
                                <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@econotourist.com">support@econotourist.com</a>.</p>
                                <p><u><b>Thank You for using EconoTourist.</b></u></p>
                                <p><b>The EconoTourist Team</b></p>
                            `
                            
                        }, (err, info) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send("Failed to send the email. Please try again later.");
                            }
                           echo("Email sent: " + info.response);
                            return res.status(200).send("Email has been successfully sent to " + result4[0].email);
                        });


                        res.render("final/trip_history.ejs",{
                            data1: result1,
                            data2: result2,
                            data3: result3,
                            final_amount_with_ola: final_amount_with_ola,
                            final_amount_with_rickshaw: final_amount_with_rickshaw})
                    });
                });
            });
        });

       
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while processing your request.");
    }
});


// function sendMail(to,sub,msg){
//     transporter.sendMail({
//         to:to,
//         subject:sub,
//         html:msg
//     });

//     console.log("Message Send");
// }


app.listen(7000);
