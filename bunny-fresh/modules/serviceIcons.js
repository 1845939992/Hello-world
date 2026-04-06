// 服务保障图标动画
function initServiceIcons() {
    const serviceIcons = document.querySelectorAll('.service-item');
    
    // 优化IntersectionObserver配置
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 直接设置样式，避免多层setTimeout
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                // 使用requestAnimationFrame确保动画流畅
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    serviceIcons.forEach(icon => observer.observe(icon));
}

export { initServiceIcons };