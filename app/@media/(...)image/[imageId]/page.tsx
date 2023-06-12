/* import MediaModalWrapper from '@/ui/modals/MediaModalWrapper'; */
import ImageModal from '@/ui/media/ImageModal';


interface ImageModalPageProps {
    params: {
        imageId: string
    }
}


const ImageModalPage = ({ params: {
    imageId
} }: ImageModalPageProps) => {
    const url = `/api/images/${imageId}`
    return (
        <ImageModal url={url} />
    )
}


ImageModalPage.displayName = "ImageModalPage"


export default ImageModalPage;
