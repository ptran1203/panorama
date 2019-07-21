import React from "react";
import ehealth from "../../general/i3app";

class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
  }
  handleImageChange = (e) => {
    ehealth.uploadFile(e, (data) => {
      console.log(data);
      this.props.savePicture(data.data.thumbnailUrl);
    }, '/api/login/UpdateCurrentUserAvatar')
  }

  render() {
    return (
      <div className="picture-container">
        <div className="picture">
          <img
            src={this.props.avatarUrl}
            className="picture-src"
            alt="..."
          />
          <input type="file" onChange={e => this.handleImageChange(e)} />
        </div>
        <h6 className="description">cập nhật ảnh đại diện</h6>
      </div>
    );
  }
}

export default PictureUpload;
