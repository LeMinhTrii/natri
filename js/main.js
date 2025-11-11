let items = document.querySelectorAll(".faq_content-box .item");
items.forEach((e, i) => {
  e.addEventListener("click", () => {
    const isActive = e.classList.contains("active");
    items.forEach((el) => el.classList.remove("active"));
    if (!isActive) {
      e.classList.add("active");
    }
  });
});

const callDataCustumer = () => {
  const form = document.getElementById("myForm");
  const btn = document.querySelector(".btn-send");

  const url =
    "https://script.google.com/macros/s/AKfycbz-8xWqUa3CLMO8i6X8nDa1rXatpqEhDYya6qpd_Yqp8pd8b4P9H_Z6IwIEedUH7p1k/exec";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    // console.log(data);
    const { location, businessmodel: businessModel } = data;
    if (!location || !businessModel) {
      Snackbar.show({
        pos: "top-center",
        text: "⚠️ Vui lòng chọn Tỉnh/Thành phố và Hình thức kinh doanh!",
        duration: 3000,
        backgroundColor: "#f0ad4e",
      });
      return;
    }
    if (!Object.values(data).some((v) => !v)) {
      try {
        btn.disabled = true;
        btn.textContent = "ĐANG GỬI...";

        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify(data),
        });
        Snackbar.show({
          pos: "top-center",
          showAction: true,
          text: "Cảm ơn bạn đã liên hệ, chúng tôi sẽ phản hồi trong thời gian sớm nhất",
          duration: 3000,
        });
        form.reset();
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        Snackbar.show({
          pos: "top-center",
          text: "❌ Gửi thất bại, vui lòng thử lại sau!",
          duration: 3000,
          backgroundColor: "#f0ad4e",
        });
      } finally {
        btn.disabled = false;
        btn.textContent = "GỬI YÊU CẦU TƯ VẤN";
      }
    }
  });
};

function srcollwd() {
  let headerload = document.querySelector(".load"),
    heightwindow = window.innerHeight,
    temp = document.body.offsetHeight - heightwindow;
  window.addEventListener("scroll", () => {
    headerload.style.width = `${(window.pageYOffset / temp) * 100}%`;
  });
}

const locationFunc = () => {
  const provinces = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Hải Phòng",
    "Đà Nẵng",
    "Cần Thơ",
    "Hà Giang",
    "Cao Bằng",
    "Bắc Kạn",
    "Tuyên Quang",
    "Lào Cai",
    "Yên Bái",
    "Thái Nguyên",
    "Lạng Sơn",
    "Bắc Giang",
    "Phú Thọ",
    "Điện Biên",
    "Lai Châu",
    "Sơn La",
    "Hòa Bình",
    "Hà Nam",
    "Nam Định",
    "Ninh Bình",
    "Thái Bình",
    "Hải Dương",
    "Hưng Yên",
    "Bắc Ninh",
    "Vĩnh Phúc",
    "Quảng Ninh",
    "Thanh Hóa",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Bình",
    "Quảng Trị",
    "Thừa Thiên Huế",
    "Quảng Nam",
    "Quảng Ngãi",
    "Bình Định",
    "Phú Yên",
    "Khánh Hòa",
    "Ninh Thuận",
    "Bình Thuận",
    "Kon Tum",
    "Gia Lai",
    "Đắk Lắk",
    "Đắk Nông",
    "Lâm Đồng",
    "Bình Phước",
    "Tây Ninh",
    "Bình Dương",
    "Đồng Nai",
    "Bà Rịa – Vũng Tàu",
    "Long An",
    "Tiền Giang",
    "Bến Tre",
    "Trà Vinh",
    "Vĩnh Long",
    "Đồng Tháp",
    "An Giang",
    "Kiên Giang",
    "Hậu Giang",
    "Sóc Trăng",
    "Bạc Liêu",
    "Cà Mau",
  ];

  const optionProvine = document.querySelector(
    ".contact_content-form .wrap-input .location"
  );
  if (optionProvine) {
    optionProvine.innerHTML =
      `<option value="" disabled selected>-- Chọn Tỉnh/Thành phố --</option>` +
      provinces.map((p) => `<option value="${p}">${p}</option>`).join("");
  }
};
window.addEventListener("load", () => {
  srcollwd();
});
locationFunc();
callDataCustumer();
