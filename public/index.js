const form = document.getElementById('create-form');
const ul = document.getElementById('recipe-results');

const appendRecipe = (recipe) => {
    const li = document.createElement('li');
    li.textContent = `${recipe.title} - ${recipe.ingredients}`;
    ul.appendChild(li);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();


const fd = new FormData(form);

fetch('/api/v1/recipes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: fd.get('title'),
        ingredients: fd.get('ingredients'),
    }),
})
.then((res) => res.json())
.then(appendRecipe);

});

fetch('/api/v1/recipes')
  .then((res) => res.json())
  .then((recipes) => {
    recipes.forEach(appendRecipe);
  });