export default {
    create : post => {
        return fetch('/user/create',{
            method : "post",
            body : JSON.stringify(post),
            headers : {
                "Content-type" : "Application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    update : (id, post) => {
        return fetch(`/user/update/${id}`,{
            method : "post",
            body : JSON.stringify(post),
            headers : {
                "Content-type" : "Application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    delete : (id) => {
        return fetch(`/user/delete/${id}`,{
            method : "delete",
            headers : {
                "Content-type" : "Application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    getAllPosts : ( ) => {
        return fetch("/user/posts")
               .then(res => res.json())
               .then(data => data);
    },
    allPosts : ( ) => {
        return fetch("/user/allposts")
               .then(res => res.json())
               .then(data => data);
    },
    getPostsById : id => {
        return fetch(`/user/post/${id}`)
               .then(res => res.json())
               .then(data => data);
    },
    likepost : id =>{
        return fetch(`/user/postsliked/${id}`,{
            method : "post",
            headers : {
                "Content-type" : "Application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    unlikepost : id =>{
        return fetch(`/user/unlikepost/${id}`,{
            method : "post",
            headers : {
                "Content-type" : "Application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    ispostLiked : id =>{
        return fetch(`/user/isliked/${id}`)
               .then(res => res.json())
               .then(data => data);
    }
    // getPostsByAuthor : author => {
    //     return fetch(`/author/${author}`)
    //            .then(res => res.json())
    //            .then(data => data);
    // },           
}