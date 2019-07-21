import "block-ui/jquery.blockUI";
import $ from 'jquery';
import moment from 'moment';
var ehealth = {};

function _isMobile() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|ipad|ipad-pro|ipadpro|ipad_pro|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

ehealth.isMobile = _isMobile()
ehealth.likeSomeThing = (like, callback) => {
    ehealth.ajax.post({
        url: `/api/Event/LikeSomeThing`,
        data: JSON.stringify(like),
        successCallback: (ack) => {
            typeof callback === 'function' && callback();
        },
        unsuccessFunction: () => {
            console.log('loi')
        },
        isNotBlockUI: true
    })
}
ehealth.color = {
    pink: "#ed0678",
    red: "#b81220",
    lightRed: '#f4dcde',
    HMBlue: "#008644",
    fontColorCoop: '#464646',
    blueCoop: '#133c8b',
}
// ehealth blockUI
ehealth.numberOfBlock = 0;
ehealth.blockUI = function (message) {
    var myMessage = '<div class="preloader-light"><div class="preload-spinner"></div>';
    if (message && message.length > 0) {
        myMessage += '<div class="color-green-light center-text" style="' +
            '    /* background: none; */' +
            '    position: absolute;' +
            '    top: 30px;' +
            '    width: 250px;' +
            '    left: calc(50vw - 125px)' +
            '">' + message + '</div>';
    }
    myMessage += '</div>';
    if (ehealth.numberOfBlock === 0) {
        $.blockUI({
            message: myMessage,
            css: {
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'unset',
                left: 'unset',
                width: '100%'
            },
            baseZ: 2000
        });
    }
    ehealth.numberOfBlock++;
};
ehealth.unblockUI = function () {
    ehealth.numberOfBlock--;
    if (ehealth.numberOfBlock <= 0) {
        $.unblockUI();
    }
    if (ehealth.numberOfBlock < 0) ehealth.numberOfBlock = 0;
};

// ehealth guid
ehealth.guid = {
    get: function () {
        return ehealth.guid._get8() + ehealth.guid._get8(true) + ehealth.guid._get8(true) + ehealth.guid._get8();
    },
    _get8: function (s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
};

ehealth.name = {
    toShort: function (name) {
        var result = "";
        result = name.trim();
        var items = result.split(" ");
        items = items.filter(function (i) { return i.length > 0; });
        for (var i = 0; i < items.length - 1; i++) {
            items[i] = (items[i].substring(0, 1) + ".").toUpperCase(); // cat het phan ho, ten lot den cuoi.
        }
        return items.join(" ");
    }
}

ehealth.ajax = {
    send: function (_method, params) {
        if (!params.url) {
            throw (`ehealth ajax parameters must have "url" property`);
        }
        if (params.url.indexOf("/api") != 0) {
            throw ("url must start with '/api'");
        }
        let fullUrl = window.applicationBaseUrl + params.url;
        params.headers = params.headers ? params.headers : {};
        $.ajax({
            url: fullUrl,
            data: params.data,
            method: _method,
            dataType: 'json',
            headers: params.headers,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (xhr) {
                if (!params.isNotBlockUI) {
                    ehealth.blockUI();
                }
            },
            success: function (result, status, xhr) {
                var xhrParse = JSON.parse(xhr.getResponseHeader("X-Responded-JSON"));
                if (xhrParse && xhrParse.status == 401)
                    window.location.replace(window.applicationBaseUrl + "/Account/Login?ReturnUrl=" + window.location.href);
                if (typeof (params.successCallback) === "function") {
                    if (result.isSuccess === true) {
                        params.successCallback(result, status, xhr);
                    } else if (result.isSuccess === false) {
                        //result.errorMessage.map(message => alertify.error(message)); //TODO
                        if (typeof params.unsuccessFunction === 'function') {
                            params.unsuccessFunction(result, status, xhr);
                        }
                    }
                } else {

                }
            },
            error: function (xhr, status, err) {
                if (typeof (params.errorCallback) === "function") {
                    params.errorCallback(xhr, status, err);
                } else {
                    //alertify.error("Lỗi API: " + params._url); //TODO
                }
            },
            complete: function () {
                if (!params.isNotBlockUI) {
                    ehealth.unblockUI();
                }
            }
        });
    },
    // params shapes
    // url: string, 
    // data: model, 
    // successCallback: func, 
    // errorCallback: func, 
    // isNotBlockUI: true thì KHÔNG hiện blockUI, 
    // unsuccessFunction: func, 
    // headers
    get: function (params, url, data, successCallback, errorCallback, isNotBlockUI, unsuccessFunction, headers) {
        ehealth.ajax.send('GET', params);
    },
    post: function (params, url, data, successCallback, errorCallback, isNotBlockUI, unsuccessFunction, headers) {
        ehealth.ajax.send('POST', params);
    }
};

ehealth.uploadFile = function (e, callback, url) {
    if (typeof (FileReader) != "undefined") {
        var img = e.target.files[0];
        var formData = new FormData();
        formData.append('file', img);
        if (img) {
            ehealth.blockUI();
            $.ajax({
                url: window.applicationBaseUrl + (url ? url : '/api/Event/UploadFile'),
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (ack) {
                    if (typeof callback === 'function') {
                        callback(ack);
                    }
                },
                error: function (xhr, status, err) {
                    console.log(xhr);
                    console.log(status);
                    console.log(err);
                },
                complete: () => {
                    ehealth.unblockUI();
                }
            });
        }
    };
}

ehealth.cleanAccents = function (str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
}


// save file from binary
/*
FILE DATA
    Model from server
TYPE   
 - MSExcel: "application/msexcel"
*/
ehealth.saveFileFromBinary = function (fileData, type) {
    let aTag = document.createElement("a");
    const { name, data } = fileData;

    const blob = new Blob([ehealth.b64toBytes(data)], { type: type });
    const url = window.URL.createObjectURL(blob);
    document.body.appendChild(aTag);
    aTag.href = url;
    aTag.download = name;
    aTag.click();
    aTag.remove();
}

ehealth.getPath = function (p) {
    return window.applicationBaseUrl + p;
}

ehealth.getThumbnailUrl = function (p) {
    return p + "&width=" + $(window).width();
}

ehealth.getUrlWithEventId = function (p) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === p) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

ehealth.getEventIdByLocalstorage = function () {
    let event = JSON.parse(localStorage.getItem("event"));
    if (event == null) {
        return null;
    }
    return event.id;
}

ehealth.getDuration = function (time) {
    let now = moment();
    let duration = moment().diff(moment(time), "seconds")
    if (time > now) duration = -duration;
    return duration;
}
// ehealth.downloadFileAttachment = function (url) {
//     if (typeof Native_Download == "function") {
//         try {
//             Native_Download(url);
//         } catch (err) {
//             alert(err);
//         }
//     } else {
//         window.open(url, "_self");
//     }
// }

// ehealth.openGoogleMap = function (position, noNativeMapCallback) {
//     if (typeof Native_OpenMap == "function") {
//         try {
//             var params = position.lng + ',' + position.lat;
//             Native_OpenMap(params);
//         } catch (err) {
//             alert(err);
//         }
//     } else {
//         typeof noNativeMapCallback == "function" && noNativeMapCallback();
//     }
// }


export default ehealth;

