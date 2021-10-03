import React, { useState } from 'react'

function Viewer({images,...props}) {
    const [files, setFiles] = useState({});
    return (
        <article>
            <span>To Upload</span>
            <section>
                {Object.keys(files).map((fileName, index) => {
                    let file = files[fileName];
                    let isImageFile = file.type.split("/")[0] === "image";
                    return (
                        <section key={index}>
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
                                        <span>{convertBytesToKB(file.size)} kb</span>
                                        <i className="fas fa-trash-alt" />
                                    </aside>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </section>
        </article>
    )
}

export default Viewer
