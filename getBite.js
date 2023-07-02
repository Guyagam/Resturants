const favortie = 'FavoriteResturants'
const favoriteRes = []




function GetCuisines() {
  let PriceRange = parseInt(document.getElementById('price').value)
  console.log(PriceRange)
  uniqueCuisines = [];
  for (var i = 0; i < Restaurants.length; i++) {
    var cuisines = Restaurants[i]["Cuisines"].split(',');

    for (var j = 0; j < cuisines.length; j++) {
      var cuisine = cuisines[j].trim();
      if (!uniqueCuisines.includes(cuisine)) {
        uniqueCuisines.push(cuisine)
      }
    }
  }

  str = "";
  str += `<select>`;
  for (var i = 0; i < uniqueCuisines.length; i++) {
    str += `<option> ${uniqueCuisines[i]} </option>`;

  }
  str += `</select>`;
  document.getElementById("opt").innerHTML += str;

}




function FilterByType(arr) {
  let ResType = document.getElementById('opt').value
  var filteredRest = [];
  filteredRest = arr.filter((item) => {
    var trimArr = item.Cuisines.replace(/\s/g, '').split(',')
    return trimArr.includes(ResType)
  })
  return filteredRest
}

function FilterByDelivery(arr) {
  let IsDelivery = document.getElementById('delivery').value
  var ResDelivery = []

  if (IsDelivery === 'משלוח') {
    ResDelivery = arr.filter((item) => {
      return item['Has Online delivery'] === 'Yes'
    })
  }
  else if (IsDelivery === 'לשבת בסניף') {
    ResDelivery = arr.filter((item) => {
      return item['Has Online delivery'] === 'No'
    })
  }
  return ResDelivery
}


function FilterByPrice(arr) {
  let PriceRange = parseInt(document.getElementById('price').value)
  var ResPrice = []
  ResPrice = arr.filter((item) => {
    return item["Price range"] === PriceRange;
  })
  return ResPrice
}


function OnFilter() {
  var firstFilter
  var secondFilter
  var thirdFilter
  let ResType = document.getElementById('opt').value
  let IsDelivery = document.getElementById('delivery').value
  let PriceRange = parseInt(document.getElementById('price').value)

  if (ResType !== null) {
    firstFilter = FilterByType(Restaurants)
  }

  if (IsDelivery !== null) {
    secondFilter = FilterByDelivery(firstFilter)
  }
  if (PriceRange) {
    thirdFilter = FilterByPrice(secondFilter)
  }
  RenderResturant(thirdFilter)
}

function onCancelFilter() {
  RenderResturant()
}

function RenderResturant(arr = Restaurants) {
  let div = document.getElementById('resturantInfo')
  let str = ''
  arr.forEach((item) => {
    str += `<div class="resturant_information">
<span>Restaurant Name: ${item["Restaurant Name"]}</span>
<span>${item["Address"]}</span>
<span>${item["Cuisines"]}</span>
<span>${item["Has Table booking"]}</span>
<span>${item["Has Online delivery"]}</span>
<div class="btnContainer">
<button class="favResturant" onclick="addToFavorite(${item["Restaurant ID"]})">Add</button>
<button id="myBtn" onclick="showMap(${item['Latitude']},${item['Longitude']} )">show on map</button>
<button class="reviewBtn" onclick="addReview()">add review</button>
</div>
<div class="reviewDiv"><h6>Your Reviews</h6></div>
</div>`
  })
  div.innerHTML = str

  GetCuisines()
}


function addToFavorite(id) {
  const resToAdd = Restaurants.find((res) => res["Restaurant ID"] === id);
  if (resToAdd) {
    if (checkIfExcit(resToAdd)) {
      favoriteRes.push(resToAdd)
      saveToStorage(favortie, favoriteRes)
    } else {
      alert('The resturant already excits')
    }
  }
}

function showMap(lat, lan) {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const content = document.querySelector('.modal-content')
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  initMap(lat, lan);
}

function initMap(lat = 32.3425182940201, lan = 34.91240615508821) {
  var mapProp = {
    center: new google.maps.LatLng(lat, lan),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var marker = new google.maps.Marker({
    position: { lat: lat, lng: lan },
    map: map,
    title: "Location"
  });
}

function addReview() {
  const arr = [];
  const div = document.querySelector('.reviewDiv');
  let review = prompt('Do you have any review to share?');
  while (review.toLowerCase() !== 'no') {
    arr.push(review);
    review = prompt('Do you have any other review to share? If you wish to exit please type no');
  }
  let ul = div.querySelector('ul');
  if (!ul) {
    ul = document.createElement('ul');
    ul.classList.add('reviewList');
    div.appendChild(ul);
  }
  arr.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

function checkIfExcit(item) {
  const db = loadFromStorage(favortie)
  if (db === null) {
    return true
  }
  else {
    let checkRes = db.find(R => R["Restaurant ID"] === item["Restaurant ID"])
    console.log(checkRes)
    return (checkRes ? false : true)
  }
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}


function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}


function goToFavorite() {
  window.location.href = 'Favorite.html'
}

function logOut() {
  window.location.href = 'loginForm.html'

}
