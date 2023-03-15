import { useNavigate} from "react-router-dom";
import { useState } from "react";
import {Container,Wrapper,Title,Form,Input,Button,Link,Error} from "./Style/LoginCss"
import { login } from "../Redux/apiCalls";
import {useDispatch, useSelector} from "react-redux"

const Login = () => {
  
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = (e)=>{
    // to stop refreshing page when use details in not enterd in the field
    e.preventDefault()
    login(dispatch,{username,password})
    // navigation("/");
  }

  const {isFetching,error} = useSelector((state)=>state.user)

  const handleClick =() =>{
    navigation('/register')
  }

  return (

    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>setUserName(e.target.value)}/>
          <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Button onClick={handleLoginClick} disabled={isFetching}>LOGIN</Button>
          {error &&<Error>Something went Wrong</Error>}
          <Link >DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={handleClick}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
