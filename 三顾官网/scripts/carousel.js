class Carousel {
  constructor(element, options = {}) {
    this.container = element;
    this.options = {
      autoplay: options.autoplay || true,
      interval: options.interval || 5000,
      transition: options.transition || 500,
      ...options
    };

    this.items = Array.from(this.container.children);
    this.itemCount = this.items.length;
    this.currentIndex = 0;

    this.init();
  }

  init() {
    // 创建轮播图结构
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';

    // 创建轮播项容器
    this.track = document.createElement('div');
    this.track.style.display = 'flex';
    this.track.style.transition = `transform ${this.options.transition}ms ease`;
    this.container.appendChild(this.track);

    // 移动轮播项到轮播容器中
    this.items.forEach(item => {
      item.style.flex = '0 0 100%';
      this.track.appendChild(item);
    });

    // 创建导航指示器
    this.createIndicators();

    // 创建前进后退按钮
    this.createNavigationButtons();

    // 开始自动播放
    if (this.options.autoplay) {
      this.startAutoplay();
    }

    // 添加触摸事件支持
    this.addTouchSupport();
  }

  createIndicators() {
    this.indicators = document.createElement('div');
    this.indicators.className = 'carousel-indicators';
    this.indicators.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 1;
    `;

    for (let i = 0; i < this.itemCount; i++) {
      const indicator = document.createElement('button');
      indicator.className = 'carousel-indicator';
      indicator.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: background-color 0.3s ease;
      `;
      indicator.addEventListener('click', () => this.goTo(i));
      this.indicators.appendChild(indicator);
    }

    this.container.appendChild(this.indicators);
    this.updateIndicators();
  }

  createNavigationButtons() {
    const createButton = (className, text, onClick) => {
      const button = document.createElement('button');
      button.className = className;
      button.innerHTML = text;
      button.style.cssText = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.3);
        color: white;
        border: none;
        padding: 16px;
        cursor: pointer;
        z-index: 1;
        transition: background-color 0.3s ease;
      `;
      button.addEventListener('click', onClick);
      return button;
    };

    this.prevButton = createButton(
      'carousel-prev',
      '❮',
      () => this.prev()
    );
    this.prevButton.style.left = '16px';

    this.nextButton = createButton(
      'carousel-next',
      '❯',
      () => this.next()
    );
    this.nextButton.style.right = '16px';

    this.container.appendChild(this.prevButton);
    this.container.appendChild(this.nextButton);
  }

  addTouchSupport() {
    let startX = 0;
    let currentX = 0;

    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      this.stopAutoplay();
    });

    this.container.addEventListener('touchmove', (e) => {
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      this.track.style.transform = `translateX(calc(-${this.currentIndex * 100}% + ${diff}px))`;
    });

    this.container.addEventListener('touchend', () => {
      const diff = currentX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.prev();
        } else {
          this.next();
        }
      } else {
        this.goTo(this.currentIndex);
      }
      if (this.options.autoplay) {
        this.startAutoplay();
      }
    });
  }

  updateIndicators() {
    const indicators = this.indicators.children;
    for (let i = 0; i < indicators.length; i++) {
      indicators[i].style.backgroundColor =
        i === this.currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)';
    }
  }

  goTo(index) {
    this.currentIndex = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    this.updateIndicators();
  }

  next() {
    this.goTo((this.currentIndex + 1) % this.itemCount);
  }

  prev() {
    this.goTo((this.currentIndex - 1 + this.itemCount) % this.itemCount);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, this.options.interval);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
  const carouselElements = document.querySelectorAll('.carousel');
  carouselElements.forEach(element => {
    new Carousel(element);
  });
});