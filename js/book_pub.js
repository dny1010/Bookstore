async function fetchBooks(query) {
    const REST_API_KEY = 'de6c81b74223542aa9db3e2bfd5f1976';
    const params = new URLSearchParams({
        target: "title",
        query,
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}


async function bookData() {
    try {
        const querys = ["미국 자산관리 성공전략","절창","머리 좋은 아이는 이렇게 키웁니다","렛뎀 이론","워런 버핏 바이블: 완결판","외계인 자서전"];

        for (let i=0; i<querys.length; i++) {
            const data = await fetchBooks(querys[i]);

            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".pub_b");

            // documents 데이터를 각 box에 대응하여 렌더링            
            const doc = data.documents[0];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // <img>
            const img = document.createElement("img");
            img.src = doc.thumbnail;
            boxElements[i].appendChild(img);

            // <h3> 제목
            const h3 = document.createElement("h5");
            h3.textContent = doc.title;
            boxElements[i].appendChild(h3);
        }

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();
