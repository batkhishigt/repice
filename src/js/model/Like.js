export default class Like {
    constructor() {
        this.readDataFromLocalStorage();
        if (!this.items) this.items = [];
    }
    addLike(id, title, publisher, image) {
        const like = { id, title, publisher, image }
        this.items.push(like)
        this.saveDataToLocalStorage();
        return like
    }
    deleteLike(id) {
        const index = this.items.findIndex(el => el.id === id)
        this.items.splice(index, 1)
        this.saveDataToLocalStorage();
    }
    isLiked(id) {
        return this.items.findIndex(el => el.id === id) !== -1
    }
    getNumberOfLikes() {
        return this.items.length
    }
    saveDataToLocalStorage() {
        localStorage.setItem("likes", JSON.stringify(this.items));
    }
    readDataFromLocalStorage() {
        this.items = JSON.parse(localStorage.getItem('likes'))
    }
}