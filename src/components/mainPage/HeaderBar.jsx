/* eslint-disable */
import React from 'react'
import { useEffect, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button'
import '../../Stylings/headerbar.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth0 } from '@auth0/auth0-react'

function HeaderBar ({onSearch}) {
    const { user, logout } = useAuth0()
    const [searchResult, setSearchResult] = useState('')

    const submit = (e) => {
      console.log(e)
      e.preventDefault()
      onSearch(searchResult.trim())
      setSearchResult('')
    }
    const items = [
        {
           label: user.name,
           icon:'pi pi-fw pi-user',
           items:[
              {
                 label:'Google Meets',
                 icon:'pi pi-fw pi-user',
                 command: () => {window.location.href="https://meet.google.com/"},
              },
              {
                label:'Logout',
                icon:'pi pi-fw pi-power-off',
                command: ()=> logout({ returnTo: window.location.origin }),
             }
           ]
        },
     ];

     const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
     const searchBar = ( 
        <form className="p-inputgroup" onSubmit={submit}>
            <Button icon="pi pi-search" className="p-button-warning" type='submit' />
            <InputText placeholder="Keyword" value={searchResult} onChange={(e) => setSearchResult(e.target.value)}/>
        </form>
    );
  return (

        <Menubar model={items} start={start} end={searchBar} style={{width: '100vw', height:'5em'}}/>
  )
}

export default HeaderBar
