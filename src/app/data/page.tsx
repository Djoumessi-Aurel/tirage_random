"use client"
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { API_root, personne_root } from '@/constants/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import moment from 'moment'
import LoaderDot from '@/components/LoaderDot'


export default function TiragePage() {

    const [requestFail, setRequestFail] = useState("");
    const [sending, setSending] = useState(false);
    const [data, setData] = useState();

    const toast = useRef<Toast>(null);

    useEffect(()=>{
      getData()
    }, [])

    const getData = async () => {
        setRequestFail(''); setSending(true);

        axios.get(API_root + personne_root, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response)=>{
          setSending(false)
          setData(response.data)
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


  const dateTirageBodyTemplate = (rowData: any) => {
    return rowData.date_tirage ? moment(rowData.date_tirage).format("DD/MM/YYYY [à] HH:mm:ss") : ""
  }

    
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full max-w-lg m-auto">
      <Toast ref={toast} />

        <div className="fail text-red-500 font-bold">
          {requestFail}
        </div>
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className='mb-4 text-center font-bold text-xl'>
            Résultats des tirages
          </div>
          {
            sending ?
            <LoaderDot/>
            :
            <DataTable value={data}
            stripedRows showGridlines resizableColumns 
            size="small"
            scrollable scrollHeight="600px"
            removableSort
            dataKey="code_pesee"
            paginator
            rows={50}
            rowsPerPageOptions={[10, 25, 50, 100, 500]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            // paginatorPosition='top'
            // paginatorClassName='table_pesees_paginator'
            emptyMessage={"Aucune personne enregistrée."}
            selectionMode="single"
            tableClassName='table_pesees'
            // cellClassName={(value)=> 'table_pesees_cell'}
          >
            <Column header="" body={(data, options) => options.rowIndex + 1} style={{backgroundColor: "white"}}></Column>
            <Column field="nom" header="Nom" sortable />
            <Column field="a_tire" header="Personne tirée" />
            <Column field="date_tirage" header="Date de tirage" body={dateTirageBodyTemplate} sortable />
          </DataTable>
          }
      </div>
    </section>
  )
}
