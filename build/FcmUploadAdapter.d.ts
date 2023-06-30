export declare function fcmUploadAdapterPlugin(editor: any): void;
export declare class MyUploadAdapter {
    private loader;
    private isAbort;
    private uploadTask;
    private readonly fcmUploaderFile;
    private readonly fcmGetterNewId;
    private readonly fcmSetImageDb;
    private readonly fcmCompactImageFromFile;
    constructor(loader: any, config?: any);
    upload(): Promise<Error | {
        default: any;
    }>;
    abort(): Promise<void>;
}
