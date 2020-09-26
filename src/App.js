import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Layout from "./Theme/Layout";
import Post from "./Post";
import img1 from "./img/aboutBG.jpeg"
import {db} from "./firebase";


const Wrapper = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  min-height: 100vh;

`;

const Content = styled.div`
    width: 100vw;
  //padding-top: 60px;
  padding: 60px 25%;
  //display: flex;
  //justify-content: space-around;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
  

  
  .left{
  width: 100%;
  height: fit-content;
  grid-column: 1;
  }
  
  .right{
  width: 100%;
  height: fit-content;
  border: 1px solid lightgrey;
  grid-column: 2;
  
  }
  
    ${({theme}) => theme.breakPoint.phone}{
    grid-template-columns: 1fr;
    padding: 60px 10%;
    .right {
    display: none;
    };
  }
`

const Header = styled.div`
  width: 100%;
  height: 54px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 25%;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray};
  background-color: white;
  ${({theme}) => theme.breakPoint.phone}{
    padding: 0 10%;
   
  }
`;


const Img = styled.img`
  object-fit: contain;
`;

function App() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()
                // username: doc.username, caption: doc.caption, imgUrl: doc.imageUrl
                })))
        })
    }, [posts]);
    

    return (
        <Layout>
            <Wrapper>
                <Header>
                    <Img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                         alt="Instagram Logo"
                    />
                    <div>logout</div>
                </Header>
                <Content>
                    <div className="left">
                        {posts.map(({id, data}) => (
                            <Post key={id} data={data}/>
                            ))}

                        {/*{posts.map(({username, caption, imgURL}) => (*/}
                        {/*    <Post username={username} caption={caption} imgURL={imgURL}/>*/}
                        {/*))}*/}
                    </div>
                    <div className="right">
                        asd
                    </div>
                </Content>
            </Wrapper>
        </Layout>
    );
}

export default App;
