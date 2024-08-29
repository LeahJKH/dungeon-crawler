const restart = document.querySelector("#restart");
  
restart.addEventListener("click", function () {
    if (sessionStorage.getItem("userName") != "") {
        location.href = "./game.html";
    } else {
        location.href = "./index.html";
    }
});