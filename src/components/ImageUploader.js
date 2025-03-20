import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION,
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET }, 
    region: REGION,
});

const ImageUploader = () => {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = (file) => {
        const params = {
            Body: file,
            Bucket: S3_BUCKET, 
            Key: file.name,
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .send((err) => {
                if (err) {
                    console.log(err);
                } else {
                    alert('File uploaded successfully!');
                }
            });
    };

    return (
        <div>
            <div>Native SDK File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => uploadFile(selectedFile)}>Upload</button>
        </div>
    );
};

export default ImageUploader;