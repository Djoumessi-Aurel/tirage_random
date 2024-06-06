"use client"
import React, { FormEvent, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { API_root, personne_root } from '@/constants/api'

interface UserForm{
  nom: string
}
const initialState: UserForm = { nom: ''};

export default function TiragePage() {

    const [form, setForm] = useState<UserForm>(initialState);
    const [requestFail, setRequestFail] = useState("");
    const [sending, setSending] = useState(false);
    const [okMessage, setOKMessage] = useState("");

    const toast = useRef<Toast>(null);

    const handleSubmit = async (e: FormEvent) => {
    setRequestFail(''); setSending(true);
    e.preventDefault();

    axios.post(API_root + personne_root + '/tirer', {nom: form.nom}, {
      headers: {
        'Content-Type': 'application/json',
      }
  }).then((response)=>{
    setOKMessage(response.data.message)
  }).catch((error)=>{
        setSending(false)
        let details = (!error.response || error.response?.status == 404) ? "Vérifiez votre connexion internet" : error.response?.data?.message

        setRequestFail(details)
        toast.current?.show({
              severity: 'error',
              summary: "Une erreur est survenue",
              detail: details,
              life: 4000
          })
        })
  }

  const handleChange = (e: any) => setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value})
    
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full max-w-lg m-auto">
      <Toast ref={toast} />
      {
        okMessage ? 
        <div className='text-xl p-5 text-center'>
          {okMessage}
        </div>
      :
        <div className="flex flex-col items-center justify-center px-6 md:px-4 sm:px-2 py-2 mx-auto md:h-screen">
      <div className="flex flex-col justify-center">
          <span className='text-bleu text-center text-3xl my-2 font-bold'>Tirage au sort</span>
          <span className='text-center'>Entrez votre nom puis cliquez sur le bouton "Tirer" pour tirer votre correspondant.</span>    
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom: </label>
                      <input onChange={handleChange} type="text" name="nom" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="votre nom" required autoComplete='off'/>
                  </div>

                  <div className="fail text-red-500 font-bold">
                    {requestFail}
                  </div>
                  {
                    sending && <div className='text-blue-500 font-bold'>Connexion... Patientez svp.</div>
                  }

                  <Button disabled={sending || !form.nom} label="Tirer" type="submit" className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"/>
              </form>
          </div>
      </div>
  </div>
      }
</section>
  )
}
