      // 显示评级图标
    export function showRatingIcon_Logic() {
        const score = this.score || 0;
        let ratingKey, scale;
        
        // 根据分数选择评级图标和缩放比例
        if (score >= 24) {
            ratingKey = 'AVEMUJICA';
            scale = 0.25;
        } else if (score >= 21 && score < 24) {
            ratingKey = 'S';
            scale = 0.2;
        } else if (score >= 18 && score < 21) {
            ratingKey = 'A';
            scale = 0.2;
        } else if (score >= 15 && score < 18) {
            ratingKey = 'B';
            scale = 0.2;
        } else if (score >= 12 && score < 15) {
            ratingKey = 'C';
            scale = 0.2;
        } else if (score >= 9 && score < 12) {
            ratingKey = 'D';
            scale = 0.2;
        } else {
            ratingKey = '丰川祥子Cry';
            scale = 0.25;
        }
        
        // 创建评级图标，位置X=1590，Y=1212
        const ratingIcon = this.add.image(1590, 1212, ratingKey);
        ratingIcon.setOrigin(0.5);
        ratingIcon.setDepth(30);
        ratingIcon.setScale(0); // 初始缩放为0，隐藏状态
        
        // 添加到物品数组中以便后续清理
        if (this.settlementItems) {
            this.settlementItems.push(ratingIcon);
        }
        
        // 实现弹出动画：缩放从0到最终大小
        this.tweens.add({
            targets: ratingIcon,
            scale: {
                getStart: () => scale * 2.5,
                getEnd: () => scale * 1 // 由大到小
            },
            duration: 300,
            ease: 'Power2',

        });
    }
    
    // 显示单个物品并处理弹出动画
    export function showInventoryItem_Logic(index) {
        // 使用inventoryItemTypes作为数据源
        const inventoryItems = Object.entries(this.inventoryItemTypes || {});
        if (index >= inventoryItems.length) return;
        
        const [itemType, itemInfo] = inventoryItems[index];
        const n = index + 1; // 第n类物品
        
        // 计算物品位置
        let x, y;
        if (n <= 5) {
            x = 320 + (n - 1) * 256;
            y = 555;
        } else {
            x = 320 + ((n % 5) - 1) * 256;
            y = 555 + Math.floor(n / 5) * 256;
        }
        
        // 创建物品图像，初始缩放为0
        // 使用itemType作为图像键名，因为这是物品的类型标识
        const itemImage = this.add.image(x, y, itemType);
        itemImage.setOrigin(0.5);
        itemImage.setDepth(30);
        // 先设置显示大小，后面会在动画中调整缩放
        // 确保所有道具（包括"mask"）的尺寸一致
        itemImage.setDisplaySize(192, 192);
        itemImage.setScale(0); // 初始缩放为0，隐藏状态
        
        // 添加到物品数组中
        this.settlementItems.push(itemImage);
        
        // 创建弹出动画：缩放从0到最终大小，同时可以添加一些弹性效果
        // 先确保显示大小为192*192像素，然后通过scale属性控制动画
        itemImage.setDisplaySize(192, 192);
        
        this.tweens.add({
            targets: itemImage,
            scale: {
                getStart: () => 0,
                getEnd: () => 1.2 // 先放大一点
            },
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                // 弹回正确大小
                this.tweens.add({
                    targets: itemImage,
                    scale: {
                        getStart: () => 1.2,
                        getEnd: () => 1 // 保持192*192像素大小
                    },
                    duration: 200,
                    ease: 'Power2',
                    onComplete: () => {
                        // 显示下一个物品
                        if (index + 1 < inventoryItems.length) {
                            this.time.delayedCall(200, () => {
                                showInventoryItem_Logic.call(this, index + 1);
                            });
                        } else {
                            // 所有物品显示完成后，显示评级图标
                            this.time.delayedCall(500, () => {
                                showRatingIcon_Logic.call(this);
                            });
                        }
                    }
                });
            }
        });
    }
    
    // 显示结算界面
    export function showSettlementScene_Logic() {
        this.dialogVisible = true;
        this.physics.pause();
        
        // 更新成就（无论选择什么选项，只要通关了就更新）
        const achievements = JSON.parse(localStorage.getItem('gameAchievements') || '{}');
        
        // 1. 通关次数成就
        const completionCount = parseInt(localStorage.getItem('gameCompletionCount') || '0') + 1;
        localStorage.setItem('gameCompletionCount', completionCount.toString());
        console.log('通关次数：', completionCount)
        if (completionCount >= 1) achievements[1] = true; // 演出成功
        if (completionCount >= 2) achievements[2] = true; // 安可
        if (completionCount >= 5) achievements[3] = true; // 全国巡演
        
        // 2. 评价等级成就
        // 根据分数计算评价等级
        const score = this.score || 0;
        let rating;
        if (score >= 24) {
            rating = 'AVEMUJICA';
        } else if (score >= 21 && score < 24) {
            rating = 'S';
        } else if (score >= 18 && score < 21) {
            rating = 'A';
        } else if (score >= 15 && score < 18) {
            rating = 'B';
        } else if (score >= 12 && score < 15) {
            rating = 'C';
        } else if (score >= 9 && score < 12) {
            rating = 'D';
        } else {
            rating = 'F';
        }
        
        // 根据评价等级更新成就
        if (rating === 'C' || rating === 'B' || rating === 'A' || rating === 'S' || rating === 'AVEMUJICA') {
            achievements[4] = true; // 小有名气（评价达到C）
        }
        if (rating === 'B' || rating === 'A' || rating === 'S' || rating === 'AVEMUJICA') {
            achievements[5] = true; // 上头条！（评价达到B）
        }
        if (rating === 'A' || rating === 'S' || rating === 'AVEMUJICA') {
            achievements[6] = true; // 直通武道馆！！（评价达到A）
        }
        if (rating === 'S' || rating === 'AVEMUJICA') {
            achievements[7] = true; // 乐队传奇！！！（评价达到S及以上）
        }
        
        // 3. 图鉴点亮成就（除了甜甜圈）
        const collectedItems = JSON.parse(localStorage.getItem('gameCollectedItems') || '[]');
        const requiredItems = ['cucumber', 'mask', '爱音的手机', '素世的香水', '巧克力奶', '天文望远镜', '抹茶巴菲', '迈巴赫钥匙', '空啤酒罐', '芭蕾舞鞋', 'Mygo联合演出邀请函', '神秘的玩偶'];
        const allRequiredCollected = requiredItems.every(item => collectedItems.includes(item));
        if (allRequiredCollected) achievements[8] = true; // Mygo_Avemujica
        
        // 4. 白月光形态成就
        if (this.whiteMoonlightFormActive) achievements[9] = true; // 我要成为卡密
        
        // 5. 甜甜圈获得成就
        if (this.inventoryItemTypes && this.inventoryItemTypes['甜甜圈']) {
            achievements[10] = true; // sumimi是不会解散的！
        }
        
        // 保存成就状态
        localStorage.setItem('gameAchievements', JSON.stringify(achievements));
        console.log('成就更新:', achievements);

        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        
        // 创建半透明背景覆盖层
        this.settlementOverlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.8);
        this.settlementOverlay.setOrigin(0, 0);
        this.settlementOverlay.setDepth(28); // 增加深度，确保高于所有其他UI元素
        
        // 添加结算界面背景图片，位置X=960，Y=960，缩放为1倍，深度为29
        this.settlementDialogBox = this.add.image(960, 960, 'settlementDialogBox');
        this.settlementDialogBox.setOrigin(0.5);
        this.settlementDialogBox.setScale(1);
        this.settlementDialogBox.setDepth(29);
        
        // 添加文字"获得道具"，位置X=385,Y=420
        this.rewardText = this.add.text(385, 420, '获得道具', {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.rewardText.setOrigin(0.5);
        this.rewardText.setDepth(30);
        
        // 添加文字"分数："，位置X=308,Y=1212
        this.scoreLabelText = this.add.text(310, 1212, '分数', {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.scoreLabelText.setOrigin(0.5);
        this.scoreLabelText.setDepth(30);
        
        // 添加分数显示（this.score），位置X=666,Y=1212
        this.scoreValueText = this.add.text(775, 1212, this.score.toString(), {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.scoreValueText.setOrigin(0.5);
        this.scoreValueText.setDepth(30);
        
        // 添加文字"招募伙伴数"，位置：X=1265,Y=995
        this.friendCountLabelText = this.add.text(1265, 995, '招募伙伴数', {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.friendCountLabelText.setOrigin(0.5);
        this.friendCountLabelText.setDepth(30);
        
        // 添加文字"获得黄瓜数"，位置：X=450,Y=995
        this.cucumberCountLabelText = this.add.text(450, 995, '获得黄瓜数', {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.cucumberCountLabelText.setOrigin(0.5);
        this.cucumberCountLabelText.setDepth(30);
        
        // 添加文字"评级"，位置：X=1130，Y=1212
        this.ratingLabelText = this.add.text(1130, 1212, '评级', {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.ratingLabelText.setOrigin(0.5);
        this.ratingLabelText.setDepth(30);
        
        // 添加数字表示获得黄瓜总数，total_cucumber，位置：X=775,Y=995
        this.totalCucumberValueText = this.add.text(775, 995, this.total_cucumber.toString(), {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.totalCucumberValueText.setOrigin(0.5);
        this.totalCucumberValueText.setDepth(30);
        
        // 添加数字表示招募的伙伴总数，total_friend，位置：X=1590,Y=995
        this.totalFriendValueText = this.add.text(1590, 995, this.total_friend.toString(), {
            fontSize: '88px',
            color: '#e34d24',
            fontFamily: '华文新魏, SimSun, serif'
        });
        this.totalFriendValueText.setOrigin(0.5);
        this.totalFriendValueText.setDepth(30);
        
        // 初始化物品显示数组，用于后续销毁
        this.settlementItems = [];
        
        // 显示物品栏中的物品，带弹出动画
        if (this.inventoryItemTypes && Object.keys(this.inventoryItemTypes).length > 0) {
            // 延迟显示第一个物品
            this.time.delayedCall(500, () => {
                showInventoryItem_Logic.call(this, 0);
            });
        } else {
            // 如果没有物品，直接显示评级图标
            this.time.delayedCall(500, () => {
                showRatingIcon_Logic.call(this);
            });
        }
        
        // 添加返回主界面按钮，按钮贴图选用'passSelect2'，尺寸缩放为1倍
        this.settlementReturnButton = this.add.image(centerX, centerY + 610, 'passSelect2');
        this.settlementReturnButton.setOrigin(0.5);
        this.settlementReturnButton.setDepth(31);
        this.settlementReturnButton.setInteractive();
        
        // 在按钮上添加"返回主界面"文本，48号字体，颜色e7e7e7ff，字体为'Arial, sans-serif'，加粗
        this.settlementReturnText = this.add.text(centerX, centerY + 610, '返回主界面', {
            fontSize: '48px',
            color: '#e7e7e7ff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.settlementReturnText.setOrigin(0.5);
        this.settlementReturnText.setDepth(32);
        
        // 设置返回主界面按钮点击事件
        this.settlementReturnButton.on('pointerdown', () => {
            // 清理结算界面元素
            if (this.settlementOverlay) this.settlementOverlay.destroy();
            if (this.settlementDialogBox) this.settlementDialogBox.destroy();
            if (this.rewardText) this.rewardText.destroy();
            if (this.scoreLabelText) this.scoreLabelText.destroy();
            if (this.scoreValueText) this.scoreValueText.destroy();
            if (this.friendCountLabelText) this.friendCountLabelText.destroy();
            if (this.cucumberCountLabelText) this.cucumberCountLabelText.destroy();
            if (this.ratingLabelText) this.ratingLabelText.destroy();
            if (this.totalCucumberValueText) this.totalCucumberValueText.destroy();
            if (this.totalFriendValueText) this.totalFriendValueText.destroy();
            // 清理物品显示
            if (this.settlementItems) {
                this.settlementItems.forEach(item => {
                    if (item) item.destroy();
                });
            }
            if (this.settlementReturnButton) this.settlementReturnButton.destroy();
            if (this.settlementReturnText) this.settlementReturnText.destroy();
            
            // 返回主界面
            this.scene.start('MainScene');
        });
        
        // 添加鼠标悬停效果
        this.settlementReturnButton.on('pointerover', () => {
            this.tweens.add({
                targets: this.settlementReturnButton,
                scale: 1.1,
                duration: 100,
                ease: 'Linear'
            });
            this.tweens.add({
                targets: this.settlementReturnText,
                scale: 1.1,
                duration: 100,
                ease: 'Linear'
            });
        });
        
        this.settlementReturnButton.on('pointerout', () => {
            this.tweens.add({
                targets: this.settlementReturnButton,
                scale: 1,
                duration: 100,
                ease: 'Linear'
            });
            this.tweens.add({
                targets: this.settlementReturnText,
                scale: 1,
                duration: 100,
                ease: 'Linear'
            });
        });
        
        // 为结算界面元素添加进入动画
        this.rewardText.setScale(0);
        this.scoreLabelText.setScale(0);
        this.scoreValueText.setScale(0);
        this.friendCountLabelText.setScale(0);
        this.cucumberCountLabelText.setScale(0);
        this.ratingLabelText.setScale(0);
        this.totalCucumberValueText.setScale(0);
        this.totalFriendValueText.setScale(0);
        this.settlementReturnButton.setScale(0);
        this.settlementReturnText.setScale(0);
        
        this.tweens.add({
            targets: [this.rewardText, this.scoreLabelText, this.scoreValueText, 
                    this.friendCountLabelText, this.cucumberCountLabelText, 
                    this.ratingLabelText, this.totalCucumberValueText, 
                    this.totalFriendValueText, this.settlementReturnButton, 
                    this.settlementReturnText],
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut',
            delay: 100
        });
    }