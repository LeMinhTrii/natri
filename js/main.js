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
  btn.addEventListener("click", () => {
    console.log("e");
  });
  const url =
    "https://script.google.com/macros/s/AKfycbzQNEGGeiuzMapZzeHMMQiyJg3c7nKWgjwnrEOK6I1uxFEhOW9LM07b547A0JLg53BJ/exec";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
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

window.addEventListener("load", () => {
  srcollwd();
});
callDataCustumer();
