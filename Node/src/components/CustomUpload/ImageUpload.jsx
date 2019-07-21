import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.jsx";



class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this._defaultImage = '../dist/assets/img/image_placeholder.jpg';
    this._defaultAvatar = '../dist/assets/img/placeholder.jpg';
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? this._defaultAvatar : this._defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  _uploadImage = (file) => {
      this.props.onChange('need API');
        // let im = new Image();
        // im.onload = () => {
        //     if (typeof (FileReader) != "undefined") {
        //         var img = file;
        //         var formData = new FormData();
        //         formData.append('file', img);
        //         if (img) {
        //             $.ajax({
        //                 url: 'http://localhost:1995/api/Incident/UploadFile?parentId=0&parentType=0',
        //                 type: 'POST',
        //                 data: formData,
        //                 contentType: false,
        //                 crossDomain: true,
        //                 processData: false,
        //                 beforeSend: function (xhr) {
        //                     // $.ehealth.blockUI();
        //                 },
        //                 success: (ack)=> {
        //                     if (ack.isSuccess === true) {
        //                         this.props.onChange(ack.data);
        //                     } else if (ack.isSuccess === false) {
        //                         // ack.messages.map(message => alertify.error(message));
        //                     } else {
        //                         // alertify.error('API ' + _url + ' chạy thành công.');
        //                     }
        //                 },
        //                 error: function (ack) {
        //                     console.log(xhr);
        //                     console.log(status);
        //                     console.log(err);
        //                     // alertify.error('API ' + _url + ' chạy thất bại.');
        //                 },
        //                 complete: function (ack) {
        //                     // $.ehealth.unblockUI();
        //                 }
        //             });
        //         };
        //     };
        // }
        // let _URL = window.URL || window.webkitURL;
        // im.src = _URL.createObjectURL(file);
        
    }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(reader.result)
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this._uploadImage(file);
    };
    reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? this._defaultAvatar : this._defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps
    } = this.props;
    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
