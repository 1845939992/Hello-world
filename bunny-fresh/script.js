// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function () {
    // 初始化关键功能
    initEssentialFeatures();

    // 延迟初始化非关键功能
    setTimeout(() => {
        initNonEssentialFeatures();
    }, 100);
});

// 初始化关键功能（首屏必要的功能）
function initEssentialFeatures() {
    initImageErrorHandling();
    initSearch();
    initCarousel();
    initNavigation();
    initSmoothScroll();
    initCartBadge();
}

// 初始化非关键功能（可延迟加载）
function initNonEssentialFeatures() {
    // 动态导入非关键功能模块
    import('./modules/productCards.js').then(module => {
        module.initProductCards();
    });

    import('./modules/pageAnimation.js').then(module => {
        module.initPageLoadAnimation();
    });

    import('./modules/serviceIcons.js').then(module => {
        module.initServiceIcons();
    });

    import('./modules/brandIcons.js').then(module => {
        module.initBrandIcons();
    });

    import('./modules/scrollParallax.js').then(module => {
        module.initScrollParallax();
    });
}

// 图片加载错误处理
function initImageErrorHandling() {
    const allImages = document.querySelectorAll('img');

    // 批量添加错误处理，移除加载成功的日志
    allImages.forEach(img => {
        img.addEventListener('error', function () {
            // 防止重复触发
            this.onerror = null;

            // 设置默认样式
            this.style.backgroundColor = '#f0f0f0';
            this.style.minHeight = '100px';
            this.alt = this.alt || '图片加载失败';
        });
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search-btn');

    if (searchButton && searchInput) {
        // 统一的搜索处理函数
        const handleSearch = () => {
            const keyword = searchInput.value.trim();
            if (keyword) {
                alert(`搜索关键词: ${keyword}`);
            }
        };

        searchButton.addEventListener('click', handleSearch);

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

// 轮播图功能
function initCarousel() {
    const banner = document.querySelector('.banner');
    if (banner) {
        // 直接设置样式，避免setTimeout延迟
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(30px)';
        banner.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        // 使用requestAnimationFrame确保浏览器渲染时机
        requestAnimationFrame(() => {
            banner.style.opacity = '1';
            banner.style.transform = 'translateY(0)';
        });
    }
}

// 导航菜单交互
function initNavigation() {
    // 使用事件委托，减少事件监听器数量
    const nav = document.querySelector('.nav ul');
    if (nav) {
        nav.addEventListener('click', function (e) {
            const link = e.target.closest('a');
            if (link) {
                e.preventDefault();

                // 移除所有active类
                nav.querySelectorAll('a').forEach(item => item.classList.remove('active'));
                // 添加active类到当前链接
                link.classList.add('active');

                const category = link.textContent;
                alert(`跳转到${category}页面`);
            }
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    // 使用事件委托，减少事件监听器数量
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// 购物车徽章动画
function initCartBadge() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartBadge = document.querySelector('.cart-badge');

    if (cartBtn && cartBadge) {
        let count = 0;

        // 点击购物车按钮时添加动画
        cartBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // 模拟添加商品
            count++;
            cartBadge.textContent = count;

            // 添加弹跳动画，使用CSS类而不是直接操作样式
            cartBadge.classList.remove('bounce-animation');
            // 触发重排
            void cartBadge.offsetWidth;
            // 添加动画类
            cartBadge.classList.add('bounce-animation');
        });
    }
}

// 添加必要的CSS样式
const style = document.createElement('style');
style.textContent = `
    .button-ripple {
        position: absolute;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    }
    .bounce-animation {
        animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    @keyframes bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.4); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// 为所有按钮添加点击波纹效果
document.addEventListener('click', function (e) {
    const button = e.target.closest('button, .cart-btn, .see-more, .cta-btn');
    if (button) {
        // 避免重复创建波纹
        if (button._rippleTimeout) {
            clearTimeout(button._rippleTimeout);
        }

        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        // 使用CSS类而不是内联样式
        ripple.className = 'button-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        // 确保元素是相对定位
        if (getComputedStyle(button).position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';

        button.appendChild(ripple);

        // 使用setTimeout清理波纹
        button._rippleTimeout = setTimeout(() => {
            ripple.remove();
            delete button._rippleTimeout;
        }, 600);
    }
});
