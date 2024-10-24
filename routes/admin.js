const express = require("express");
const Router = express.Router();
const sql_connect = require("../connections/sql_connect");

Router.get("/", (req, res) => {
  res.render("admin/admin");
});
Router.post("/", (req, res) => {
  sql_connect.query("select * from admin", (err, rows, fields) => {
    if (err) {
      console.log("err");
    } else {
      flag = false;
      rows.forEach((data) => {
        console.log(req.body, data);
        if (
          req.body.username === data.admin_username &&
          req.body.userpassword === data.admin_password
        ) {
          flag = true;
        } else {
          console.log(err);
        }
      });
    }
    if (flag) {
      sql_connect.query(
        `select customer.first_name,customer.customer_id,booking.room_id,customer.phone_number,booking.room_details_id,customer.age,payment.no_of_days,bill.payment_pending_status from customer inner join(booking) on customer.customer_id=booking.customer_id,payment inner join(bill) on bill.payment_id=payment.payment_id `,
        (err, rows, fields) => {
          if (err) {
            console.log(err);
          } else {
            
              res.render("admin/adminview", { data: rows });
              console.log(rows);
            
           
          }
        }
      );
    } else {
      console.log("no");
    }
  });
});

Router.get("/:id",(req,res)=>{
  res.render("admin/update",{id:req.params.id})
})
Router.post("/:id",(req,res)=>{
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const city = req.body.city;
  const number = req.body.number;
  const email = req.body.email;
  const age = req.body.age;
sql_connect.query(`update customer set first_name='${firstname}' ,  last_name='${lastname}' , city='${city}' , phone_number=${number} where customer_id=${parseInt(req.params.id)}`,(err,rows)=>{
  console.log(rows,err);
  res.redirect("/admin")
})
})

module.exports = Router;
