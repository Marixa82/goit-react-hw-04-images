import { useState} from "react"
import Modal from "../Modal/Modal"
import { ImgGalleryItemLi, ImgGalleryItemImg } from "./ImageGalleryItem.styled"
import PropTypes from 'prop-types';


export default function ImageGalleryItem({hit}) {
  const [showModal, setShowModal] = useState(false)
  const { webformatURL, largeImageURL, tags } = hit;
  
  const toggleModal = () => {
    setShowModal(showModal => !showModal);
 }
    
    return (
      <>
        <ImgGalleryItemLi onClick={toggleModal}>
     <ImgGalleryItemImg src={webformatURL} alt={tags} loading="lazy"/>
        </ImgGalleryItemLi>
        {showModal && (<Modal onClose = {toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}/>)}
      </>
     
   )
}


ImageGalleryItem.propTypes={
    hit: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }),
}