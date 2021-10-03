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
} from "./file-upload.styles";

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
     * As we've taken the state as an Object, we've to convert it into an array to push it on DB.
     */
    const objToArray=(n)=>{
        Object.keys(n).map((d)=>n[d])
    }
    
    /**
     * Custom Function.
     * As this File Drag 'n Drop component is/will be a child component of 
     */
    const callUpdate = (files) => {
        const arrayFiles = objToArray(files);
        updateFile(arrayFiles);
    };

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

    const newUpload=(f)=>{
        const {file: newFiles}=f.target;
        if (newFiles.length){
            let upFile = pushFile(newFiles);
            isFile(upFile);
            callUpdate(upFile);
        }
    }

    const removeFile = (fileName) => {
        delete file[fileName];
        isFile({ ...file });
        callUpdate({ ...file });
    };

    return (<> 
    <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
            <UploadFileBtn onClick={clicks} type="button">
            <i className="fas fa-file-upload" />
            <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
            type="file"
            ref={fileInputField}
            title=""
            value=""
            onChange={newUpload}
            {...otherProps}
        />
    </FileUploadContainer>
        <FilePreviewContainer>
            <span>To Upload</span>
            <PreviewList>
                {Object.keys(files).map((fileName, index) => {
                    let file = files[fileName];
                    let isImageFile = file.type.split("/")[0] === "image";
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
                                    <span>{file.name}</span>
                                    <aside>
                                        <span>{convertBytesToKB(file.size)} kb</span>
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
