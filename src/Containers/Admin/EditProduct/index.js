import React, { useEffect, useState } from 'react'
import api from '../../../Services/api'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { Container, Label, Input, ButtonStyles, LabelUpload, ContainerInput } from './style'
import ReactSelect from 'react-select'
import { ErrorMessage } from '../../../Components'
import { toast } from 'react-toastify'

function EditProduct() {
  const {
    push,
    location: {
      state: {
        product
      }
    }
  } = useHistory()
 
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o Nome do Produto'),
    price: Yup.string().required('Digite o Preço do Produto'),
    category: Yup.object().required('Selecione uma Categoria'),
    offer: Yup.bool()
    
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    const productDataFormData = new FormData()

    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('category_id', data.category.id)
    productDataFormData.append('file', data.file[0])
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData),
      {
        pending: 'Editando o Produto',
        success: 'Produto Editado com sucesso',
        error: 'Erro ao Editar o Produto',
      }
    )
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
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register('price')}
            defaultValue={product.price}
          />
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
            defaultValue={product.category}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  getOptionValue={(cat) => cat.id}
                  placeholder="Categorias"
                  defaultValue={product.category}
                />
              )
            }}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>

        <ContainerInput>
          <input
            type="checkbox"
            {...register('offer')}
            defaultChecked={product.offer}
          />
          <Label>Produto em Oferta?</Label>
        </ContainerInput>
        <ButtonStyles> Editar Produtos</ButtonStyles>
      </form>
    </Container>
  )
}
export default EditProduct
