import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import './CreatePointStyle.css'
import { logo } from '../../assets'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { api } from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import { Item, UF, City } from '../../models'

export const CreatePointScreen: React.FC = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([]) 

    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0])

    const history = useHistory()

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data)
        })
    },[])

    useEffect(() => {
        axios.get<UF[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then(res => {
            const ufInitials = res.data.map((uf: UF) => uf.sigla)
            setUfs(ufInitials)
        })
    }, [])

    useEffect(() => {
        axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
            const cityNames = res.data.map((city: City) => city.nome)
            setCities(cityNames)
        })
    }, [selectedUf])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition([latitude, longitude])
        })
    },[])

    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
    
        setFormData({ ...formData, [name]: value })
      }
    

    const onSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
        const uf = event.target.value
        setSelectedUf(uf)
    }

    const onSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value
        setSelectedCity(city)
    }

    const onClickMap = (event: LeafletMouseEvent) => {
        setSelectedPosition([event.latlng.lat, event.latlng.lng])
    }

    const onSelectItem = (id: number) => { 
        const isSelected = selectedItems.findIndex((item) => item === id)

        if (isSelected >= 0) {
          const filteredItems = selectedItems.filter((item) => item !== id)
          setSelectedItems(filteredItems)
        } else {
          setSelectedItems([...selectedItems, id])
        }
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items,
        }

        await api.post('/points', data)

        alert('Ponto de coleta criado!')

        history.push('/')

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={onSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                                <input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={onInputChange}
                                />
                        </div>
                    <div className="field">
                        <label htmlFor="whatsapp">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={onInputChange}
                            />
                    </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={initialPosition} zoom={15} onClick={onClickMap}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}/>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={onSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={onSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>    
                                ))} 
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                       {items.map(item => (
                               <li key={item.id} onClick={() => onSelectItem(item.id)} className={selectedItems.includes(item.id) ? 'selected': ''}>
                                   <img src={item.image_url} alt={item.name}/>
                                   <span>{item.name}</span>
                               </li>
                           )
                        )}
                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}