import AWS from 'aws-sdk';

const useS3Upload = () => {
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

    const uploadFile = (file, onProgress, onSuccess, onError) => {
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                const progress = Math.round((evt.loaded / evt.total) * 100);
                onProgress(progress);
            })
            .send((err) => {
                if (err) {
                    onError(err);
                } else {
                    onSuccess();
                }
            });
    };

    return { uploadFile };
};

export default useS3Upload;