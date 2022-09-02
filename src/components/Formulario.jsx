import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`
    

const Formulario = () => {
  const monedas = [
    { id: 'USD', nombre: 'Dolar de Estados Unidos'},
    { id: 'MXN', nombre: 'Peso Mexicano'},
    { id: 'EUR', nombre: 'Euro'},
    { id: 'GBP', nombre: 'Libra Esterlina'},
]
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)
  useEffect(() => {
    const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return objeto
        })

        setCriptos(arrayCriptos)

    }
    consultarAPI();
}, [])
 
    
    // const [state, setState] = useState()
  return (
    <form>
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit 
                    type="submit" 
                    value="Cotizar" 
                />
    </form>
  )
}

export default Formulario
