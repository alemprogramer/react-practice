import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import './upload.css'
const convertSize=(k)=>Math.round(k/1000)

function Upload({maxSize=500000,pushUp,many}) {
    const [images, allImages] = useState({})

    useEffect(() => {
    }, [images])

    const uploadFile=(f)=>{
        const newFile  = f.target.files; //Please Explain This line
        console.log(newFile);
        if (newFile.length) {
            
        }
    }
    
    return (
        <>
            <section className='bigContainer containers' >
            <Form.Group className="mb-3">
                <Form.Label htmlFor='file-upload' > Click or Drag Images here </Form.Label>
                <input id='file-upload' className='mainBox uploader' title='' value='' onChange={uploadFile} type="file" />
            </Form.Group>
            </section>

            <section>
                <span>To Upload</span>
                <ul className='upload-area' >
                    {Object.keys(images).map((fileName, index) => {
                        let file = images[fileName];
                        console.log('what is file in line 23', file);
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <li key={index}>
                                <div>
                                    {isImageFile && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <div isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertSize(file.size)} kb</span>
                                            <i className="fas fa-trash-alt" />
                                        </aside>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                    <li className="mini-container containers">
                        <Form.Group>
                        <Form.Label htmlFor='mini-file-upload' > Click or Drag Images here </Form.Label>
                            <input id='mini-file-upload' className='miniBox uploader' onChange={uploadFile}  title='' value='' type="file" />
                        </Form.Group>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Upload
