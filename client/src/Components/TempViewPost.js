import React,{useState, useContext, useEffect,useRef} from 'react';
import postServices from '../Services/postServices';
import {useHistory} from 'react-router-dom';
import  {AuthContext} from '../Context/Context';
import Message from './Message';

const TempViewPost  = ({match}) =>{ 
    const [post, setPost] = useState({});
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const [likes,setLikes] = useState(true);
    let timerId = useRef(null);
    const fetchpost = ()=>{
        postServices.getPostsById(match.params.postId).then(data => setPost(data));
        postServices.ispostLiked(match.params.postId)
                    .then(data=>setLikes(data.isLiked));
    }
    useEffect(()=>{
        fetchpost();
        return  ()=>{
            clearTimeout(timerId);
        }
    },[]);


    const [message,setMessage]= useState(null);


    const onClickHandler = (e)=>{
        history.push(`/updation/${post._id}`);
    }

    const deleteHandler = e =>{
        postServices.delete(post._id).then(data=>{
            if(data.isSuccessful)
            {
                history.push('/posts');
            }
        });
    }
    const getFormattedDate = date => {
        return new Date(Date.parse(date)).toLocaleDateString("en-US", {
           dateStyle: "long"
        });
     };

     const likeHandler = (e)=>{
        if(authContext.isAuthenticated){
            setLikes(!likes);
            if(!likes){
                post.likes+=1;
                postServices.likepost(post._id)
                            .then(data=>{
                                if(data.isSuccessful){
                                    postServices.update(post._id,post)
                                                .then(data =>{
                                                    if(data.message){ 
                                                        setMessage(data.message);
                                                        timerId = setTimeout(()=>{
                                                        setMessage(null);
                                                        },2000);
                                                    }
                                                });
                            }
                                else {
                                    post.like-=1;
                                    setMessage(data.message);
                                    timerId = setTimeout(()=>{
                                        setMessage(null);
                                    },2000);
                                }
                            });
            }
            else if(likes){
                post.likes-=1;
                postServices.unlikepost(post._id)
                            .then(data =>{
                                if(data.isSuccessful){
                                    postServices.update(post._id,post)
                                                .then(data =>{
                                                    if(data.message){
                                                        setMessage(data.message);
                                                        timerId = setTimeout(()=>{
                                                            setMessage(null);
                                                        },2000);
                                                    }
                                                })
                                }
                                else{
                                    post.likes+=1;
                                    setMessage(data.message);
                                    timerId = setTimeout(()=>{
                                        setMessage(null);
                                    },2000);
                                }

                            })
            }
        }else{
            setMessage({msgBody:"Please Login to like blogs!", msgError:true});
            timerId = setTimeout(()=>{
                setMessage(null);
            },2000);
        }        
    } 

    return(
    <div className="container mt-5">
        <div className="card">
            <div className="card-body">
                <h3 className="card-title  text-center">{post.title}</h3>
                <p className="card-text">{post.body}</p>
                <p>Blogger : {post.author}<br/>Blogged On : {getFormattedDate(post.date)}</p>
            </div>
        </div>

    
        {(authContext.user.username === post.author) ?  
            <div className="text-center mt-3">
                <button className="btn btn-info mx-2" type="button" name="update" onClick={onClickHandler}>Edit</button>
                <button className="btn btn-danger" type="button" name="Delete" onClick={deleteHandler}>Delete</button>
            </div> : 
            <div className="text-center mt-3">
                <i className={likes? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true" 
                style = {{"fontSize" : "40px","style":"#343A40"}} onClick={likeHandler}> {post.likes} likes</i>
                {message? <Message className="container my-3" message={message} />:null}
            </div>
        }
    </div>
    );
 
}

export default TempViewPost;