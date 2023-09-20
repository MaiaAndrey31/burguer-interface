import styled from 'styled-components'
import BgLogin from '../../Assets/BgLogin.svg'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('${BgLogin}');
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LoginImage = styled.img`
  height: 90%;
`
export const ContainerItems = styled.div`
  height: 90%;
  background: #373737;
  border-radius: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 50px;

  h1 {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #ffffff;
    
  }

  form {
    display: flex;
    flex-direction: column;
  }
`


export const Label = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #ffffff;
`
export const Input = styled.input`
  width: 391px;
  height: 38px;
  background: #ffffff;
  border-radius: 5px;
  border: ${(props) => (props.error ? '3px solid #CC1717' : 'none')};
  padding-left: 10px;
`

export const CadastroLink = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;

  a {
    cursor: pointer;
    text-decoration: underline;
  }
`
