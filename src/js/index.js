
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base"
import * as searchView from "./view/searchview"
let search = new Search('pasta');
search.doSearch().then(r => console.log(r))
/** 
 * web app state
 * search query result
 */

const state = {}

const controlSearch = async () => {
    /**
     * get key  word  from web
     * create new search object
     * prepare display for searching
     * searching 
     * show result
     */
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
        // console.log(state.search.result)
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
});