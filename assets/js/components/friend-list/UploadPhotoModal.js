import React, {Component, Fragment} from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/lab/Slider";

class UploadPhotoModal extends Component {
  constructor(){
    this.state = {
      imageSrc: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 4 / 3,
      croppedAreaPixels: null,
      croppedImage: null,
    };
  }

 async uploadPhoto() {
    const croppedImage = await getCroppedImg(
        this.state.imageSrc,
        this.state.croppedAreaPixels
    );
 };

  onCropChange(crop) {
    this.setState({ crop })
  };

  onCropComplete(croppedArea, croppedAreaPixels) {
    this.setState({ croppedAreaPixels })
  };

  onZoomChange(zoom) {
    this.setState({ zoom })
  };

  async onFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const imageDataUrl = await readFile(e.target.files[0])
      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect:1,
      })
    }
  };

  render() {
    return (
      <div>
        <Modal
          backdrop={false}
          className="UploadPhotoModal"
          show={this.props.showModal}
          dialogClassName={"UploadPhotoModal"}
          onHide={this.props.closeModal}
        >
          <Modal.Body className="modalBodyImageCropper">
              <input type="file" onChange={this.onFileChange} />
              {this.state.imageSrc && (
                  <Fragment>
                    <div className="crop-container">
                      <Cropper
                          image={this.state.imageSrc}
                          crop={this.state.crop}
                          zoom={this.state.zoom}
                          aspect={this.state.aspect}
                          onCropChange={this.onCropChange}
                          onCropComplete={this.onCropComplete}
                          onZoomChange={this.onZoomChange}
                          cropShape="round"
                          showGrid={false}
                      />
                    </div>
                    <div className="controls">
                      <Slider
                          value={this.state.zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e, zoom) => this.onZoomChange(zoom)}
                          classes={{ container: 'slider' }}
                      />
                    </div>
                  </Fragment>
              )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.uploadPhoto} variant="primary">
              Save
            </Button>
            <Button onClick={() => this.props.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file)
  })
}


const createImage = url =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', error => reject(error))
      image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(file)
    }, 'image/jpeg')
  })
}


export default UploadPhotoModal;