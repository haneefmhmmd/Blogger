import React,{useState} from 'react';
import postServices from '../Services/postServices';
import Message from './Message';

const Create  = props =>{

    const [post,setpost]=useState({title:"",body:"",likes: 0});
    var [message,setMessage] = useState(null);

    const onChange = e =>{
        setpost({...post,[e.target.name]:e.target.value});
    }

    const onSubmitHandler = e =>{
        e.preventDefault();
        postServices.create(post).then(data=>{
            if(data.isSuccessful)
                props.history.push('/posts');
        else
            setMessage(data.message);
        });
    }

    return(
        <div>
            <form onSubmit = {onSubmitHandler} className="creatediv">
                <label htmlFor="title" className="createLabel"><b>Title</b></label><br/>
                <input type="text" 
                       name="title" 
                       value={post.title}
                       className="bodyInput formInput"
                       onChange={onChange} 
                       placeholder="Enter Post Title" /><br/>

                 <label htmlFor="body" className="createLabel"><b>Body</b></label><br/>
                 <textarea name="body" cols="50" rows="10"  
                           onChange={onChange} value={post.body} 
                           className="bodyInput formInput" 
                           placeholder="Write your post here ... "/><br/>

                 <button className="btn btn-outline-dark centeredButton" type="submit">Submit</button>
            </form>
            {message? <Message message={message} />:null}
        </div>
        
    );

}

export default Create;