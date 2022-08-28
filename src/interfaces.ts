export interface FilePickerConfig {
    multiple?: boolean
    accept?: string | string[]
}

export interface FileContent {
    lastModified: number;
    name: string;
    content: string;
}

interface FileReaderError {
    readerError?: DOMException | null;
}

interface FileLimitError {
    minLimitNotReached?: boolean;
    maxLimitExceeded?: boolean;
}

interface FileSizeError {
    fileSizeToolarge?: boolean;
    fileSizeTooSmall?: boolean;
}

export interface FileError extends FileSizeError, FileReaderError, FileLimitError {
    name?: string;
}

export type FilePickerReturnTypes = [() => void, { plainFiles: File[]; errors: FileError[]; loading: boolean; clear: () => void }];