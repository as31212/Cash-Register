const cash = document.getElementById("cash");
const changeDrawer = document.getElementById("change-drawer");
const priceContainer = document.getElementById("price");
const purchaseButton = document.getElementById("purchase-btn");
const result = document.getElementById("change-due");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90.0],
  ["FIVE", 55.0],
  ["TEN", 20.0],
  ["TWENTY", 60.0],
  ["ONE HUNDRED", 100.0],
];
cid.forEach((el) => {
  changeDrawer.innerHTML += `
  <p>${el[0]}: $${el[1]}</p>
  `;
});
priceContainer.innerHTML = `<p>$${price}</p>`;
const conditionChecks = (price) => {
  const totalCid = cid.reduce((acc, el) => acc + el[1], 0);
  const cashValue = Number(cash.value).toFixed(2);
  const totalChangeDue = (cashValue - price).toFixed(2);
  if (cashValue < price) {
    return alert("Customer does not have enough money to purchase the item");
  }
  if (cashValue === price.toFixed(2)) {
    result.innerText = "No change due - customer paid with exact cash";
    return;
  }
  if (totalCid < totalChangeDue) {
    result.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  if (totalCid.toFixed(2) === totalChangeDue) {
    calcChangeDue(totalChangeDue, "CLOSED");
  } else {
    calcChangeDue(totalChangeDue, "OPEN");
  }
  console.log(cashValue, price);
};
//initial slightly flawed logic which returns 1 cent off change due to precision issues with floating numbers
/*const calcChangeDue = (totalChangeDue) => {
  const cidUnitValues = [
    0.01, 0.05, 0.1, 0.25, 1.0, 5.0, 10.0, 20.0, 100.0,
  ].map((el) => el.toFixed(2));
  const cidCopy = [...cid];
  let changeRecord = [];
  let currTcd = totalChangeDue;
  for (let i = cidUnitValues.length - 1; i >= 0; i--) {
    if (currTcd / cidUnitValues[i] >= 1 && cidCopy[i][1] !== 0) {
      //logic to ensure the amount withdrawn does not exceed the amount within the drawer
      const changeRemovedFromDrawer =
        Math.floor(currTcd / cidUnitValues[i]) * cidUnitValues[i] >
        cidCopy[i][1]
          ? cidCopy[i][1]
          : Math.floor(currTcd / cidUnitValues[i]) * cidUnitValues[i];

      currTcd -= changeRemovedFromDrawer;
      cidCopy[i].splice(1, 1, cidCopy[i][1] - changeRemovedFromDrawer);
      changeRecord.push([cid[i][0], changeRemovedFromDrawer.toFixed(2)]);
    }
  }
  console.log(changeRecord);
};*/

//attempt to avoid floating number issues by turning all monetary values into cents rather than dollars
const calcChangeDue = (totalChangeDue, status) => {
  const cidUnitValues = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
  const cidCopy = cid.map(([name, amount]) => [name, Math.round(amount * 100)]);
  let changeRecord = [["Status", status]];
  let currTcd = Math.round(totalChangeDue * 100);
  for (let i = cidUnitValues.length - 1; i >= 0; i--) {
    if (currTcd / cidUnitValues[i] >= 1 && cidCopy[i][1] !== 0) {
      //logic to ensure the amount withdrawn does not exceed the amount within the drawer
      const changeRemovedFromDrawer = Math.min(
        cidCopy[i][1],
        Math.floor(currTcd / cidUnitValues[i]) * cidUnitValues[i]
      );

      currTcd -= changeRemovedFromDrawer;
      cidCopy[i].splice(
        1,
        1,
        cidCopy[i][1] - Math.round(changeRemovedFromDrawer)
      );
      changeRecord.push([cid[i][0], changeRemovedFromDrawer]);
    }
  }
  if (currTcd !== 0) {
    result.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  } else {
    cid = cidCopy.map(([name, amount]) => [name, amount / 100]);
  }
  updateUi(changeRecord);
};

const updateUi = (change) => {
  result.innerHTML = "";
  cash.value = "";
  changeDrawer.innerHTML = "";
  result.style.backgroundColor = 'darkblue';
  const changeRecordStrArr = change.map((el) => {
    if (typeof el[1] === "number") {
      return `${el[0]}: $${el[1] / 100}`;
    } else {
      return `${el[0]}: ${el[1]}`;
    }
  });

  changeRecordStrArr.forEach((el) => {
    result.innerHTML += `
      <p>${el}</p>
      `;
  });

  cid.forEach((el) => {
    changeDrawer.innerHTML += `
    <p>${el[0]}: $${el[1]}</p>
    `;
  });

  console.log(changeRecordStrArr);
};
purchaseButton.addEventListener("click", () => {
  conditionChecks(price);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    conditionChecks(price);
  }
});

//finish styles and edit for final edge case in code camp to run the code
