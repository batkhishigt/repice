
import Search from "./model/Search";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchview";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import * as likeView from "./view/LikeView";

const state = {}



const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchRes);
        await state.search.doSearch();
        clearLoader(elements.searchRes);
        if (state.search.result === undefined) alert("Хайлтанд тохирох илэрцгүй ");
        else searchView.renderRecipes(state.search.result);
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
});
elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
})
const controlRecipe = async () => {
    // get id from id
    const id = window.location.hash.replace('#', '');

    if (id) {
        // create repice model 
        state.recipe = new Recipe(id);
        // clear display
        recipeView.clearRecipe();
        // download recipe
        renderLoader(elements.recipeDiv);
        recipeView.highlightSelectedRecipe(id);
        await state.recipe.getRecipe();
        clearLoader(elements.recipeDiv);
        // calculate time and ...
        state.recipe.calTime();
        state.recipe.calHuniiToo();
        // show recipe
        recipeView.renderRecipe(state.recipe, state.likes.isLiked(state.recipe.id));
    }
}
window.addEventListener('hashchange', controlRecipe)
window.addEventListener('load', controlRecipe)
window.addEventListener('load', e => {
    if (!state.likes) state.likes = new Like();
    likeView.toggleLikeMenu(state.likes.getNumberOfLikes());
    state.likes.items.forEach(like => likeView.renderLike(like))

})
const controlList = () => {
    state.list = new List();
    listView.clearItem();
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el);
        listView.renderItem(item)
    })

}
const controlLike = () => {
    const currentRecipeId = state.recipe.id;
    if (state.likes.isLiked(currentRecipeId)) {
        likeView.toggleLikeBtn(false)
        state.likes.deleteLike(currentRecipeId)
        likeView.delteLike(currentRecipeId)
    } else {
        likeView.toggleLikeBtn(true)
        const neewLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url)
        likeView.renderLike(neewLike)
    }
    likeView.toggleLikeMenu(state.likes.getNumberOfLikes())
}
elements.recipeDiv.addEventListener('click', e => {
    if (e.target.matches('.recipe__btn, .recipe__btn *')) controlList();
    if (e.target.matches('.recipe__love, .recipe__love *')) controlLike();
})

elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.list.deleteItem(id);

    listView.deleteItem(id);

});
