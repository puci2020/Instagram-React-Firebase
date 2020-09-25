import React from 'react';
import styled from 'styled-components'
import img from './img/aboutBG.jpeg'
import avatar from './img/2.jpg'
import Avatar from '@material-ui/core/Avatar'


const PostWrapper = styled.div`
  max-width: 500px;
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

const Post = ({username, caption, imgURL}) => {
    return (
        <PostWrapper>
            <PostHeader>
                <Avatar className="post__avatar" alt="avatar" src={avatar}/>
                <h3>{username}</h3>
            </PostHeader>
            <Img src={imgURL} alt="Zdjęcie"/>
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
        </PostWrapper>
    );
};

export default Post;
