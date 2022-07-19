import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './ImageUpload.css';
import {Alert, Badge, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = (props) => {
    const arrayBufferToBase64 = (buffer) =>{
        let binary = "";
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const [file, setFile] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const maxFileSize = 3000000;

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            setShowAlert(true)
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = (event) => {
                if (event.target !== null) {
                    const base64 = arrayBufferToBase64(event.target.result);
                    props.setImage(base64);
                    setFile(URL.createObjectURL(file));
                }
            }
            reader.readAsArrayBuffer(file)
        })
    }, [])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg']
        },
        maxSize: maxFileSize,
        onDrop
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <Alert key={file.path}>
            {file.path} successfully uploaded
            {file.size}
        </Alert>
    ));

    const fileRejectionItems = fileRejections.map(({ file }) => (
        <Alert severity="error" key={file.path}>
            {
                file.size > maxFileSize ?
                    'The file is too big' :
                file.type + ' is not allowed as file format'
            }

        </Alert>
    ));

    const unsetImage = () => {
        setFile(null);
        props.setImage(null);
        setShowAlert(false);
    }

    return (
        <section className="wrapper">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {
                    !file &&
                    <div className={'imageUpload__description'}>
                        <CloudUploadIcon color={'secondary'}/>
                        <Typography color={'secondary'} variant={'body2'}>Drag 'n' drop recipe image here, or click to select the image</Typography>
                        <Typography color={'secondary'} variant={'caption'}>(Only *.jpeg and *.png images will be accepted and no larger than 3MB)</Typography>
                    </div>
                }
            </div>
            <aside>
                {
                    showAlert && <div className={'imageUpload__alert'}>{acceptedFileItems}</div>
                }
                <div className={'imageUpload__alert'}>{fileRejectionItems}</div>
            </aside>
            {
                file &&
                    <div className={'imageUpload__container'}>
                    <Badge className={'imageUpload__badge'} onClick={unsetImage} color="secondary" badgeContent={<CloseIcon fontSize={'string'}/>}>
                        <div className={'imageUpload__imageContainer'}>
                            <img src={file} alt={'image'}/>
                        </div>
                    </Badge>
                    </div>
            }
        </section>
    )
}

export default ImageUpload;