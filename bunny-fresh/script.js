// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 初始化图片加载错误处理
    initImageErrorHandling();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化轮播图
    initCarousel();
    
    // 初始化商品卡片悬停效果
    initProductCards();
    
    // 初始化导航菜单交互
    initNavigation();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化页面加载动画
    initPageLoadAnimation();
    
    // 初始化服务保障图标动画
    initServiceIcons();
    
    // 初始化品牌图标动画
    initBrandIcons();
    
    // 初始化滚动视差效果
    initScrollParallax();
    
    // 初始化购物车徽章动画
    initCartBadge();
});

// 图片加载错误处理
function initImageErrorHandling() {
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        // 添加错误处理
        img.addEventListener('error', function() {
            console.error('图片加载失败:', this.src);
            
            // 创建一个备用图片
            this.onerror = null;
            
            // 设置默认背景和占位符文字
            this.style.backgroundColor = '#f0f0f0';
            this.style.minHeight = '100px';
            
            // 可以在这里添加一个占位符SVG
            this.alt = this.alt || '图片加载失败';
        });
        
        // 添加加载完成事件
        img.addEventListener('load', function() {
            console.log('图片加载成功:', this.src);
        });
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            if (keyword) {
                alert(`搜索关键词: ${keyword}`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
}

// 轮播图功能
function initCarousel() {
    const banner = document.querySelector('.banner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(30px)';
        setTimeout(() => {
            banner.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            banner.style.opacity = '1';
            banner.style.transform = 'translateY(0)';
        }, 200);
    }
}

// 商品卡片悬停效果
function initProductCards() {
    const productCards = document.querySelectorAll('.goods-item, .popular-item, .topic-item, .category-item');
    
    productCards.forEach((card, index) => {
        // 添加鼠标进入时的涟漪效果
        card.addEventListener('mouseenter', function(e) {
            createRipple(e, this);
        });
        
        // 快速查看按钮点击
        const quickViewBtn = card.querySelector('.quick-view');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('h3')?.textContent || '商品';
                alert(`查看${productName}详情`);
            });
        }
    });
}

// 创建涟漪效果
function createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(82, 191, 144, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
    `;
    
    // 确保元素是相对定位
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加涟漪动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 导航菜单交互
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent;
            alert(`跳转到${category}页面`);
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 服务保障图标动画
function initServiceIcons() {
    const serviceIcons = document.querySelectorAll('.service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    serviceIcons.forEach(icon => observer.observe(icon));
}

// 品牌图标动画
function initBrandIcons() {
    const brandIcons = document.querySelectorAll('.brand-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    brandIcons.forEach(icon => observer.observe(icon));
}

// 初始化页面加载动画
function initPageLoadAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
    
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
}

// 滚动视差效果
function initScrollParallax() {
    const organicBgs = document.querySelectorAll('.organic-bg');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        organicBgs.forEach((bg, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrollY * speed;
            bg.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 购物车徽章动画
function initCartBadge() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartBadge = document.querySelector('.cart-badge');
    
    if (cartBtn && cartBadge) {
        let count = 0;
        
        // 点击购物车按钮时添加动画
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 模拟添加商品
            count++;
            cartBadge.textContent = count;
            
            // 添加弹跳动画
            cartBadge.style.animation = 'none';
            cartBadge.offsetHeight; // 触发重排
            cartBadge.style.animation = 'bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    }
}

// 添加购物车徽章弹跳动画
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.4); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(bounceStyle);

// 为所有按钮添加点击波纹效果
document.addEventListener('click', function(e) {
    const button = e.target.closest('button, .cart-btn, .see-more, .cta-btn');
    if (button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});
