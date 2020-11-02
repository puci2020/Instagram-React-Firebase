import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Layout from "./Theme/Layout";
import Post from "./Post";
import {db, auth} from "./firebase";
import {Modal, Button, Input} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import ImageUpload from "./ImageUpload";
import InstagramEmbed from 'react-instagram-embed';

const Wrapper = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  min-height: 100vh;

`;

const Content = styled.div`
  width: 100vw;
  padding: 60px 20%;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  grid-gap: 10px;
  

  
  .left{
      width: 100%;
      height: fit-content;
      grid-column: 1;
  }
  
  .right{
      width: 100%;
      height: auto;
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
  padding: 0 20%;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.gray};
  background-color: white;
  
  .btn{
    font-size: ${({theme}) => theme.font.size.xs};
  }
  ${({theme}) => theme.breakPoint.phone}{
    padding: 0 10%;
   
  }
`;


const Img = styled.img`
  object-fit: contain;
`;

const LoginWrapper = styled.div`

`

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
        fontSize: 12
    }
}));

function App() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);

                if (authUser.displayName) {

                } else {
                    return authUser.updateProfile({
                        displayName: username
                    })
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        }

    }, [user, username]);

    useEffect(() => {
        db.collection('posts').orderBy('timestapm', 'desc').onSnapshot(snapshot => {
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
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));

        setOpen(false);
    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        setOpenSignIn(false);
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
                <Modal
                    open={openSignIn}
                    onClose={() => setOpenSignIn(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <form style={modalStyle} className={classes.paper}>

                        <Img
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt="Instagram Logo"
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
                        <Button type="submit" onClick={signIn}
                                className={classes.item}>Sign In</Button>

                    </form>
                </Modal>
                <Header>

                    <Img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                         alt="Instagram Logo"
                    />
                    {user ? (
                        <Button className="btn" onClick={() => auth.signOut()}>Logout</Button>
                    ) : (
                        <LoginWrapper>
                            <Button className="btn" onClick={handleOpen}>Sign Up</Button>
                            <Button className="btn" onClick={() => setOpenSignIn(true)}>Sign In</Button>

                        </LoginWrapper>
                    )}

                </Header>
                <Content>
                    <div className="left">
                        {posts.map(({id, data}) => (
                            <Post key={id} postId={id} user={user} data={data}/>
                        ))}

                    </div>
                    <div className="right">
                        {/*<InstagramEmbed*/}
                        {/*    url='https://instagr.am/p/Zw9o4/'*/}
                        {/*    maxWidth={320}*/}
                        {/*    hideCaption={false}*/}
                        {/*    containerTagName='div'*/}
                        {/*    protocol=''*/}
                        {/*    injectScript*/}
                        {/*    onLoading={() => {}}*/}
                        {/*    onSuccess={() => {}}*/}
                        {/*    onAfterRender={() => {}}*/}
                        {/*    onFailure={() => {}}*/}
                        {/*/>*/}
                    </div>
                </Content>
                {user?.displayName ? (
                    <ImageUpload username={user.displayName}/>
                ) : (
                    <h3>Sorry you need to login to upload</h3>
                )}
            </Wrapper>
        </Layout>
    );
}

export default App;
