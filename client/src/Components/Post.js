import React from 'react';
import '../App.css';
import {useHistory} from 'react-router-dom';


const Post = (props)=>{
    const history = useHistory();

    const onClickHandler = (e)=>{
        history.push(`/post/${props.post._id}`);
        sessionStorage.setItem('selectedPost',JSON.stringify(props.post));
    }
    const getFormattedDate = date => {
        return new Date(Date.parse(date)).toLocaleDateString("en-US", {
           dateStyle: "long"
        });
     };

    return(  
        <div className="container" onClick={onClickHandler}>
            <div className="card post text-white bg-dark mb-3 shadow rounded">
                <div className="card-body">
                    <h5 className="card-title text-center">{props.post.title}</h5>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Posted On : {getFormattedDate(props.post.date)}</small>
                </div>
            </div>
        </div>
        );

}


export default Post;