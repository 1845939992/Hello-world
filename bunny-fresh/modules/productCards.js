// 商品卡片悬停效果
function initProductCards() {
    // 使用事件委托，减少事件监听器数量
    document.addEventListener('mouseenter', function(e) {
        const card = e.target.closest('.goods-item, .popular-item, .topic-item, .category-item');
        if (card) {
            createRipple(e, card);
        }
    });
    
    // 为快速查看按钮添加统一的点击事件
    document.addEventListener('click', function(e) {
        const quickViewBtn = e.target.closest('.quick-view');
        if (quickViewBtn) {
            e.stopPropagation();
            const card = quickViewBtn.closest('.goods-item, .popular-item');
            const productName = card?.querySelector('h3')?.textContent || '商品';
            alert(`查看${productName}详情`);
        }
    });
}

// 创建涟漪效果
function createRipple(e, element) {
    // 避免重复创建涟漪
    if (element._rippleTimeout) {
        clearTimeout(element._rippleTimeout);
    }
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // 使用CSS类而不是内联样式
    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    
    // 确保元素是相对定位
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    
    element.appendChild(ripple);
    
    // 使用requestAnimationFrame优化动画
    element._rippleTimeout = setTimeout(() => {
        ripple.remove();
        delete element._rippleTimeout;
    }, 600);
}

// 添加涟漪动画样式
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        background: radial-gradient(circle, rgba(82, 191, 144, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
    }
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

export { initProductCards };