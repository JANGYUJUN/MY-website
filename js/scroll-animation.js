// Intersection Observer를 사용한 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    // 모든 .fade-in 요소들을 선택
    const fadeElements = document.querySelectorAll('.fade-in');
    let lastScrollY = window.scrollY;
    
    // Intersection Observer 옵션 설정
    const observerOptions = {
        threshold: 0.1, // 요소의 10%가 보이면 트리거
        rootMargin: '0px 0px -50px 0px' // 하단에서 50px 위에서 트리거
    };
    
    // 스크롤 방향 감지
    function updateScrollDirection() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
        return scrollDirection;
    }
    
    // Intersection Observer 생성
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const scrollDirection = updateScrollDirection();
            
            if (entry.isIntersecting && scrollDirection === 'down') {
                // 아래로 스크롤할 때만 애니메이션 적용
                setTimeout(() => {
                    element.classList.add('visible');
                }, 300); // 0.3초 딜레이
            } else if (entry.isIntersecting && scrollDirection === 'up') {
                // 위로 스크롤할 때는 애니메이션 없이 즉시 보이게 함
                element.classList.add('visible');
            }
            // 화면에서 벗어날 때는 아무것도 하지 않음 (visible 상태 유지)
        });
    }, observerOptions);
    
    // 모든 fade-in 요소들을 관찰 시작
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
