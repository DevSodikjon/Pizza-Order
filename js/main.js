const form = document.querySelector("form");
const nameInput = document.querySelector(".nameInput");
const phoneInput = document.querySelector(".phoneInput");
const addressInput = document.querySelector(".addressInput");
const ordered_List = document.querySelector(".ordered_List");
const selectThickness = document.getElementById("selectThickness");
const selectSize = document.getElementById("selectSize");

const checkbox = document.querySelectorAll(".checkbox");
const checkboxAdd = document.querySelectorAll(".checkboxAdd");

let pizza = [];
// const pizzaHaq = {
//     onPizza:[]
// }
const formHandler = (e) =>{
    e.preventDefault();

    const selectoption = [...selectThickness.options]
    .filter((x) => x.selected)
    .map((item) => {
        return item.value;
    })

   

    const selectedOptsSize = [...selectSize.options]
    .filter((x) => x.selected)
    .map((items) => {
        return items.value;
    })

    const pizzaaInfo = {
        id:Math.random().toFixed(2),
        orderNum:pizza.length+1,
        username:nameInput.value,
        phone:phoneInput.value,
        address:addressInput.value,
        pizzaThick:selectoption,
        pizzaSize:selectedOptsSize,
        // costs:costAdd,
        onPizza:[],
        addPizza:[],
        total:0
    };

    let countAddPizz = 0;
    let countOnPizz = 0;
    let totalOnPizz = 0;
    let totalAddPizz = 0;

    function getCheckboxValue(e) {
        if (e.checked) {
          // console.log("getCheckboxValue==",e.name);
          if (e.name == "Pepper" || e.name == "Sausages") {
            pizzaaInfo.addPizza.push(e.name);
            countAddPizz += 1;
          } else {
            pizzaaInfo.onPizza.push(e.name);
            countAddPizz += 1;
          }
        }
      }

      checkbox.forEach((item) => {
        item.addEventListener("change", getCheckboxValue(item));
      });

      let resultCost = 0;
    totalAddPizz = countAddPizz * 3;
    totalOnPizz = countOnPizz * 5;
    resultCost = totalAddPizz + totalOnPizz;
      let dough = 0;
      let size = 0;
      if (selectoption == "Thin") {
        dough = 10;
      } else if (selectoption == "Medium") {
        dough = 12;
      } else if (selectoption == "Thick") {
        dough = 15;
      } else {
        dough = 0;
      }
      if (selectedOptsSize == "25 sm") {
        size = 10;
      } else if (selectedOptsSize == "30 sm") {
        size = 12;
      } else if (selectedOptsSize == "35 sm") {
        size = 15;
      } else {
        size = 0;
      }
    pizzaaInfo.total = resultCost + dough + size;
  

    
    
    function getCheckValue(e) {
        if (e.checked) {
          // console.log("getCheckboxValue==",e.name);
          if (e.name == "Pepper" || e.name == "Sausages") {
            pizzaaInfo.addPizza.push(e.name);
          } else {
            pizzaaInfo.onPizza.push(e.name);
          }
        }
      }
      checkboxAdd.forEach((item) => {
        item.addEventListener("change", getCheckValue(item));
      });
    
    pizza.push(pizzaaInfo)

    nameInput.value = null;
    phoneInput.value = null;
    addressInput.value = null;
    screenPrint();

}



function screenPrint() {
    let result = "";
    
    for (let i = 0; i < pizza.length; i++) {

        result +=`
        <div class="cards  border border-dark" id="${pizza[i].id}">
                         <div class="title d-flex justify-content-between align-items-center" >
                             <h4 class="m-2">Order: ${pizza[i].orderNum}</h4>
                             <i class="ri-delete-bin-line delete fs-4 m-2" onclick="deleteCard(${pizza[i].id})"></i>
                         </div>
                         <div class="info_user m-2">
                             <p><span class="fw-bold">Name: </span>${pizza[i].username}</p>
                             <p><span class="fw-bold">Phone: </span>${pizza[i].phone}</p>
                             <p><span class="fw-bold">Address: </span>${pizza[i].address}</p>
                         </div>
                         <hr>

                         <div class="info_pizza m-2">
                             <p><span class="fw-bold">Dough thickness: </span>${pizza[i].pizzaThick}</p>
                             <p><span class="fw-bold">Size: </span>${pizza[i].pizzaSize}</p>
                             <p><span class="fw-bold">On Pizza: </span>${pizza[i].onPizza}</p>
                             <p><span class="fw-bold">Add: </span>${pizza[i].addPizza}</p>
                         </div>

                         <hr>

                         <div class="text-end m-3">
                         <h5><span>Total: $ ${pizza[i].total}</span></h5>
                         </div>
                   </div>
        `

    }
    ordered_List.innerHTML = result;
}


function deleteCard(elementId) {
    console.log(elementId);
    let delArr = pizza.filter((element) => {
        return +element.id !== elementId;
    })

    pizza = delArr;

    screenPrint()
}




  

form.addEventListener("submit", formHandler);


