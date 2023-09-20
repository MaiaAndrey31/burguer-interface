import React from 'react'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'

import apiBurguer from '../../Services/api'

import {Button, ErrorMessage} from '../../Components'
import RegImg from '../../Assets/SignupImg.svg'
import Logo from '../../Assets/logo.svg'

import {
  Container,
  RegisterImage,
  ContainerItems,
  Input,
  SignInLink,
  Label,
  
} from './style'

export function Register() {
  const schema = yup.object().shape({
    name: yup.string('Digite um nome').required('Nome é obrigatório'),
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .required('e-mail é obrigatório'),
    password: yup
      .string()
      .required('A senha é obrigatório')
      .min(6, 'Mínimo 6 digitos'),
    confirmPassword: yup
      .string()
      .required('A senha é obrigatório')
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {

    try{
      const {status} = await apiBurguer.post('/users', {
        name: clientData.name,
        email: clientData.email,
        password: clientData.password,
      },{validateStatus: () => true})

      if(status == 201 || status == 200){
        toast.success('Cadastro Realizado Uhull!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })}

        else if(status == 409){
          toast.error('Email já Cadastrado!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
        }
        else{
          throw new Error()
        }

      
    } catch(err) {

      toast.error('Falha no sistema, tente novamente em alguns segundos!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
   
  }
  return (
    <Container>
      <RegisterImage src={RegImg} />
      <ContainerItems>
        <img src={Logo} />
        <h1>Cadastre-se</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 20, marginBottom: 8 }}>
            Cadastrar
          </Button>
        </form>
        <SignInLink>
          Já tem cadastro?{' '} <Link style= {{color: 'white'}} to="/login"> Entrar</Link>
        </SignInLink>
      </ContainerItems>
    </Container>
  )
}

export default Register
