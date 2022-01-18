import axios from "axios"

export default class Repice {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        const result = await axios("http://forkify-api.herokuapp.com/api/get?rId=" + this.id);
        this.publisher = result.data.recipe.publisher;
        this.ingredients = result.data.recipe.ingredients;
        this.source_url = result.data.recipe.source_url;
        this.image_url = result.data.recipe.image_url;
        this.publisher_url = result.data.recipe.publisher_url;
        this.title = result.data.recipe.title;
        this.social_rank = result.data.recipe.social_rank;
    }
    calTime() {
        this.time = this.ingredients.length * 5;
    }
    calHuniiToo() {
        this.huniiToo = 4;
    }
}