import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import avatar from './img/2.jpg'
import Avatar from '@material-ui/core/Avatar'
import {Button} from "@material-ui/core";
import {db} from "./firebase";
import firebase from 'firebase'


const PostWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  height: fit-content;
  border: 1px solid ${({theme}) => theme.colors.gray};
  border-radius: 5px;
  text-align: left;
  background-color: white;
  margin-bottom: 45px;
  
  .post__text{
  padding: 10px;
  font-weight: normal;
  font-size: ${({theme}) => theme.font.size.s};
  }
    form{
    display: flex;
    width: 100%;
    height: 40px;
    font-size: ${({theme}) => theme.font.size.m};
    border-top: 1px solid ${({theme}) => theme.colors.gray};
    
      .post__input{
       border: none;
        outline: none;
        width: 90%;
        padding-left: 10px;
      }
      
      .post__button{
        width: 10%;
        font-size: ${({theme}) => theme.font.size.s};
      }
    }
  
`;

const PostHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  
  h3{
  margin-left: 10px;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: contain;
   border-top: 1px solid ${({theme}) => theme.colors.gray};
   border-bottom: 1px solid ${({theme}) => theme.colors.gray};
  //height: auto;
`;

const Post = ({postId, user, data}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", 'asc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        com: doc.data()
                    })))
                })
        }
        return () => {
            unsubscribe();
        };
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setComment('')
    }

    return (
        <PostWrapper>
            <PostHeader>
                <Avatar className="post__avatar" alt="avatar" />
                <h3>{data.username}</h3>
            </PostHeader>
            <Img src={data.imageURL} alt="Zdjęcie"/>
            <h4 className="post__text"><strong>{data.username}</strong> {data.caption}</h4>
            {comments.map(({id, com}) => (
                <h4 key={id} className="post__text"><strong>{com.username}</strong> {com.text}</h4>
            ))}
            <form>
                <input type="text" className="post__input" placeholder="Add a comment..." value={comment}
                       onChange={(e) => setComment(e.target.value)}/>
                <Button type="submit"
                        className="post__button"
                        disabled={!comment}
                        onClick={postComment}
                >
                    Post
                </Button>
            </form>
        </PostWrapper>
    );
};

export default Post;
