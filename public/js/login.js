let signin = document.querySelector("#signin");
let forform = document.querySelector("#forform");
let login = document.querySelector("#mainbtn");
let forform2 = document.querySelector("#forform2");
let forform1 = document.querySelector("#forform1");
let signinlogin = document.querySelector("#signinlogin");
 let user_name = document.querySelector("#foruser");
let user_email= document.querySelector("#foremail2");
let user_pass = document.querySelector("#forpass2");
let signinbtn = document.querySelector("#mainbtn2");
let confirm = document.querySelector("#forpasscon");
let ifwrong = document.querySelector("#ifwrongpass");
let ifwrongemail = document.querySelector("#ifwrongemail");
let formvalue = 0;


function hide(){
signin.addEventListener("click",function(){
    forform1.style.display = "none";
    forform2.style.display="flex";  
    formvalue = 1;
});
}

hide();

function New(){
    signinlogin.addEventListener("click",function(){
        forform1.style.display = "flex";
        forform2.style.display="none";  
        formvalue = 0;
    });
    }

New();


function checkpass(){
    signinbtn.addEventListener("click",function(){
        let error = 0;
        let size = user_email.value.length;

          for(let i=0;i<size;i++)
          {
              if(user_email.value[i] < 'A' || user_email.value[i] > 'Z')
              {
                   console.log("it okk");            
              }else{
                console.log("wrong emails");
                ifwrongemail.style.visibility = "visible";
                setTimeout(function(){
                    ifwrongemail.style.visibility = "hidden";
                },5000)
                error++;
                break;
              }

          }


         if(user_pass.value != confirm.value)
         {
            console.log("wrong pass");
            ifwrong.style.visibility = "visible";
            setTimeout(function(){
                ifwrong.style.visibility = "hidden";
            },5000)
            error++;
         }else
         {
            console.log("correct pass");
         }
           
         console.log(error);
         if(error == 0)
         {
            signinbtn.type="submit";
         }

         
    });
    }

checkpass();





