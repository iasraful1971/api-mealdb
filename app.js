const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value; 
    //clear data
    searchField.value = '';
  if(searchText == ''){
    const quick = document.getElementById('quick');
    quick.innerText ="type something"
  }
  else{
       //load data
       const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
       fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
    }
  }
 

//display

const displaySearchResult = (meals) => {
   const searchResult = document.getElementById('search-result');
   searchResult.textContent = '';
   if(meals.length === 0){
     const alerting = document.getElementById('alert');
     alerting.innerText ="Sorry Could not find"
   }
   meals.forEach(meal => {
       //console.log(meal);
       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML =`
       
       <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
       <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
       </div>
     </div>

       `
       searchResult.appendChild(div)
   });
}
const loadMealDetail = mealId => {
 const url= `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
 fetch(url)
 .then(res => res.json())
 .then(data => displayMealDetail(data.meals[0]))
}
const  displayMealDetail = meal => {
  const mealDEtails =  document.getElementById('meal-details');
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML =`
  <img width="300" src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `
  mealDEtails.appendChild(div)
}