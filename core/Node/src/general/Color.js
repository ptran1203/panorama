let color = {
    sgc: {
        pink: "#ed0678",
        red: "#b81220",
        lightRed: '#f4dcde',
        HMBlue: "#008644",
        fontColorCoop: '#464646',
        blueCoop: '#133c8b',
        default:'#999999',
        primary:'#9C27B0',
        info: '#9C27B0',
        success: '#FFFFFF',
        warning:'#FF9800',
        danger:'#F44336',
        rose:'#E91E63',
    },
    twitter:'#55ACEE',
    facebook:'#3B5998',
    google:'#DD4B39',
    likedin:'#0976B4',
    youtube:'#E52D27',
    github:'#333333',
};
// nếu muốn sử dụng màu có sẵn của theme ("warning", "success", "info", ...) thì dùng prop color bình thường,
//  nếu muốn custom một màu khác cho components/CustomButtons/Button.jsx 
// vào file này (general/Color.js) thêm ở object buttonColor, ví dụ thêm trường sgcRed thì khi render
// một Button thì có thể truyền prop detailColor="sgcRed" để Button ăn màu color.sgc.red , xem bên dưới
// LƯU Ý: PHẢI MÀU HEXA
{/* <Button detailColor="sgcRed"> OK </Button> */}
var buttonColor = {
    sgcRed: color.sgc.red,
    sgcBlue: color.sgc.blueCoop,
    duy: '#333333',
    sgcDefault: color.sgc.default,
}
export {color, buttonColor};
