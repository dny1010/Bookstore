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
        const querys = ["그리스인 조르바","이토록 굉장한 세계","돈의 심리학","마침내 특이점이 시작된다","물질의 세계","다정한 것이 살아남는다","공정하다는 착각","프로젝트 헤일메리","넥서스","백년의 고독1"];

        for (let i=0; i<querys.length; i++) {
            const data = await fetchBooks(querys[i]);

            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".author_b");

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
