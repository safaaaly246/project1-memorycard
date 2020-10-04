
let warpar = document.querySelector(".warparr");

let contain = document.querySelector(".contain");

let row = document.querySelector(".row");

let popUp = document.getElementById("popup")

let arrayImages = []

let arrPic = [];
let arrOverLay = [];
let counter = 0;
let countSuccess = 0;
//==================================== start creat Unique random numbers from 1->12====================
let maxElements = 12

function shuffle(maxElements) {

  for (var temArr = [], i = 0; i < maxElements; i++) {
    temArr[i] = i;
  }

  for (var finalArr = [maxElements], i = 0; i < maxElements; i++) {
    finalArr[i] = temArr.splice(Math.floor(Math.random() * (maxElements - i)), 1)[0];
  }
  return finalArr

}

let random = shuffle(maxElements)

//==================================== end creat Unique random numbers from 1->12====================

// function  click start buttom to display game 
document.querySelector(".start-game").addEventListener("click", function () {
  warpar.style.display = "block"
  this.style.display = "none";
  fetchData()
})


// fetch data from json file 
function fetchData(e) {
  let xhr = new XMLHttpRequest()

  let ulr = "../data.json"
  xhr.open("GET", ulr, true)

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(this.responseText)
      data.forEach((item, index) => {

        arrayImages.push(item.img)

        setTimeout(() => {



          row.innerHTML +=
            `
   <div class="col-lg-4">
     <div class="contain">
     <div class="overlay">Click</div>
        <img class="my-image" src="${arrayImages[random[index]]}" alt="">
     </div>
   </div> 
   `



          let overlayItem = document.querySelectorAll(".overlay");

          overlayItem.forEach(item => {

            item.addEventListener("click", function () {

              item.style.display = "none";

              arrPic.push(this.nextElementSibling.src)

              arrOverLay.push(this)

              counter++

              if (counter == 2) {
                if (arrPic[0] != arrPic[1]) {
                  setTimeout(() => {
                    arrOverLay.forEach(overlay => {
                      overlay.style.display = "block";
                    })
                  }, 150)
                  document.getElementById("incorrect").play()

                }
                else {
                  countSuccess++
                  document.getElementById("correct").play()
                  document.getElementById("correct").currentTime = 0
                }


                setTimeout(() => {
                  counter = 0;
                  arrPic = [];
                  arrOverLay = [];
                }, 150)
                console.log(countSuccess)
                if (countSuccess == 6) {
                  popUp.style.display = "flex"

                }



              }

            })
          })
        }, 1000)

      });
    }
  }
  xhr.send()
}

// ======================================== function to Reset Game ==============================


function reset() {

  document.querySelectorAll(".overlay").forEach(item => {

    item.style.display = "block"
    
  })

  popUp.style.display = "none"

  countSuccess = 0

  let random = shuffle(maxElements)

  document.querySelectorAll(".my-image").forEach((item, index) => {

    item.src = arrayImages[random[index]]

  })

}

