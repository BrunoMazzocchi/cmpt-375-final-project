import FileUpload from "@/components/file-upload";
import FileUploadedHandler from "@/components/file-uploaded-handler";
import { useHomeHooks } from "@/services/hooks/home-hooks";

export default function HomeComponent() {
    const { file, isUploaded, blurApplied, handleFileChange, handleUpload, uploadImageBlur, setBlurApplied, downloadFile, isUploadingAnImage, uploadedImageLoading } = useHomeHooks();

    const ImageUploaded = (file: File) => (
        <><h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
            Image uploaded
        </h1>
            <div className="mb-4">
                <FileUploadedHandler file={file} handleBlurChanges={setBlurApplied} sliderUpload={uploadImageBlur} />
            </div>
            <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl"
                onClick={() => downloadFile(file)}>
                Download image
            </button>
        </>
    );

    const ImageToBeUploaded = () => (
        <><h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
            Upload an image
        </h1>
            <div className="mb-4">
                <FileUpload onFileChange={handleFileChange} />
            </div>
            <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl"
                onClick={handleUpload}>
                Upload
            </button>
        </>
    );


    if (isUploaded && file) {
        return ImageUploaded(file);
    } else if (isUploadingAnImage) {
        return (
            <h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
                Uploading...
            </h1>
        );
    } else {
        return ImageToBeUploaded();
    }
}