let list = JSON.parse(localStorage.getItem("cart")) || [];

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

    rows.forEach(row => {
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

    checkboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            let id = Number(this.dataset.id);

            if (this.checked) {
                if (!chon.includes(id)) {
                    chon.push(id);
                }
            } else {
                chon = chon.filter(x => x !== id);
            }

            tinhTongTien();
        });
    });
}

function tinhTongTien() {
    total = 0;

    chon.forEach(id => {
        let sp = list.find(x => x.id === id);
        if (sp) {
            total += sp.gia * sp.soluong;
        }
    });

    showtotal.innerText = total;
}


xoaBtn.addEventListener("click", function () {
    if (chon.length === 0) {
        alert("Vui lòng chọn sản phẩm muốn xóa");
        return;
    }
    list = list.filter(item => !chon.includes(item.id));
    localStorage.setItem("cart", JSON.stringify(list))
    chon = [];
    total = 0;
    showtotal.innerText = 0;

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

closeQR.addEventListener("click", function () {
    modal.classList.add("hidden");
    list = list.filter(item => !chon.includes(item.id));

    localStorage.setItem("cart", JSON.stringify(list));

    chon = [];
    total = 0;
    showtotal.innerText = 0; 
    render()
});
