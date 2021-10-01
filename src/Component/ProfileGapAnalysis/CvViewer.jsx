import React, { useEffect, useState } from 'react'
import { URL } from '../../Actions/URL'
import { getLatestCv } from '../../AsyncApiCall/Student'
import PdfViewer from '../../Utils/PdfViewer'
import { isEmptyObject } from '../Validation'

function CvViewer(props) {
    const [ latestCv, setLatestCv ] = useState(null) 
    const [ cvUrl, setCvUrl ] = useState('')

    const studentId = props.match.params.studentId
    const productId = props.match.params.productId

    useEffect(()=>{
        if(props.doctype === "cv"){
            getLatestCv(studentId, productId)
        .then(response=>{
            if(response.status === 200){
                setLatestCv(response.data)
                if(!isEmptyObject(response.data)){
                    setCvUrl(URL+"/api/v1/cv/download/cv/"+studentId+"/"+response.data.path)
                }
            }
        })
        }
        
    }, [])
    return (

     <PdfViewer cvUrl={cvUrl} />
    )
}

export default CvViewer
