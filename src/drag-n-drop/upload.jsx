import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import './upload.css'
const convertSize=(k)=>Math.round(k/1000)

function Upload({maxSize=500000,pushUp,...others}) {
    const [images, allImages] = useState({})

    useEffect(() => {
    }, [images])

    const newImage=(n)=>{
        for (const i of n) {
            if (i.size<maxSize) {
                if (!others.multiple) {
                    return{i}
                }
                images[i.name]=i; //Explain this line
            }
        }
        return { ...images };
    }
    
    const objToArr=(o)=>{
        Object.keys(o).map((i)=>o[i])
    }

    const pushArr=(p)=>{
        const arrFiles=objToArr(p)
        pushUp(arrFiles);
    }

    const uploadFile=(f)=>{
        const uploaded  = f.target.files; 
        if (uploaded.length) {
            
            const completeUpload= newImage(uploaded);
            allImages(completeUpload)
            pushArr(completeUpload)
        }
    }

    const remove=(e)=>{
        delete images[e];
        allImages({...images})
        pushArr({...images});
    }
    
    return (
        <>
            <section className='bigContainer containers' >
            <Form.Group className="mb-3">
                <Form.Label htmlFor='file-upload' > Click or Drag Images here </Form.Label>
                <input id='file-upload' className='mainBox uploader' title='' value=''  onChange={uploadFile} type="file" {...others}/>
            </Form.Group>
            </section>

            <section>
                <span>To Upload</span>
                <ul className='upload-area' >
                    {Object.keys(images).map((fileName, index) => {
                        let file = images[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <li key={index}>
                                <div>
                                    {isImageFile && (
                                        <img className='preview'
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <div>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertSize(file.size)} kb</span>
                                            <i className="fas fa-trash-alt" onClick={()=>remove(fileName)} />
                                        </aside>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                    <li className="mini-container containers">
                        <Form.Group>
                        <Form.Label htmlFor='mini-file-upload' > Click or Drag Images here </Form.Label>
                            <input id='mini-file-upload' {...others} className='miniBox uploader' onChange={uploadFile}  title='' value='' type="file" />
                        </Form.Group>
                    </li>
                </ul>
            </section>
       
        </>
    )
}

export default Upload
