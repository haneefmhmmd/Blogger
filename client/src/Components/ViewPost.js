import React,{useState, useContext, useEffect,useRef} from 'react';
import postServices from '../Services/postServices';
import Message from './Message';
import {Link, useHistory} from 'react-router-dom';
import  {AuthContext} from '../Context/Context';

const ViewPost  = props =>{
    const history = useHistory();
    let myPost = JSON.parse(sessionStorage.getItem('selectedPost'));
    const postTitle = myPost? myPost.title : ""; 
    const postBody = myPost? myPost.body : "";
    const postDate = myPost? myPost.date : ""; 
    const author = myPost? myPost.author : "";     
    const authContext = useContext(AuthContext);
    const [likes, setLikes] = useState(false);
    const [liked, setLiked] = useState(false);
    const [message, setMessage] = useState(null);
    let [nol,setnol]= useState(myPost? myPost.likes : "");
    let timerId = useRef(null);
    
    const onClickHandler = (e)=>{
        history.push('/updation');
    }
    const likeHandler = (e)=>{
        if(authContext.isAuthenticated){
            setLikes(!likes);
            setLiked(true);
            if(!likes) setnol(nol+1);
            else setnol(nol-1);
        }else{
            setMessage({msgBody:"Please Login to like blogs!", msgError:true});
            timerId = setTimeout(()=>{
                setMessage(null);
            },2000);
        }        
    } 
    useEffect(()=>{
        if(likes){
            console.log(likes);
                myPost.likes+=1;
                postServices.update(myPost._id,myPost).then(document=>{
                sessionStorage.removeItem('selectedPost');
                sessionStorage.setItem('selectedPost',JSON.stringify(document));
            })
        }
        else if(!likes && liked){
            myPost.likes-=1;
            postServices.update(myPost._id,myPost).then(document=>{
            sessionStorage.removeItem('selectedPost');
            sessionStorage.setItem('selectedPost',JSON.stringify(document));
            })
        }
    })

    const deleteHandler = e =>{
        postServices.delete(myPost._id).then(data=>{
            if(data.isSuccessful)
            {
                props.history.push('/posts');
            }
        });
    }
    const getFormattedDate = date => {
        return new Date(Date.parse(date)).toLocaleDateString("en-US", {
           dateStyle: "long"
        });
     };


     return(
        <div className="container mt-5">
            {myPost ? <div className="card">
                            <div className="card-body">
                                <h3 className="card-title  text-center">{postTitle}</h3>
                                <p className="card-text">{postBody}</p>
                                <p>Blogger : {author}<br/>Blogged On : {getFormattedDate(postDate)}</p>
                            </div>
                        </div>: ""}

            
            {  myPost && (authContext.user.username === myPost.author) ?  
                <div className="text-center mt-3">
                    <button className="btn btn-info mx-2" type="button" name="update" onClick={onClickHandler}>Edit</button>
                    <button className="btn btn-danger" type="button" name="Delete" onClick={deleteHandler}>Delete</button>
                </div> : 
                <div className="text-center mt-3">
                    <i className={likes? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true" 
                       style = {{"fontSize" : "40px","style":"#343A40"}} onClick={likeHandler}> {nol} likes</i>
                    {message? <Message className="container my-3" message={message} />:null}
                </div>
                }

        </div>
    );
 
}

export default ViewPost;