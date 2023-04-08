import Button from 'react-bootstrap/Button';
import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    padding: 20px;
    margin: auto;
    background-color: #212121;

    @media (min-width: 760px) {
        width: 700px;
    }
`;

export const ActionSection = styled.form`
    width: 100%;

    @media (min-width: 760px) {
        flex: 1;
    }
`;

export const UploadBox = styled.div`
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 300px;
    border: 3px dashed #1894ff;
    border-radius: 10px;
    color: #1894ff;
`;

export const UploadTextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const UploadText = styled.label`
    cursor: pointer;
    text-align: center;
    font-size: 20px;
`;

export const UploadInput = styled.input``;

export const AudioContainer = styled.div`
    width: 100%;
`;

export const Audio = styled.audio`
    width: 100%;
    background-color: #212121;
`;

export const Source = styled.source``;

export const TranscribeButtonContainer = styled.div`
    width: 100%;
`;

export const TranscribeButton = styled(Button)``;

export const ResultSection = styled.div`
    width: 100%;

    @media (min-width: 760px) {
        flex: 1;
    }
`;

export const AccuracyContainer = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: ${({ color = 'red' }) => `10px solid ${color}`};
    margin: auto;
    position: relative;
    color: ${({ color = 'red' }) => color};
`;

export const AccuracyTextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const AccuracyLabel = styled.label`
    font-size: 23px;
    margin: 0;
    text-align: center;
`;

export const AccuracyText = styled.p`
    font-size: 28px;
    margin: 0;
    text-align: center;
`;

export const TranscriptionContainer = styled.div`
    width: 100%;
    height: fit-content;
    max-height: 400px;
    background-color: #0f0f0f;
    border: none;
    border-radius: 10px;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const TranscriptionLabel = styled.label`
    font-size: 22px;
    color: #fff;
    margin-bottom: 10px;
    font-weight: 500;
`;

export const TranscriptionText = styled.p`
    color: #fff;
    text-align: justify;
`;

export const LoaderContainer = styled.div`
    position: relative;
    height: 300px;
    width: 100%;
`;

export const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-content: center;
    text-align: center;
`;

export const LoaderText = styled.p`
    font-size: 19px;
    text-align: center;
    color: #fff;
`;