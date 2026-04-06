// 滚动视差效果
function initScrollParallax() {
    const organicBgs = document.querySelectorAll('.organic-bg');
    
    // 使用防抖函数减少滚动事件处理频率
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 防抖处理的滚动事件
    const handleScroll = debounce(() => {
        const scrollY = window.scrollY;
        
        organicBgs.forEach((bg, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrollY * speed;
            bg.style.transform = `translateY(${yPos}px)`;
        });
    }, 16); // 约60fps
    
    window.addEventListener('scroll', handleScroll);
}

export { initScrollParallax };