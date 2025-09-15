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
        const querys = ["하늘의 모든 새들","전곡리에서 마추픽추까지","지구가 권리를 가지는 날에는","임신테스트기","도둑맞은 자부심","라이프코드 LIFE Code","책과 신문 읽고 쓰는 초등 탄탄 논술 2","시작점","인지장애와 치매 잡는 뇌 건강 식사법","직장인입니다 강남으로 이사갔고요 질문 받습니다"];

        for (let i=0; i<querys.length; i++) {
            const data = await fetchBooks(querys[i]);

            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".md_b");

            // documents 데이터를 각 box에 대응하여 렌더링            
            const doc = data.documents[0];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // <img>
            const img = document.createElement("img");
            img.src = doc.thumbnail;
            boxElements[i].appendChild(img);

            // <h3> 제목
            const h3 = document.createElement("h4");
            h3.textContent = doc.title;
            boxElements[i].appendChild(h3);
        }

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();
