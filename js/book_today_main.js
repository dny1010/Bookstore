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
        const querys = ["육아포비아를 넘어서","나는 내 상사가 대장이면 좋겠다","귀신새 우는 소리","크리미(널)러브","오늘도 잘 놀다 갑니다","세상을 읽는 안목 서양 건축사","앙앙 ANAN增刊 2025.09 (표지&특집: 극장판 귀멸의칼날 무한성편 )","한류피아 韓流ぴあ 增刊 2025.11 표지: PLAVE (플레이브)"];

        for (let i=0; i<querys.length; i++) {
            const data = await fetchBooks(querys[i]);

            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".today_main_box");

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

            const p = document.createElement("span");
            p.textContent = doc.contents.substring(0, 100);
            boxElements[i].appendChild(p);
        }

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();
