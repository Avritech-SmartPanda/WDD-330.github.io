
export default class Comment{
    constructor(type, elementId){
        this.type = type; 
        this.list = fetchComments(type);
        this.list = this.list ? this.list : [];
        this.parentElement = document.getElementById(elementId);
    }
   
    addComment(comment){
       this.list.push(comment);
       saveComments(this.type, this.list);
       renderCommentList(this.filterCommentsByName(comment.name), this.parentElement);
    }
   
    filterCommentsByName(name){
       if(!name){
           return this.list
       } else {
           return this.list ? this.list.filter(item => item.name===name) : [];
       }
    }
   
    showComments(name){
        renderCommentList(this.filterCommentsByName(name), this.parentElement);
    }
   }
   
   function fetchComments(key){
       return JSON.parse(localStorage.getItem(key));
   }
   
   function saveComments(key, data){
       localStorage.setItem(key, JSON.stringify(data));
   }
   
   function renderCommentList(list, element){
       if(list){
       element.innerHTML = list.map(item=>renderComment(item)).join("");
       }
   }
   
   function renderComment(item){
       return `<li><div>${item.name}</div><div>${item.date}</div><p>${item.content}</p></li>`;
   }
   