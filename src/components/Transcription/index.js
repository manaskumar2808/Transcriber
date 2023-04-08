import React, { useCallback, useState } from 'react';
import { AccuracyContainer, AccuracyLabel, AccuracyText, AccuracyTextContainer, ActionSection, Audio, AudioContainer, Container, Loader, LoaderContainer, LoaderText, ResultSection, Source, TranscribeButton, TranscribeButtonContainer, TranscriptionContainer, TranscriptionLabel, TranscriptionText, UploadBox, UploadInput, UploadText, UploadTextContainer } from './styles';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { useDropzone } from 'react-dropzone';

const Transcription = () => { 
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [accuracy, setAccuracy] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);

    
    const handleFileChange = (event) => {
        const f = event.target.files[0];
        console.log(f);
        setFile(f);
        setAudioUrl(URL.createObjectURL(f));
    };

    const handleDrop = useCallback((acceptedFiles) => {
        console.log('acceptedFiles', acceptedFiles);
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const binaryStr = reader.result;
                console.log(binaryStr);
            }
            reader.readAsArrayBuffer(file);
            setFile(file);
            setAudioUrl(URL.createObjectURL(file));
        });
    }, []);
    
    // const handleDragOver = (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    // };

    const { getRootProps, getInputProps } = useDropzone({
        accept: '.wav',
        multiple: false,
        onDrop: handleDrop
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setTranscription("");
        setAccuracy(0.0);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "https://localhost:7024/api/speech-to-text",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                    },
                }
            );

            const { text, confidence } = response.data;

            setTranscription(text);
            const accuracy = (parseFloat(confidence) * 100);
            setAccuracy(accuracy);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError("An error occurred while transcribing the audio.");
            setLoading(false);
        }
    };

    const getAccuracyColor = () => { 
        if (accuracy === null)
            return '#ab0207';

        if (accuracy >= 80.00)
            return '#01801d';
        else if (accuracy >= 60.00)
            return '#bfb300';
        else if (accuracy >= 40.00)
            return '#bf5c00';
        else
            return '#ab0207';
    }

    return (
        <Container>
            <ActionSection onSubmit={handleSubmit}>
                <UploadBox {...getRootProps()}>
                    <UploadTextContainer>
                        <UploadText htmlFor='upload'>
                            {file ? file.name : "Upload File or Drag and drop the file here"}
                        </UploadText>
                    </UploadTextContainer>
                    <UploadInput
                        id='upload'
                        type='file'
                        accept='.wav'
                        hidden
                        onChange={handleFileChange}
                        {...getInputProps()}
                    />
                </UploadBox>
                <div style={{ height: 20 }}></div>
                {audioUrl &&
                    <>
                        <AudioContainer>
                            <Audio controls>
                                <Source src={audioUrl} type='audio/wav' />
                            </Audio>
                        </AudioContainer>
                        <div style={{ height: 20 }}></div>
                    </>
                }
                <TranscribeButtonContainer>
                    <TranscribeButton
                        type='submit'
                        disabled={(file === null || loading)}
                        size='md'
                        variant='primary'
                    >Transcribe</TranscribeButton>
                </TranscribeButtonContainer>
                <div style={{ height: 20 }}></div>
            </ActionSection>
            {loading ? <ResultSection>
                <LoaderContainer>
                    <Loader>
                        <BeatLoader color={"#1894ff"} />
                        <LoaderText>Transcribing audio...</LoaderText>
                    </Loader>
                </LoaderContainer>
            </ResultSection> : transcription ? <ResultSection>
                <TranscriptionLabel>Transcription</TranscriptionLabel>
                <TranscriptionContainer>
                    <TranscriptionText>{transcription}</TranscriptionText>
                </TranscriptionContainer>
                <div style={{ height: 20 }}></div>
                <AccuracyContainer color={getAccuracyColor()}>
                    <AccuracyTextContainer>
                        <AccuracyLabel>Accuracy</AccuracyLabel>
                        <AccuracyText>{accuracy.toFixed(2)}</AccuracyText>
                    </AccuracyTextContainer>
                </AccuracyContainer>
                <div style={{ height: 20 }}></div>
            </ResultSection> : null}
        </Container>
    );
}

export default Transcription;