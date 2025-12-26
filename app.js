const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currencyCode in countryList) {
    // console.log(currencyCode, countryList[currencyCode]);
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currencyCode === "BDT") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}
function updateFlag(element) {
  //   console.log(element);
  let currencyCode = element.value;
  //   console.log(currencyCode);
  let countryCode = countryList[currencyCode];
  //   console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

const updateExchange = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  console.log(amountValue);
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = 1;
  }
  console.log(fromCurrency.value);

  let URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
  console.log(URL);
  let response = await fetch(URL);
  let data = await response.json();
  let fromCurrencyValue = fromCurrency.value.toLowerCase();
  let toCurrencyValue = toCurrency.value.toLowerCase();
  let rate = data[fromCurrencyValue][toCurrencyValue];
  console.log(rate.toFixed(2));
  let finalAmount = (amountValue * rate).toFixed(2);
  console.log(finalAmount);
  msg.innerText = `${amountValue} ${fromCurrencyValue.toUpperCase()} = ${finalAmount} ${toCurrencyValue.toUpperCase()}`;
};
btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchange();
});
window.addEventListener("load", () => {
  updateExchange();
});
