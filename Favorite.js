const favortie = 'FavoriteResturants'



function getResturantsFromDb() {
  const resturants = loadFromStorage(favortie)
  if (resturants) {
    renderFavorite(resturants)
  } else {
    let div = document.querySelector('.favoriteContainer')
    div.innerHTML += '<h3>No Resturant To Show...</h3>'
  }
}



function renderFavorite(arr) {
  let div = document.querySelector('.favoriteCard')
  let str = ''
  arr.forEach((item) => {
    str += `<div class="resturant_information">
<span>Restaurant Name: ${item["Restaurant Name"]}</span>
<span>${item["Address"]}</span>
<span>${item["Cuisines"]}</span>
<span>${item["Has Table booking"]}</span>
<span>${item["Has Online delivery"]}</span>
<div class="btnContainer">
<button class="removeBtn" onclick="removeFromFav('${item["Restaurant ID"]}')">remove me</button>
</div>
</div>`
  })
  div.innerHTML = str
}

function goBack() {
  window.location.href = 'FinalTar.html'

}

function removeFromFav(id) {
  const restaurants = loadFromStorage(favortie);
  const filteredRes = restaurants.filter(item => item["Restaurant ID"] != id);
  console.log(filteredRes)
  saveToStorage(favortie, filteredRes);
  renderFavorite(filteredRes);
}



function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}