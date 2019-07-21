import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withStyles, CircularProgress } from '@material-ui/core';
import Button from '../components/CustomButtons/Button.jsx';
import $ from 'jquery';
import { CloudUpload } from '@material-ui/icons'

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            filesDirs: [],
            resultPath: null,
            processing: false,
        };

    }

    _searchUpload = () => {
        var files = $('#upload_input')[0].files;
        var fd = []
        Object.keys(files).forEach((key, index) => {
            fd.push(files[key]);
        })
        console.log(fd);
        $.ajax({
            type: 'POST',
            url: "/test",
            dataType: 'json',
            data: fd,
            success: resp => {
                console.log(resp);
            }
        });
    }

    _upload = () => {
        var fd = new FormData($('#upload-file')[0]);
        $.ajax({
            type: 'POST',
            url: '/test',
            data: fd,
            contentType: false,
            dataType: 'json',
            cache: false,
            processData: false,
            success: resp => {
                this.setState({ filesDirs: resp })
            }
        });
    }

    _onChangeFiles = e => {
        var fd = new FormData($('#upload-file')[0]);
        $.ajax({
            type: 'POST',
            url: '/upload_file',
            data: fd,
            contentType: false,
            dataType: 'json',
            cache: false,
            processData: false,
            success: resp => {
                console.log(resp);
                this.setState({ filesDirs: resp }, () => {
                    document.querySelector('#main-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                })
            }
        });
    }

    _stitch = () => {
        this.setState({processing: true, resultPath: null}, () => {
            $.ajax({
                type: 'GET',
                url: '/stitch',
                contentType: false,
                dataType: 'json',
                cache: false,
                processData: false,
                success: resp => {
                    this.setState({ resultPath: resp, processing: false })
                }
            });
        })
        
    }

    render() {
        let { classes } = this.props;
        let { files, filesDirs, resultPath, processing} = this.state;
        return (
            <Fragment>
                <div className={classes.header}>
                    <div className={classes.leftHeader + " animated fadeInLeft fast"}>
                        <p>University of Information Technology</p>
                        <p>Faculty of Computer Science</p>
                    </div>
                    <div className={classes.rightHeader + " animated fadeInRight fast"}>
                        <p>Computer Vision - CS231.J21</p>
                        <p>Lecturer: Dr. Ngo Duc Thanh</p>
                    </div>
                </div>
                <div className={classes.title}>
                    <div>
                        <p className="animated fadeInUp fast">Panorama Stitching</p>
                    </div>
                </div>
                <div className={classes.main}>
                    <form id="upload-file" method="post" encType="multipart/form-data">
                        <input onChange={this._onChangeFiles} style={{ display: "none" }}
                            id="upload_input" name="file" type="file" directory="true" webkitdirectory="true" multiple />
                    </form>
                    <div className={"animated fadeInLeft fast style"} style={{ padding: "0 1rem" }} id="main-section">
                        <Button color="success" onClick={() => { $('#upload_input').click(); }}>
                            <CloudUpload /> Upload
                        </Button>
                        <p>Input: {filesDirs.length} images</p>
                        <div className={classes.imageWrapper}>
                            {filesDirs.map((dir, index) => {

                                return (
                                    <div className={classes.img} key={index}>
                                        <p>{index}</p>
                                        <img src={dir} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {filesDirs.length > 1
                    ? <div style={{ padding: "2rem", textAlign: 'center' }}>
                        <Button color="warning" onClick={this._stitch}>Stitch</Button>
                    </div> : null}
                    {processing
                    ?
                    <div style={{padding: '1rem', textAlign: 'center'}}>
                        <CircularProgress />
                    </div>
                    :null}
                    {resultPath ?
                    <div className={classes.imageResult}>
                        <p>Output: </p>
                        
                            <img src={resultPath} />
                    </div> : null}

            </Fragment>
        );
    }
}



window.renderForm = (dom, props) => {
    ReactDOM.render(
        React.createElement((withStyles({
            imageResult: {
                '& img': {
                    width: '100%',
                    // maxHeight: '180px',
                    border: '1px solid #c4c4c4',
                    borderRadius: '5px',
                },
                overflowX: 'auto',
                width: '100%',
                padding: '1rem 1rem 13rem',
                boxSizing: 'border-box'
            },
            imageWrapper: {
                display: 'inline-flex',
                '& img': {
                    width: '100%',
                    border: '1px solid #c4c4c4',
                    borderRadius: '5px',
                },
                overflowX: 'auto',
                width: '100%',
                padding: '1rem 0',
            },
            img: {
                width: '200px',
                padding: '.5rem',
                flex: 'none'
            },
            main: {

            },
            title: {
                textAlign: 'center',
                '& p': {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    'animation-duration': '2s',
                }
            },
            leftHeader: {
                padding: '1rem',
                float: 'left',
                textAlign: 'left',
            },
            rightHeader: {
                padding: '1rem',
                float: 'right',
                textAlign: 'right'
            },
            header: {
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                height: '80px'
            },
        })(Page)), props),
        dom
    );
};