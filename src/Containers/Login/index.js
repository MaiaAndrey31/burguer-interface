import React from 'react'
import { useForm } from 'react-hook-form'
import {Link, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'react-toastify'
import { useUser } from '../../hooks/UserContext'


import apiBurguer from '../../Services/api'

import {Button, ErrorMessage} from '../../Components'
import LoginImg from '../../Assets/loginImage.svg'
import Logo from '../../Assets/logo.svg'

import {
  Container,
  LoginImage,
  ContainerItems,
  Input,
  CadastroLink,
    Label,
  
} from './style'

export function Login() {
  const history = useHistory()
  const {putUserData} = useUser()



  const schema = yup.object().shape({
    email: yup.string().email('Digite um e-mail válido').required('e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatório').min(6, 'Mínimo 6 digitos'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  

  const onSubmit = async  clientData => {

    const {data} = await toast.promise(
      apiBurguer.post('/sessions', {
        email: clientData.email,
        password: clientData.password
      }),{
        pending: 'Verificando os Dados',
        success: 'Uhull Tudo certo 👌',
        error: 'Tem alguma coisa errada com seu login 🤯'

      }

    )
    
    putUserData(data)

    setTimeout(() => {
      if(data.admin){
        history.push('/pedidos')
      }

      else{
        history.push('/')
      }

    }, 1000)

    
    
    
   

  }
  return (
    <Container>
      <LoginImage src={LoginImg} />
      <ContainerItems>
        <img src={Logo} />
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input type="email" {...register('email')} error={errors.email?.message}/>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Password</Label>
          <Input type='password' {...register('password')} error={errors.password?.message}/>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style= {{marginTop: 75, marginBottom: 25}}>Entrar</Button>
        </form>
        <CadastroLink>
          Ainda não tem cadastro?{' '} <Link style= {{color: 'white'}} to="/cadastro"> SignUp</Link>
        </CadastroLink>
      </ContainerItems>
    </Container>
  )
}

