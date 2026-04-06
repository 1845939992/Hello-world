// 初始化页面加载动画
function initPageLoadAnimation() {
    const sections = document.querySelectorAll('section');
    
    // 优化IntersectionObserver配置
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 使用requestAnimationFrame确保动画流畅
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        // 统一设置初始样式
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
    
    // 触发一次滚动事件，确保首屏内容正确显示
    requestAnimationFrame(() => {
        window.dispatchEvent(new Event('scroll'));
    });
}

export { initPageLoadAnimation };