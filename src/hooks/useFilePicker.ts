import { useCallback, useRef, useState } from "react";
import { FileContent, FileError, FilePickerConfig, FilePickerReturnTypes } from "../interfaces"
import { fromEvent, FileWithPath } from 'file-selector';

export const useFilePicker = ({ accept = '*', multiple = true }: FilePickerConfig): FilePickerReturnTypes => {
    // const [files, setFiles] = useState<FileWithPath[]>([]);
    const [plainFiles, setPlainFiles] = useState<File[]>([]);
    // const [filesContent, setFilesContent] = useState<FileContent[]>([]);
    const [fileErrors, setFileErrors] = useState<FileError[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const plainFileObjectsRef = useRef<File[]>([]);

    const onEvent = (evt: Event) => {
        clear();
        const inputElement = evt.target as HTMLInputElement;
        plainFileObjectsRef.current = inputElement.files ? Array.from(inputElement.files) : [];

        setPlainFiles(plainFileObjectsRef.current);
    }

    const openFilePicker = () => {
        const fileExtensions = accept instanceof Array ? accept.join(',') : accept;

        var inputElement = document.createElement('input')
        inputElement.type = 'file';;
        inputElement.style.display = 'none';

        document.body.appendChild(inputElement);

        if (accept !== '*') inputElement.accept = fileExtensions;
        inputElement.multiple = multiple;

        inputElement.addEventListener('change', (arg) => {
            onEvent(arg);
            // remove element
            document.body.removeChild(inputElement);
        });

        inputElement.dispatchEvent(new MouseEvent('click'));
    }

    const clear: () => void = useCallback(() => {
        setPlainFiles([]);
        // setFiles([]);
        // setFilesContent([]);
        setFileErrors([]);
    }, []);

    return [openFilePicker, { plainFiles, errors: fileErrors, loading, clear }]
}