const books = [
  {
    id: 1,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    category: "Thiếu nhi",
    year: 1941,
    rating: 4.7,
    price: "79.000đ",
    summary:
      "Tác phẩm kinh điển thiếu nhi Việt Nam kể về hành trình trưởng thành của Dế Mèn qua nhiều chuyến phiêu lưu.",
    image:
      "https://doctruyencotich.vn/upload/icon/20210115/de-men-phieu-luu-ky-chuong-4-cua-nha-van-to-hoai.png",
  },
  {
    id: 2,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    category: "Tiểu thuyết",
    year: 1988,
    rating: 4.8,
    price: "95.000đ",
    summary:
      "Câu chuyện về cậu bé chăn cừu Santiago đi tìm kho báu và khám phá ý nghĩa của ước mơ.",
    image: "https://toptoptrend.com/wp-content/uploads/2024/05/54-1-edited.jpg",
  },
  {
    id: 3,
    title: "Harry Potter và Hòn Đá Phù Thủy",
    author: "J.K. Rowling",
    category: "Giả tưởng",
    year: 1997,
    rating: 4.9,
    price: "120.000đ",
    summary:
      "Phần mở đầu của series Harry Potter, nơi cậu bé phù thủy bắt đầu năm học đầu tiên ở Hogwarts.",
    image: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg",
  },
  {
    id: 4,
    title: "Sherlock Holmes Toàn Tập",
    author: "Arthur Conan Doyle",
    category: "Trinh thám",
    year: 1892,
    rating: 4.8,
    price: "210.000đ",
    summary:
      "Tuyển tập những vụ án nổi tiếng của thám tử Sherlock Holmes cùng bác sĩ Watson.",
    image: "https://images-na.ssl-images-amazon.com/images/I/71KilybDOoL.jpg",
  },
  {
    id: 5,
    title: "Tuổi Thơ Dữ Dội",
    author: "Phùng Quán",
    category: "Văn học Việt Nam",
    year: 1988,
    rating: 4.6,
    price: "145.000đ",
    summary:
      "Tiểu thuyết về những thiếu niên trong kháng chiến, giàu cảm xúc và tinh thần yêu nước.",
    image:
      "https://www.netabooks.vn/Data/Sites/1/Product/28109/tuoi-tho-du-doi-tap-1-2.jpg",
  },
  {
    id: 6,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "Kỹ năng sống",
    year: 1936,
    rating: 4.7,
    price: "89.000đ",
    summary:
      "Cuốn sách kinh điển về nghệ thuật giao tiếp, thuyết phục và xây dựng các mối quan hệ tích cực.",
    image: "https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg",
  },
  {
    id: 7,
    title: "Ông Già Và Biển Cả",
    author: "Ernest Hemingway",
    category: "Văn học kinh điển",
    year: 1952,
    rating: 4.5,
    price: "85.000đ",
    summary:
      "Truyện ngắn nổi tiếng về lòng kiên trì và phẩm giá con người trước nghịch cảnh.",
    image:
      "https://www.netabooks.vn/Data/Sites/1/Product/37203/ong-gia-va-bien-ca-va-hanh-phuc-ngan-ngui-cua-francis-macomber.jpg",
  },
  {
    id: 8,
    title: "Mắt Biếc",
    author: "Nguyễn Nhật Ánh",
    category: "Văn học Việt Nam",
    year: 1990,
    rating: 4.6,
    price: "98.000đ",
    summary:
      "Chuyện tình học trò trong trẻo và day dứt qua góc nhìn của Ngạn dành cho Hà Lan.",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg",
  },
  {
    id: 9,
    title: "Totto-chan Bên Cửa Sổ",
    author: "Kuroyanagi Tetsuko",
    category: "Thiếu nhi",
    year: 1981,
    rating: 4.8,
    price: "92.000đ",
    summary:
      "Hồi ký tuổi thơ thú vị cùng triết lý giáo dục nhân văn tại ngôi trường Tomoe.",
    image:
      "https://nuhado.co/wp-content/uploads/2020/05/totto-chan-ben-cua-so.jpg",
  },
  {
    id: 10,
    title: "Không Gia Đình",
    author: "Hector Malot",
    category: "Thiếu nhi",
    year: 1878,
    rating: 4.7,
    price: "110.000đ",
    summary:
      "Hành trình phiêu bạt của cậu bé Remi đầy gian truân nhưng cũng thấm đẫm tình người.",
    image:
      "https://thegioivanhoc.com/wp-content/uploads/2024/02/khong-gia-dinh.jpg",
  },
  {
    id: 11,
    title: "Chúa Tể Những Chiếc Nhẫn",
    author: "J.R.R. Tolkien",
    category: "Giả tưởng",
    year: 1954,
    rating: 4.9,
    price: "350.000đ",
    summary:
      "Bộ sử thi giả tưởng kinh điển về cuộc chiến chống lại bóng tối ở Trung Địa.",
    image: "https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg",
  },
  {
    id: 12,
    title: "Bố Già",
    author: "Mario Puzo",
    category: "Tiểu thuyết",
    year: 1969,
    rating: 4.8,
    price: "135.000đ",
    summary:
      "Tiểu thuyết nổi tiếng về gia đình mafia Corleone và những xung đột quyền lực.",
    image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
  },
];

