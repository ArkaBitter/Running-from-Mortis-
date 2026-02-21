    export function initInventory_Logic() {
        // 创建物品栏背景
        this.inventoryBg = this.add.sprite(1696, 576, 'inventory');
        this.inventoryBg.setDepth(25); // 设置在其他UI元素之上
        this.inventoryBg.setAlpha(0.8); // 设置半透明效果
        
        // 物品栏尺寸和位置信息
        this.inventoryWidth = 400; // 物品栏宽度（根据实际素材调整）
        this.inventoryHeight = 300; // 物品栏高度（根据实际素材调整）
        this.inventoryX = 1696; // 物品栏X坐标
        this.inventoryY = 576; // 物品栏Y坐标
        
        // 创建物品组
        this.inventoryItems = this.add.group();
        
        // 收起/展开相关变量
        this.isInventoryCollapsed = false; // 物品栏是否收起
        this.inventoryOriginalX = 1696; // 原始X坐标
        this.inventoryCollapsedX = 1920; // 收起时的X坐标
        
        // 创建收起按钮（展开状态下）
        this.inventoryCollapseButton = this.add.sprite(1440, 160, 'inventory_collapsed');
        this.inventoryCollapseButton.setDepth(27); // 设置在物品栏之上
        this.inventoryCollapseButton.setDisplaySize(64, 64); // 设置按钮大小为64*64
        this.inventoryCollapseButton.setInteractive();
        
        // 创建展开按钮（收起状态下，初始隐藏）
        this.inventoryExpandButton = this.add.sprite(1868, 160, 'inventory_expand');
        this.inventoryExpandButton.setDepth(27); // 设置在物品栏之上
        this.inventoryExpandButton.setDisplaySize(64, 64); // 设置按钮大小为64*64
        this.inventoryExpandButton.setInteractive();
        this.inventoryExpandButton.setVisible(false);
        
        // 添加按钮点击事件
        this.inventoryCollapseButton.on('pointerdown', () => {
            toggleInventory_Logic.call(this);
        });
        
        this.inventoryExpandButton.on('pointerdown', () => {
            toggleInventory_Logic.call(this);
        });
        
        // 可以在这里初始化一些测试物品
        // this.addInventoryItem('cucumber', 1); // 添加1个黄瓜示例
        
        // 从继承的物品数据创建物品显示
        if (this.inventoryItemTypes && Object.keys(this.inventoryItemTypes).length > 0) {
            console.log('从继承的数据中恢复物品栏显示，物品数量:', Object.keys(this.inventoryItemTypes).length);
            // 清空现有的物品组，避免重复添加
            this.inventoryItems.clear(true, true);
            // 重新创建物品显示
            Object.entries(this.inventoryItemTypes).forEach(([itemType, itemInfo], index) => {
                if (itemInfo && itemInfo.count > 0) {
                    // 计算位置：第一类物品图标的位置位于x=1600, y=192，第n类物品的图标位于x=1600, y=64+128*n
                    const itemX = 1600;
                    const itemY = 64 + 128 * (index + 1);
                    
                    // 创建物品精灵，大小一律缩放为96*96
                    const item = this.add.sprite(itemX, itemY, itemType);
                    item.setDisplaySize(96, 96);
                    item.setDepth(26); // 设置在物品栏之上但在按钮之下
                    
                    // 添加物品数量文本，后面加上"×"+num的文字
                    const countText = this.add.text(itemX + 50, itemY - 30, '×' + itemInfo.count, {
                        fontSize: '24px',
                        color: '#ffffff',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: { x: 5, y: 2 },
                        fontFamily: 'Arial, sans-serif'
                    });
                    countText.setOrigin(0.5);
                    countText.setDepth(27); // 设置在最上层
                    
                    // 更新物品信息
                    this.inventoryItemTypes[itemType] = {
                        sprite: item,
                        countText: countText,
                        count: itemInfo.count,
                        positionIndex: index + 1
                    };
                    
                    // 将物品和数量文本添加到组中
                    this.inventoryItems.add(item);
                    this.inventoryItems.add(countText);
                    console.log(`已恢复物品 ${itemType}，数量: ${itemInfo.count}`);
                }
            });
        }
        
        // 初始更新物品栏显示
        updateInventoryDisplay_Logic.call(this);
    }
    
    // 切换物品栏的收起/展开状态
    export function toggleInventory_Logic() {
        if (!this.isInventoryCollapsed) {
            // 收起状态：隐藏物品，使用动画移动物件
            this.inventoryItems.setVisible(false);
            
            // 创建收起动画（40帧内向右平移428像素）- 展开按钮不需要平移
            this.tweens.add({
                targets: [this.inventoryBg, this.inventoryCollapseButton],
                x: '+=428',
                duration: 40 * (1000/60), // 40帧，假设60fps
                ease: 'Linear',
                onComplete: () => {
                    // 动画完成后切换按钮并恢复收起按钮位置
                    this.inventoryCollapseButton.setVisible(false);
                    this.inventoryExpandButton.setVisible(true);
                    this.isInventoryCollapsed = true;
                    this.inventoryCollapseButton.setX(1440); // 恢复收起按钮原始X位置
                }
            });
        } else {
            // 展开状态：使用动画移动物件
            
            // 创建展开动画（40帧内向左平移428像素）- 收起按钮不需要平移
            this.tweens.add({
                targets: [this.inventoryBg, this.inventoryExpandButton],
                x: '-=428',
                duration: 40 * (1000/60), // 40帧，假设60fps
                ease: 'Linear',
                onComplete: () => {
                    // 动画完成后显示物品和切换按钮并恢复展开按钮位置
                    this.inventoryItems.setVisible(true);
                    this.inventoryExpandButton.setVisible(false);
                    this.inventoryCollapseButton.setVisible(true);
                    this.isInventoryCollapsed = false;
                    this.inventoryExpandButton.setX(1868); // 恢复展开按钮原始X位置
                    
                    // 更新物品显示
                    updateInventoryDisplay_Logic.call(this);
                }
            });
        }
    }
    
    // 添加物品到物品栏
    export function addInventoryItem_Logic(itemType, count = 1) {
        // 初始化物品类型跟踪对象（如果不存在）
        if (!this.inventoryItemTypes) {
            this.inventoryItemTypes = {};
        }
        
        // 确保inventoryItems组已初始化
        if (!this.inventoryItems) {
            this.inventoryItems = this.add.group();
        }
        
        // 更新收集记录：将道具添加到localStorage中，用于点亮图鉴
        try {
            // 获取已收集的道具列表
            const collectedItems = JSON.parse(localStorage.getItem('gameCollectedItems') || '[]');
            // 检查道具是否已在收集列表中
            if (!collectedItems.includes(itemType)) {
                // 添加到收集列表
                collectedItems.push(itemType);
                // 保存回localStorage
                localStorage.setItem('gameCollectedItems', JSON.stringify(collectedItems));
                console.log('道具已添加到收集记录:', itemType);
            }
        } catch (error) {
            console.error('更新收集记录失败:', error);
        }
        
        // 检查是否已存在该类型物品
        if (this.inventoryItemTypes[itemType]) {
            // 已存在，更新数量
            const existingItem = this.inventoryItemTypes[itemType];
            // 安全检查：确保existingItem和countText存在
            if (existingItem && existingItem.countText) {
                existingItem.count += count;
                existingItem.countText.setText('×' + existingItem.count);
            }
        } else {
            try {
                // 新增物品类型
                // 获取物品类型数量，作为索引n
                const itemCount = Object.keys(this.inventoryItemTypes).length;
                const n = itemCount + 1; // 从1开始计数
                
                // 计算位置：第一类物品图标的位置位于x=1600, y=192，第n类物品的图标位于x=1600, y=64+128*n
                const itemX = 1600;
                const itemY = 64 + 128 * n;
                
                // 创建物品精灵，大小一律缩放为96*96
                const item = this.add.sprite(itemX, itemY, itemType);
                item.setDisplaySize(96, 96);
                item.setDepth(26); // 设置在物品栏之上但在按钮之下
                
                // 添加物品数量文本，后面加上"×"+num的文字
                const countText = this.add.text(itemX + 50, itemY - 30, '×' + count, {
                    fontSize: '24px',
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: { x: 5, y: 2 },
                    fontFamily: 'Arial, sans-serif'
                });
                countText.setOrigin(0.5);
                countText.setDepth(27); // 设置在最上层
                
                // 存储物品信息
                this.inventoryItemTypes[itemType] = {
                    sprite: item,
                    countText: countText,
                    count: count,
                    positionIndex: n
                };
                
                // 将物品和数量文本添加到组中
                this.inventoryItems.add(item);
                this.inventoryItems.add(countText);
            } catch (error) {
                console.error('Error adding inventory item:', error);
                // 即使发生错误，也确保游戏可以继续
            }
        }
        
        // 更新显示
        updateInventoryDisplay_Logic.call(this);
    }
    
    // 使用物品并更新物品栏
    export function useInventoryItem_Logic(itemType, count = 1) {
        if (!this.inventoryItemTypes || !this.inventoryItemTypes[itemType]) {
            return false; // 物品不存在
        }
        
        const item = this.inventoryItemTypes[itemType];
        if (item.count < count) {
            return false; // 数量不足
        }
        
        // 减少物品数量
        item.count -= count;
        
        if (item.count <= 0) {
            // 物品用完，移除该类型物品
            item.sprite.destroy();
            item.countText.destroy();
            
            // 获取该物品的位置索引
            const removedIndex = item.positionIndex;
            
            // 从跟踪对象中删除
            delete this.inventoryItemTypes[itemType];
            
            // 将该类之后的所有物品向上移动128个像素
            Object.values(this.inventoryItemTypes).forEach(otherItem => {
                if (otherItem.positionIndex > removedIndex) {
                    // 位置索引减1
                    otherItem.positionIndex--;
                    
                    // 计算新位置
                    const newY = 64 + 128 * otherItem.positionIndex;
                    
                    // 移动物品精灵和文本
                    this.tweens.add({
                        targets: [otherItem.sprite, otherItem.countText],
                        y: newY,
                        duration: 200,
                        ease: 'Linear'
                    });
                }
            });
        } else {
            // 更新数量文本
            item.countText.setText('×' + item.count);
        }
        
        // 更新显示
        updateInventoryDisplay_Logic.call(this);
        return true;
    }
    
    // 更新物品栏显示
    export function updateInventoryDisplay_Logic() {
        // 当物品栏收起时，上面的物品内容不再显示
        if (this.isInventoryCollapsed) {
            this.inventoryItems.setVisible(false);
        } else {
            this.inventoryItems.setVisible(true);
        }
    }