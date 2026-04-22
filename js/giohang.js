let list = [
  {
    id: 1,
    Tensach: "Nà ná na na",
    soluong: 1,
    gia: 1000,
    anh: "../img/adomixi.jpg",
    tacgia: "hơm biec, hơm nhớ",
    date: "30/2/2026",
    tomtat: "Nhạc ấn độ cực hay",
  },
  {
    id: 2,
    Tensach: "Harry Potter and the Sorcerer's Stone",
    soluong: 1,
    gia: 120000,
    anh: "../img/harry1.jpg",
    tacgia: "J.K. Rowling",
    date: "26/06/1997",
    tomtat: "Câu chuyện về cậu bé phù thủy Harry Potter",
  },
  {
    id: 3,
    Tensach: "The Alchemist",
    soluong: 2,
    gia: 90000,
    anh: "../img/alchemist.jpg",
    tacgia: "Paulo Coelho",
    date: "1988",
    tomtat: "Hành trình theo đuổi ước mơ và số phận",
  },
  {
    id: 4,
    Tensach: "To Kill a Mockingbird",
    soluong: 1,
    gia: 110000,
    anh: "../img/mockingbird.jpg",
    tacgia: "Harper Lee",
    date: "1960",
    tomtat: "Câu chuyện về công lý và phân biệt chủng tộc",
  },
  {
    id: 5,
    Tensach: "The Great Gatsby",
    soluong: 3,
    gia: 100000,
    anh: "../img/gatsby.jpg",
    tacgia: "F. Scott Fitzgerald",
    date: "1925",
    tomtat: "Giấc mơ Mỹ và sự suy tàn của nó",
  },
  {
    id: 6,
    Tensach: "1984",
    soluong: 1,
    gia: 95000,
    anh: "../img/1984.jpg",
    tacgia: "George Orwell",
    date: "1949",
    tomtat: "Xã hội toàn trị và giám sát con người",
  },
];

let tbody = document.getElementById("list");
let showtotal = document.getElementById("total");
let xoaBtn = document.getElementById("button-xoa");

let chon = [];
let total = 0;

function render() {
  tbody.innerHTML = "";

  list.forEach((item, i) => {
    tbody.innerHTML += `
            <tr class="listsach">
                <td>${i + 1}</td>
                <td>${item.Tensach}</td>
                <td>${item.soluong}</td>
                <td>${item.gia}</td>
                <td>
                    <label class="checkbox-container">
                        <input type="checkbox" class="check-item" data-id="${item.id}">
                        <span class="checkmark"></span>
                    </label>
                </td>
            </tr>

            <tr class="detail">
                <td colspan="5">
                    <div class="info">
                        <img class="anh" src="${item.anh}">
                        <ul>
                            <li><strong>Tác giả:</strong> ${item.tacgia}</li>
                            <li><strong>Năm xuất bản:</strong> ${item.date}</li>
                            <li><strong>Tóm tắt:</strong> ${item.tomtat}</li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
  });

  attachRowEvents();
  attachCheckboxEvents();
}

function attachRowEvents() {
  let rows = document.querySelectorAll(".listsach");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      let next = row.nextElementSibling;
      if (next && next.classList.contains("detail")) {
        next.classList.toggle("active");
      }
    });
  });
}

function attachCheckboxEvents() {
  let checkboxes = document.querySelectorAll(".check-item");

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", function () {
      let id = Number(this.dataset.id);

      if (this.checked) {
        if (!chon.includes(id)) {
          chon.push(id);
        }
      } else {
        chon = chon.filter((x) => x !== id);
      }

      tinhTongTien();
    });
  });
}

function tinhTongTien() {
  total = 0;

  chon.forEach((id) => {
    let sp = list.find((x) => x.id === id);
    if (sp) {
      total += sp.gia * sp.soluong;
    }
  });

  showtotal.innerText = total;
}

xoaBtn.addEventListener("click", function () {
  list = list.filter((item) => !chon.includes(item.id));

  chon = [];
  total = 0;

  render();
});

render();
const btnMua = document.getElementById("button-mua");
const modal = document.getElementById("qr-modal");
const closeQR = document.getElementById("close-qr");
const qrMoney = document.getElementById("qr-money");

btnMua.addEventListener("click", function () {
  if (chon.length === 0) {
    alert("Chọn sản phẩm trước!");
    return;
  }

  tinhTongTien();

  qrMoney.innerText = "Số tiền: " + total + " VND";

  modal.classList.remove("hidden");
});
document.addEventListener("DOMContentLoaded", function () {
  const closeQR = document.getElementById("close-qr");

  closeQR.addEventListener("click", function () {
    document.getElementById("qr-modal").classList.add("hidden");
  });
});

console.log(closeQR);
