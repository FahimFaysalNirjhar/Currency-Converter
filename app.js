const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");

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
