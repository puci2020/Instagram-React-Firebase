import React, {useState} from 'react';
import styled from "styled-components";
import Layout from "./Theme/Layout";
import Post from "./Post";
import img1 from "./img/aboutBG.jpeg"


const Wrapper = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  min-height: 100vh;

`;

const Content = styled.div`
    width: 100vw;
  //padding-top: 60px;
  padding: 60px 20%;
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
  padding: 0 20%;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray};
  background-color: white;
`;


const Img = styled.img`
  object-fit: contain;
`;

function App() {

    const [posts, setPosts] = useState([
        {
            username: "puci",
            caption: "elo elo",
            imgURL: "https://images.unsplash.com/photo-1599687266725-0d4d52716b86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
            username: "ziom",
            caption: "fajnie",
            imgURL: "https://images.unsplash.com/photo-1581498692102-eae0b781e672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80"
        }
    ]);

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
                        {posts.map(({username, caption, imgURL}) => (
                            <Post username={username} caption={caption} imgURL={imgURL}/>
                            ))}

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
