import React from 'react'

function Viewer({ images}) {
    return (
        <article>
            <span>To Upload</span>
            <section>
                {images.map((fileName, index) => {
                    let file = images[fileName];
                    let isImageFile = file.type.split("/")[0] === "image";
                    return (
                        <section key={fileName}>
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
