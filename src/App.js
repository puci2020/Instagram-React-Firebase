import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Layout from "./Theme/Layout";
import Post from "./Post";
import {db, auth} from "./firebase";
import {Modal, Button, Input} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';


const Wrapper = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  min-height: 100vh;

`;

const Content = styled.div`
  width: 100vw;
  padding: 60px 25%;
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
`;

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

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        margin: 5,
    }
}));

function App() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);

                if (authUser.displayName){

                }else{
                    return authUser.updateProfile({
                        displayName: username
                    })
                }
            } else {
                setUser(null);
            }
        });
//1:55
        return () => {
            unsubscribe();
        }

    }, [user, username]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [posts]);

    const handleOpen = () => {
        setOpen(true);
    };

    const signUp = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

    };


    return (
        <Layout>
            <Wrapper>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <form style={modalStyle} className={classes.paper}>

                        <Img
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt="Instagram Logo"
                        />
                        <Input
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={classes.item}
                        />
                        <Input
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.item}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.item}
                        />
                        <Button type="submit" onClick={signUp}
                                className={classes.item}>Sign Up</Button>

                    </form>
                </Modal>
                <Header>
                    <Img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                         alt="Instagram Logo"
                    />
                    <Button onClick={handleOpen}>Sign Up</Button>
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
