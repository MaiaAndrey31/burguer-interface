import React, { useEffect, useState } from 'react'
import api from '../../../Services/api'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { Container, Label, Input, ButtonStyles, LabelUpload } from './style'
import ReactSelect from 'react-select'
import { ErrorMessage } from '../../../Components'
import { toast } from 'react-toastify'

function NewProduct() {
  const {push} = useHistory()
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o Nome do Produto'),
    price: Yup.string().required('Digite o Preço do Produto'),
    category: Yup.object().required('Selecione uma Categoria'),
    file: Yup.mixed()
      .test('required', 'Carregue a Imagem', (value) => {
        return value?.length > 0
      })
      // .test('size', 'Carregue arquivos de no maximo 2mb', (value) => {
      //   return value[0]?.size <= 200000
      // })
      .test('type', 'Permitido apenas arquivos jpeg ou png', (value) => {
        return value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/png'
      }),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async data => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])

    await toast.promise( api.post('/products', productDataFormData),{
      pending: 'Criando o Produto',
      success: 'Produto Criado com sucesso',
      error: 'Erro ao Criar o Produto'
    })
    setTimeout(() => {
      push('/lista-produtos')
    }, 2000)
  }

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      setCategories(data)
    }

    loadCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>
        <div>
          <LabelUpload>
            {fileName || (
              <>
                <CloudUploadIcon />
                Carregar Imagem do Produto
              </>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register('file')}
              onChange={(value) => {
                setFileName(value.target.files[0]?.name)
              }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  getOptionValue={(cat) => cat.id}
                  placeholder="Categorias"
                />
              )
            }}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <ButtonStyles> Adicionar Produtos</ButtonStyles>
      </form>
    </Container>
  )
}
export default NewProduct