const actionsHtml = `
  <div class="card-actions">
    <button type="button" class="btn-cart">Thêm vào giỏ hàng</button>
    <button type="button" class="btn-buy">Mua</button>
  </div>
`;

const anotheractions = `
  <div class="addaction">
    <button type="button" class="btn-title">Xem chi tiết</button>
  </div>
`;

function normalize(str) {
  return String(str).trim().toLowerCase();
}

function bookMatchesQuery(book, query) {
  const q = normalize(query);
  if (!q) return true;
  return (
    normalize(book.title).includes(q) ||
    normalize(book.author).includes(q) ||
    normalize(book.category).includes(q)
  );
}

function renderBooks(searchText = "") {
  const container = document.getElementById("productList");
  const filteredBooks = books.filter((book) =>
    bookMatchesQuery(book, searchText),
  );

  if (filteredBooks.length === 0) {
    container.innerHTML =
      '<p class="no-results" role="status">Không có sách nào phù hợp.</p>';
    return;
  }

  container.innerHTML = "";

  filteredBooks.forEach((book) => {
    const card = `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
            <div class="card-img-wrap">
              <img src="${book.image}" alt="${book.title}">
            </div>
            <h3>${book.title}</h3>
            ${actionsHtml}
          </div>
          <div class="card-back">
            <div class="card-details">
              <p><strong>Tên sách:</strong> ${book.title}</p>
              <p><strong>Tên tác giả:</strong> ${book.author}</p>
              <p><strong>Thể loại:</strong> ${book.category}</p>
            </div>
            ${actionsHtml}
            ${anotheractions}
          </div>
        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}

const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("productList");
const detailOverlay = document.getElementById("detailOverlay");
const detailCloseBtn = document.getElementById("detailCloseBtn");
const detailImage = document.getElementById("detailImage");
const detailInfo = document.getElementById("detailInfo");
const detailSummary = document.getElementById("detailSummary");
const suggestList = document.getElementById("suggestList");

function renderSuggestions(currentBook) {
  const suggestions = books
    .filter(
      (book) =>
        book.id !== currentBook.id && book.category === currentBook.category,
    )
    .slice(0, 4);

  suggestList.innerHTML = "";
  suggestions.forEach((book) => {
    const card = document.createElement("article");
    card.className = "suggest-card";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h4>${book.title}</h4>
      <div class="card-actions">
        <button type="button" class="btn-cart">Thêm vào giỏ hàng</button>
        <button type="button" class="btn-buy">Mua</button>
      </div>
    `;
    suggestList.appendChild(card);
  });
}

function openDetail(bookId) {
  const book = books.find((item) => item.id === Number(bookId));
  if (!book) return;

  detailImage.src = book.image;
  detailImage.alt = book.title;
  detailInfo.innerHTML = `
    <p><strong>Tên:</strong> ${book.title}</p>
    <p><strong>Nhà xuất bản:</strong> NXB Tổng hợp</p>
    <p><strong>Tác giả:</strong> ${book.author}</p>
    <p><strong>Năm xuất bản:</strong> ${book.year}</p>
    <p><strong>Đánh giá:</strong> ${book.rating}/5</p>
    <p><strong>Giá:</strong> ${book.price}</p>
  `;
  detailSummary.innerHTML = `<p>${book.summary}</p>`;
  renderSuggestions(book);

  detailOverlay.classList.remove("hidden");
  detailOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-open");
}

function closeDetail() {
  detailOverlay.classList.add("hidden");
  detailOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
}

renderBooks(searchInput.value);

searchInput.addEventListener("input", () => {
  renderBooks(searchInput.value);
});

productList.addEventListener("click", (event) => {
  const detailBtn = event.target.closest(".btn-title");
  if (!detailBtn) return;

  const card = detailBtn.closest(".card");
  const cards = Array.from(productList.querySelectorAll(".card"));
  const cardIndex = cards.indexOf(card);
  if (cardIndex < 0) return;

  const filteredBooks = books.filter((book) =>
    bookMatchesQuery(book, searchInput.value),
  );
  const selectedBook = filteredBooks[cardIndex];
  if (!selectedBook) return;
  openDetail(selectedBook.id);
});

detailCloseBtn.addEventListener("click", closeDetail);

detailOverlay.addEventListener("click", (event) => {
  if (event.target === detailOverlay) {
    closeDetail();
  }
});
