
import Search from "./model/Search";
import Recipe from "./model/Recipe"
import { elements, renderLoader, clearLoader } from "./view/base"
import * as searchView from "./view/searchview"

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


const r = new Recipe(47746);
r.getRecipe();
