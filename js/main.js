// カスタムマウスカーソル（PC版のみ）
// --------------------
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    const cursor = document.querySelector('.cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // マウス位置の追跡
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // スムーズなカーソル追従
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.2;
        cursorY += dy * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ホバー効果
    const interactiveElements = document.querySelectorAll('a, button, .liquid-button, .menu-link, .social-morph, .service-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// クリック効果
document.addEventListener('click', (e) => {
    // メールリンクの場合は通常動作を許可
    if (e.target.tagName === 'A' && e.target.href && e.target.href.startsWith('mailto:')) {
        return;
    }

    // ナビゲーションリンクの場合はスムーススクロール
    if (e.target.tagName === 'A' && e.target.href && e.target.href.includes('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });

            // モバイルメニューを閉じる
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    }
}, true);

// --------------------
// ハンバーガーメニュー
// --------------------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --------------------
// タイピングアニメーション（流体効果付き）
// --------------------
function initTypingAnimation() {
    const mainTitle = document.getElementById('mainTitle');
    if (!mainTitle) return;

    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    let idx = 0;

    function type() {
        if (idx < text.length) {
            mainTitle.textContent += text.charAt(idx);
            idx++;
            setTimeout(type, 80); // より滑らかなタイピング
        } else {
            // タイピング完了後にアニメーション追加
            mainTitle.classList.add('typing-complete');
        }
    }
    type();
}

// DOMContentLoaded後に実行
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initSVGAnimations();
});

// --------------------
// SVGアニメーション（装飾のみ）
// --------------------
function initSVGAnimations() {
    // ロゴアンダーライン流体アニメーション
    const logoUnderline = document.getElementById('logoUnderline');
    if (logoUnderline) {
        setInterval(() => {
            const paths = [
                "M0,4 Q25,2 50,4 T100,4",
                "M0,4 Q25,6 50,4 T100,4",
                "M0,4 Q25,3 50,4 T100,4"
            ];

            let pathIndex = 0;
            const animatePath = () => {
                logoUnderline.setAttribute('d', paths[pathIndex]);
                pathIndex = (pathIndex + 1) % paths.length;
                setTimeout(animatePath, 1000);
            };
            animatePath();
        }, 3000);
    }

    // タイトルアンダーライン
    const titleUnderline = document.getElementById('titleUnderline');
    if (titleUnderline) {
        setTimeout(() => {
            titleUnderline.style.strokeDashoffset = '0';
            titleUnderline.style.transition = 'stroke-dashoffset 2s ease-in-out';
        }, 2000);
    }
}

// --------------------
// 基本的なホバー効果
// --------------------
document.addEventListener('DOMContentLoaded', () => {
    // 情報カードのホバー効果
    document.querySelectorAll('.info-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // サービスアイテムのホバー効果
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ビジョンコンテナのホバー効果
    const visionContainer = document.querySelector('.vision-container');
    if (visionContainer) {
        visionContainer.addEventListener('mouseenter', () => {
            visionContainer.style.transform = 'translateY(-5px)';
        });

        visionContainer.addEventListener('mouseleave', () => {
            visionContainer.style.transform = 'translateY(0)';
        });
    }

    // ボタンのホバー効果
    document.querySelectorAll('.liquid-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// --------------------
// シンプルな装飾アニメーション
// --------------------
const style = document.createElement('style');
style.textContent = `
    /* 装飾的なSVGアニメーション */
    #logoUnderline {
        animation: gentle-wave 4s ease-in-out infinite;
    }
    
    @keyframes gentle-wave {
        0%, 100% { 
            d: path("M0,4 Q25,2 50,4 T100,4"); 
        }
        50% { 
            d: path("M0,4 Q25,6 50,4 T100,4"); 
        }
    }
    
    /* ソーシャルリンクの浮遊アニメーション */
    .social-morph {
        animation: float 3s ease-in-out infinite;
    }
    
    .social-morph:nth-child(2) {
        animation-delay: 1s;
    }
    
    .social-morph:nth-child(3) {
        animation-delay: 2s;
    }
    
    @keyframes float {
        0%, 100% { 
            transform: translateY(0); 
        }
        50% { 
            transform: translateY(-5px); 
        }
    }
    
    /* タイピング完了後の効果 */
    .typing-complete {
        background: linear-gradient(45deg, #FFA500, #FF7F00, #FFA500);
        background-size: 200% 200%;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        animation: gradient-shift 3s ease infinite;
    }
    
    @keyframes gradient-shift {
        0%, 100% { 
            background-position: 0% 50%; 
        }
        50% { 
            background-position: 100% 50%; 
        }
    }
`;
document.head.appendChild(style);

// --------------------
// パフォーマンス最適化
// --------------------
let rafId;

function optimizedAnimationFrame(callback) {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(callback);
}

// モバイル向け最適化
if (isMobile) {
    // モバイルでは一部のアニメーションを簡略化
    document.documentElement.style.setProperty('--animation-duration', '0.3s');

    // タッチデバイスでのホバー効果を無効化
    const hoverElements = document.querySelectorAll('.liquid-item, .info-card, .service-item');
    hoverElements.forEach(element => {
        element.style.transform = 'none';
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(1.02)';
        });
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });
    });
}