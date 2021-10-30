export default class Comment {
    constructor(key, elementId) {
        this.key = key;
        this.comments = fetchComments(key);
        this.comments = this.comments ? this.comments : [];
        this.parentElement = document.getElementById(elementId);
    }

    addComment(comment) {
        this.comments.push(comment);
        onSaveComment(this.key);
        let filtered = this.filterCommentsByName(comment.name);
        renderCommentList(filtered, this.parentElement);
    }

    filterCommentsByName(hikeName) {
        if (!hikeName) {
            return this.comments;
        } else {
            return this.comments ? this.comments.filter(comment => comment.name === hikeName) : [];
        }
    }

    showComments(hikeName) {
        let filtered = this.filterCommentsByName(hikeName);
        renderCommentList(filtered, this.parentElement);
    }
}


function onSaveComment(key, comments) {
    localStorage.setItem(key, JSON.stringify(comments));
}

function renderCommentList(comments, element) {
    if (comments) {
        element.innerHTML = comments.map(comment => renderOneComment(comment)).join("");
    }
}
function fetchComments(key){
    return JSON.parse(localStorage.getItem(key));
}
function renderOneComment(comment) {
    return `<li><div>${comment.name}</div><div>${comment.date}</div><p>${comment.content}</p></li>`;
}