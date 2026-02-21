    // 初始化事件框
    export function initEventLog_Logic() {
        // 创建事件列表
        this.eventsList = [];
        this.maxEvents = 100;
        
        // 创建事件框背景
        this.eventLogBg = this.add.sprite(960, 1570, 'eventlog');
        this.eventLogBg.setScale(0.75); // 设置为原大小的0.75
        this.eventLogBg.setDepth(25); // 设置在其他UI元素之上
        this.eventLogBg.setAlpha(0.8); // 设置半透明效果
        
        // 创建事件文本组
        this.eventTexts = this.add.group();
        
        // 添加一些初始测试事件，方便测试滚动功能
        addEvent_Logic.call(this, '逃离莫提丝并找到难绷的假面吧！');
        addEvent_Logic.call(this, '尽可能多地收集黄瓜和伙伴，获取更高的分数！');
        if (this.level == 1){
            addEvent_Logic.call(this, '红灯亮起时当心马路上的车辆，不然会被撞飞！')
        }else if (this.level == 2){
            addEvent_Logic.call(this, '莫提斯会躲到小莫提丝玩偶里躲避你的视野。')
            addEvent_Logic.call(this, '莫提斯在左中侧的回忆空间里会完全隐身，此时你是看不到她的！')
            addEvent_Logic.call(this, '注意右下角的大莫提斯玩偶，如果莫提斯在你三格范围内，大莫提斯玩偶会笑起来！');
        }else if (this.level == 3){
            addEvent_Logic.call(this, '莫提斯喜欢聚光灯，在聚光灯下她的速度会像在月光下一样。')
        }
        
        // 事件框尺寸和位置信息
        this.eventframeWidth = 2229; // 事件框宽度
        this.eventframeHeight = 940; // 事件框宽度
        this.eventLogWidth = 1200; // 事件框宽度
        this.eventLogHeight = 560; // 事件框高度
        this.eventLogX = 960; // 事件框X坐标
        this.eventLogY = 1570; // 事件框Y坐标
        
        // 滚动相关变量
        this.scrollOffset = 0; // 滚动偏移量
        this.lineHeight = 40; // 每行文本高度（随字体增大而调整）
        this.maxVisibleLines = Math.floor(this.eventLogHeight / this.lineHeight) - 2; // 可见行数（预留一行给提示文字）
        
        // 提示文字变量
        this.scrollHintText = null; // 滚动提示文字
        
        // 收起/展开相关变量
        this.isEventLogCollapsed = false; // 事件框是否收起
        this.eventLogOriginalY = 1570; // 原始Y坐标
        this.eventLogCollapsedY = 2262; // 收起时的Y坐标
        
        // 创建收起按钮（展开状态下）
        this.collapseButton = this.add.sprite(1696, 1184, 'eventlog_collapsed');
        this.collapseButton.setDepth(27); // 设置在事件框和文本之上
        this.collapseButton.setDisplaySize(64, 64); // 设置按钮大小为64*64
        this.collapseButton.setInteractive();
        
        // 创建展开按钮（收起状态下，初始隐藏）
        this.expandButton = this.add.sprite(1696, 1868, 'eventlog_expand');
        this.expandButton.setDepth(27); // 设置在事件框和文本之上
        this.expandButton.setDisplaySize(64, 64); // 设置按钮大小为64*64
        this.expandButton.setInteractive();
        this.expandButton.setVisible(false);
        
        // 添加按钮点击事件
        this.collapseButton.on('pointerdown', () => {
            toggleEventLog_Logic.call(this);
        });
        
        this.expandButton.on('pointerdown', () => {
            toggleEventLog_Logic.call(this);
        });
        
        // 添加滚动功能
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (!this.isEventLogCollapsed && isPointInEventLog_Logic.call(this, pointer.x, pointer.y)) {
                scrollEventLog_Logic.call(this, deltaY);
            }
        });
        
        // 初始显示事件文本
        updateEventLogDisplay_Logic.call(this);
    }
    
    // 切换事件框的收起/展开状态
    export function toggleEventLog_Logic() {
        if (!this.isEventLogCollapsed) {
            // 收起状态：隐藏事件文本，使用动画移动物件
            this.eventTexts.setVisible(false);
            
            // 隐藏提示文字
            if (this.scrollHintText) {
                this.scrollHintText.setVisible(false);
            }
            
            // 创建收起动画（40帧内向下平移684像素）- 展开按钮不需要平移
            this.tweens.add({
                targets: [this.eventLogBg, this.collapseButton],
                y: '+=684',
                duration: 40 * (1000/60), // 40帧，假设60fps
                ease: 'Linear',
                onComplete: () => {
                    // 动画完成后切换按钮并恢复收起按钮位置
                    this.collapseButton.setVisible(false);
                    this.expandButton.setVisible(true);
                    this.isEventLogCollapsed = true;
                    this.collapseButton.setY(1184); // 恢复收起按钮原始Y位置
                }
            });
        } else {
            // 展开状态：显示事件文本，使用动画移动物件
            
            // 创建展开动画（40帧内向上平移684像素）- 收起按钮不需要平移
            this.tweens.add({
                targets: [this.eventLogBg, this.expandButton],
                y: '-=684',
                duration: 40 * (1000/60), // 40帧，假设60fps
                ease: 'Linear',
                onComplete: () => {
                    // 动画完成后显示文本和切换按钮并恢复展开按钮位置
                    this.eventTexts.setVisible(true);
                    this.expandButton.setVisible(false);
                    this.collapseButton.setVisible(true);
                    this.isEventLogCollapsed = false;
                    this.expandButton.setY(1868); // 恢复展开按钮原始Y位置
                    
                    // 更新事件显示（包括提示文字）
                    updateEventLogDisplay_Logic.call(this);
                }
            });
        }
    }
    
    // 检查点是否在事件框内
    export function isPointInEventLog_Logic(x, y) {
        if (this.isEventLogCollapsed) {
            // 收起状态下，只在按钮区域响应
            const buttonHalfWidth = 15;
            const buttonHalfHeight = 10;
            return x >= this.collapseButton.x - buttonHalfWidth && 
                   x <= this.collapseButton.x + buttonHalfWidth && 
                   y >= this.collapseButton.y - buttonHalfHeight && 
                   y <= this.collapseButton.y + buttonHalfHeight;
        } else {
            // 展开状态下，在整个事件框区域响应
            const halfWidth = (this.eventLogWidth * this.eventLogBg.scaleX) / 2;
            const halfHeight = (this.eventLogHeight * this.eventLogBg.scaleY) / 2;
            return x >= this.eventLogX - halfWidth && 
                   x <= this.eventLogX + halfWidth && 
                   y >= this.eventLogY - halfHeight && 
                   y <= this.eventLogY + halfHeight;
        }
    }


        // 滚动事件日志
    export function scrollEventLog_Logic(deltaY) {
        const maxScroll = Math.max(0, this.eventsList.length - this.maxVisibleLines);
        
        // 向上滚动(滚轮向上滚动)
        if (deltaY < 0 && this.scrollOffset > 0) {
            this.scrollOffset--;
            updateEventLogDisplay_Logic.call(this);
        }
        // 向下滚动(滚轮向下滚动)
        else if (deltaY > 0 && this.scrollOffset < maxScroll) {
            this.scrollOffset++;
            updateEventLogDisplay_Logic.call(this);
        }
    }
    
    // 添加新事件
    export function addEvent_Logic(text) {
        // 添加新事件到列表末尾
        this.eventsList.push(text);
        
        // 保持事件列表不超过最大限制
        if (this.eventsList.length > this.maxEvents) {
            this.eventsList.shift(); // 移除最旧的事件
        }
        
        // 更新显示，确保滚动到最新事件
        this.scrollOffset = Math.max(0, this.eventsList.length - this.maxVisibleLines);
        updateEventLogDisplay_Logic.call(this);
    }
    
    // 更新事件框显示
    export function updateEventLogDisplay_Logic() {
        // 如果事件框收起，则不更新显示
        if (this.isEventLogCollapsed) {
            // 收起时隐藏提示文字
            if (this.scrollHintText) {
                this.scrollHintText.setVisible(false);
            }
            return;
        }
        
        // 清空现有文本
        this.eventTexts.clear(true, true);
        
        // 显示当前可见的事件
        const startIdx = Math.max(0, this.eventsList.length - this.maxVisibleLines - this.scrollOffset);
        const endIdx = Math.min(this.eventsList.length, startIdx + this.maxVisibleLines);
        
        for (let i = startIdx; i < endIdx; i++) {
            const text = this.add.text(
                this.eventLogX - this.eventLogWidth / 2 + 10,
                this.eventLogY - this.eventLogHeight / 2 + 10 + (i - startIdx) * this.lineHeight,
                this.eventsList[i],
                {
                    fontSize: '24px',
                    color: '#ffffff',
                    fontFamily: 'Arial, sans-serif',
                    wordWrap: {
                        width: this.eventLogWidth - 20,
                        useAdvancedWrap: true
                    }
                }
            );
            text.setDepth(26); // 设置在事件框背景之上
            this.eventTexts.add(text);
        }
        
        // 添加固定的滚动提示文字
        if (!this.scrollHintText) {
            this.scrollHintText = this.add.text(
                this.eventLogX,
                this.eventLogY + this.eventLogHeight / 2 - 30,
                '可上下滚动',
                {
                    fontSize: '20px',
                    color: '#cccccc',
                    fontFamily: 'Arial, sans-serif',
                    fontStyle: 'italic'
                }
            );
            this.scrollHintText.setOrigin(0.5);
            this.scrollHintText.setDepth(27); // 设置在事件文本之上
        } else {
            // 确保提示文字可见
            this.scrollHintText.setVisible(true);
        }
    }