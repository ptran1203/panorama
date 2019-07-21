
var imgUrl = name => {
    return `/dist/Contents/images/${name}`;
}

var homePageData = {
    userFullName: "Sơn tùng M-TP",
    banner: [
        { url: imgUrl('banner1.jpg') },
        { url: imgUrl('banner2.jpg') },
        { url: imgUrl('banner3.jpg') },
    ],
    news: [
        {
            title: "Việt Nam - Myanmar: Thử nghiệm cho SEA Games 2019",
            thumbnailUrl: imgUrl("vn-my.jpg"),
            content: "Trận đấu trên sân Việt Trì (Phú Thọ) hôm nay là bước chuẩn bị quan trọng cho U23 Việt Nam, trong hành trình chinh phục tấm HC vàng tại Philippines."
        },
        {
            title: "Cà phê ngon và tương lai của cà phê Việt Nam",
            thumbnailUrl: imgUrl("coffee.jpeg"),
            content: "Cà phê Việt Nam là nguồn nguyên liệu chủ yếu của nhiều hãng sản xuất cà phê lớn trên thế giới. Cà phê là một trong 3 mặt hàng nông sản xuất khẩu chiến luợc quốc gia. Tính đến 2010, diện tích cà phê Việt Nam đạt xấp xỉ 540 ngàn ha, đứng thứ 4 thế giới. Sản lượng đứng thứ 2 TG chỉ sau Brazil và đặc biệt là năng suất đứng đầu thế giới. Thu hút nguồn lao động và tạo công việc được cho người dân Viêt, kích thích niềm đam mê cà phê Viêt."
        },
        {
            title: "Landmark 81 - biểu tượng đất Việt",
            thumbnailUrl: imgUrl("lm81.jpg"),
            content: "The Landmark 81 (vincom landmark 81) là một tòa nhà chọc trời trong tổ hợp dự án Vinhomes Central Park, một dự án có tổng mức đầu tư 40.000 tỷ đồng, do Công ty Cổ phần Đầu tư xây dựng Tân Liên Phát thuộc Vingroup làm chủ đầu tư. Tòa tháp cao 81 tầng( với 3 tầng hầm), hiện tại là tòa nhà cao nhất Việt Nam[2], cao nhất Đông Nam Á và đứng thứ 14 thế giới từ tháng 7 năm 2018. Dự án được xây dựng ở Tân Cảng, quận Bình Thạnh, ven sông Sài Gòn. Dự án được khởi công ngày 26/07/2014."
        },
    ]
}

export { homePageData };