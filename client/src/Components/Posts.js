import React,{useEffect, useState} from 'react';
import postService from '../Services/postServices';
import Post from './Post';
import '../App.css';

const Posts = (props)=>{

    let [post, setpost] = useState([]);
    let [posts, setposts] = useState([]);
   
    useEffect(()=>{
        postService.getAllPosts().then(data =>{
            setpost(data);
        })
    },[]);
    const onClickHandler = (e)=>{
        props.history.push('/create');
    }
    const onChangeHandler = e=>{
        let value= e.target.value;
        let filterpost = [];
        postService.getAllPosts().then(data =>{
            setposts(data);
        })
        if(value.length>0){
            let regexp= new RegExp(`^${value}`,'i');
            filterpost = posts.filter(post => regexp.test(post.title));
            setpost(filterpost);
        }
        else{
            postService.getAllPosts().then(data =>{
                setpost(data);
            })
        }
    }

    return(
        <div>
            <div className="postsHeader">
                <div className="d-flex mt-sm-1 mt-3">
                    <div className="mr-auto px-4">
                        <i className="fa fa-plus-circle createButton" aria-hidden="true" 
                           onClick={onClickHandler} style={{"fontSize": "40px"}}></i>
                    </div>

                    <div className="px-4">
                        <input type="text" 
                        name="title" 
                        placeholder="Search Post..."
                        className="form-control" 
                        onChange={onChangeHandler}
                        />
                    </div>
                </div>       
            </div>
            <div className = "postHolder ">
            {   post.map( post =>{
                return <Post id={post._id} key={post._id} post={post} />
                })
             }
            </div>           
        </div>    
    );


};


export default Posts;

