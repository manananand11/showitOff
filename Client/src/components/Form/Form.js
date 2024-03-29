import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style'
import {createPost,updatePost} from '../../actions/posts'

const Form = ({currentId,setCurrentId,clickCount,setClickCount}) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(post) setPostData(post);
    },[post])

    const clear=()=>{
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setClickCount(clickCount+1);
            if(currentId){
                dispatch(updatePost(currentId,postData))
            
                clear();
            }else{
                dispatch(createPost(postData));
                clear();
            }

        
    }
    

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?'Edit':'Create'} a Post</Typography>
                <TextField name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                   />

                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>ADD</Button>
                
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    )
}

export default Form