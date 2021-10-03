import React, {useRef, useState} from 'react'
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel
} from "./uploader.style.js";

const fileSize = 500000;
function Uploader({
    label,
    updateFile,
    fileSizeInByte = fileSize,
    ...propses
}) {
    /**
     * React State.
     * Default is an Object.
     * Because Object is easy to manipulate (add/remove). We won't have to iterate it.
     * Again, file with same name won't upload in object.
     */
    const [file,
        isFile] = useState({});

    /**
     * React Refs.
     * Default is null.
     * Ref has taken beacuse we'll have to fetch data from dom element (input type file)
     */
    const field = useRef(null)
    
    /**
     * Click Function.
     * On clicking the button UI, the click will be sent to Dom element (input Type File)
     * The Stunning UI will have this Function
     */
    const clicks = () => {
        field.current.click();
    };
    /**
     * Custom Function.
     * As we've taken the state as an Object, we've to convert it into an array to push it on any DB.
     */
    const objToArray=(n)=>{
        Object.keys(n).map((d)=>n[d])
    }
    
    /**
     * Custom Function.
     * As this File Drag 'n Drop component is/will be a child component of a Paren (Form) Component,
     * We'll have to lift the state up.
     */
    const callUpdate = (files) => {
        const arrayFiles = objToArray(files);
        updateFile(arrayFiles);
    };
    
    /**
     * Custom Function.
     * Traverse the files and returns an object of file
     */
    const pushFile = (p)=>{
        for (const i of p) {
            if (i.size <= fileSize) {
                if (!propses.multiple) {
                    return {i}
                }
                file[i.name]=i;
            }
        }
        return {...file};
    }
    
    /**
     * Main Function.
     */
    const newUpload=(f)=>{
        const {file: newFiles}=f.target;
        if (newFiles.length){
            let upFile = pushFile(newFiles);
            isFile(upFile);
            callUpdate(upFile);
        }
    }
    
    /**
     * Main Function.
     * Function for removing Item from the state
     */
    const removeFile = (fileName) => {
        delete file[fileName];
        isFile({ ...file });
        callUpdate({ ...file });
    };

    const sizeConvert = (bytes) => Math.round(bytes / fileSize);

    return (<> 
    <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
            <UploadFileBtn onClick={clicks} type="button">
            <i className="fas fa-file-upload" />
            <span> Upload {propses.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
            type="file"
                ref={field}
            title=""
            value=""
            onChange={newUpload}
            {...propses}
        />
    </FileUploadContainer>
        <FilePreviewContainer>
            <span>To Upload</span>
            <PreviewList>
                {Object.keys(file).map((fileName, index) => {
                    let allFile = file[fileName];
                    let isImageFile = allFile.type.split("/")[0] === "image";
                    return (
                        <PreviewContainer key={fileName}>
                            <div>
                                {isImageFile && (
                                    <ImagePreview
                                        src={URL.createObjectURL(file)}
                                        alt={`file preview ${index}`}
                                    />
                                )}
                                <FileMetaData isImageFile={isImageFile}>
                                    <span>{allFile.name}</span>
                                    <aside>
                                        <span>{sizeConvert(allFile.size)} kb</span>
                                        <RemoveFileIcon
                                            onClick={() => removeFile(fileName)}
                                            className="fas fa-trash-alt"
                                        />
                                    </aside>
                                </FileMetaData>
                            </div>
                        </PreviewContainer>
                    );
                })}
            </PreviewList>
        </FilePreviewContainer> </>)
}

export default Uploader
