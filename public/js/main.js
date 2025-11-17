let sidebar_btn = document.querySelector("#nav-part1");
let sidebar = document.querySelector(".sidebar");
let home = document.querySelector("#home");
let nav = document.querySelector("#nav");
let nav3 = document.querySelector(".nav3");

let sidebar_counter = 0;



sidebar_btn.addEventListener("click" ,()=>{
   if(sidebar_counter == 0)
   {
      sidebar.style.display = "block";
      console.log(sidebar_counter);
      sidebar_counter = 1; 
     
      // home.style.backgroundblendmode =  "darken";
      home.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      nav.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
   }
   else if(sidebar_counter == 1)
   {
      sidebar.style.display = "none"; 
      console.log(sidebar_counter);
      sidebar_counter = 0; 
      // home.style.backgroundblendmode =  "lighten";
      home.style.backgroundColor = "rgba(0, 0, 0, 0)";
      nav.style.backgroundColor = "rgba(0, 0, 0, 0)";
      // home.style.color = "rgba(0, 0, 0, 0)";
   }
});