import React,{useState, useEffect} from 'react';
import postServices from '../Services/postServices';
import Message from './Message';


const Create  = props =>{
    // let myPost= JSON.parse(sessionStorage.getItem('selectedPost'));
    // const postTitle = myPost.title; 
    // const postBody = myPost.body; 
    const [post,setpost]=useState({title:"",body:""});
    var [message,setMessage] = useState(null);

    const fetchpost = ()=>{
        postServices.getPostsById(props.match.params.postId).then(data => setpost(data));
    }
    useEffect(()=>{
        fetchpost();
    },[]);

    const onChange = e =>{
        setpost({...post,[e.target.name]:e.target.value});
    }

    const onSubmitHandler = e =>{
        e.preventDefault();
            postServices.update(post._id,post).then(data=>{
                if(data.isSuccessful)
                {
                    props.history.push('/posts');
                }
                else
                setMessage(data.message);
            });
    }

    return(
        <div>
            <form className="creatediv">
                <label htmlFor="title" className="createLabel">Title </label><br/>
                <input type="text" 
                       name="title" 
                       value={post.title}
                       className="bodyInput formInput"
                       onChange={onChange} 
                       placeholder="Enter Title" /><br/>

                 <label htmlFor="body" className="createLabel">Body </label><br/>
                 <textarea name="body" cols="50" rows="10" className="bodyInput formInput" onChange={onChange} value={post.body} /><br/>

                 <button className="btn btn-outline-dark centeredButton" type="submit" name="update"  onSubmit = {onSubmitHandler} >Update</button>
            </form>
            {message? <Message message={message} />:null}
        </div>
        
    );

}

export default Create;