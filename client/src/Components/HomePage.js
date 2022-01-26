import React,{useEffect, useState} from 'react';
import postService from '../Services/postServices';
import Post from './Post';
import '../App.css';


const HomePage = props =>{
    let [post, setpost] = useState([]);
    let [posts, setposts] = useState([]);
   
    useEffect(()=>{
        postService.allPosts().then(data =>{
            setpost(data);
        })
    },[]);

    const onChangeHandler = e=>{
        let value= e.target.value;
        let filterpost = [];
        postService.allPosts().then(data =>{
            setposts(data);
        })
        if(value.length>0){
            let regexp= new RegExp(`^${value}`,'i');
            filterpost = posts.filter(post => regexp.test(post.title));
            setpost(filterpost);
        }
        else{
            postService.allPosts().then(data =>{
                setpost(data);
            })
        }
    }

    return(
        <div>
            <div className="postsHeader">
                <div className="right">
                <input type="text" 
                       name="title" 
                       placeholder="Search Post..."
                       className="searchPost" 
                       onChange={onChangeHandler}/>
                </div>
            </div>
            <div className = "postHolder">
            {   post.map( post =>{
                return <Post id={post._id} key={post._id} post={post} />
                })
             }
            </div>           
        </div>    
    );

}

export default HomePage;