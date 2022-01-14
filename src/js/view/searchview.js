import { elements } from './base';


export const clearSearchQuery = () => {
    elements.searchInput.value = '';
}
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = null;
    elements.pageButtons.innerHTML = null;
}
export const getInput = () => elements.searchInput.value;
const renderRecipe = recipe => {
    let markUp = `
     <li>
        <a class="results__link " href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markUp)
}
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 5) => {
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
}
const createButton = (page, type, deriction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
    <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${deriction}"></use>
    </svg>
    <span>Хуудас ${page}</span>
    </button>`;
const renderButtons = (currentPage, totalPages) => {
    let buttonHTML;

    if (currentPage === 1 && totalPages > 1) {
        // 1 r huudsand bna daraachiin huudsiig gargana
        buttonHTML = createButton(2, 'next', 'right')
    } else if (currentPage < totalPages) {
        // umnu bolon daraachiin huudas ruu shiljih heregtei
        buttonHTML = createButton(currentPage - 1, 'prev', 'left')
        buttonHTML += createButton(currentPage + 1, 'next', 'right')

    } else if (currentPage == totalPages) {
        // hamgiin suuliin huudas
        buttonHTML = createButton(currentPage - 1, 'prev', 'left')
    }
    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHTML)
}
/// type prev and next
