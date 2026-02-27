    export function findDialogText_Logic(){
                // 新角色特定对话逻辑
        let dialogText = '';
        if (['高松灯', '长崎素世', '千早爱音', '要乐奈', '椎名立希', 'Ring', '丰川定治', '纯田真奈'].includes(this.currentNpc.name)) {
            // 根据对话阶段设置不同的台词
            if (this.currentNpc.dialogStage === 0) {
                // 第一阶段台词
                switch (this.currentNpc.name) {
                    case '高松灯':
                        dialogText = '小祥，我...准备去看星星，你要一起去么？';
                        break;
                    case '长崎素世':
                        dialogText = '小祥，过几天我们有演唱会，你要来么？';
                        break;
                    case '千早爱音':
                        dialogText = '啊，是小祥，晚上好！现在在做什么呢？';
                        break;
                    case '要乐奈':
                        dialogText = '......嗯(走路发现了你)？';
                        break;
                    case '椎名立希':
                        dialogText = '祥子，你们不去排练么？';
                        break;
                    case 'Ring':
                            dialogText = '抹茶巴菲热销中！请问要买一杯么？';
                            break;
                    case '丰川定治':
                        dialogText = '祥子，有什么事么。';
                        break;
                    case '纯田真奈':
                        dialogText = '啊，小初早上好呀，在这里遇到你们真的很稀奇！这个给你！';
                        break;
                }
            } else if (this.currentNpc.dialogStage === 1) {
                // 第二阶段台词
                switch (this.currentNpc.name) {
                    case '高松灯':
                        dialogText = '小祥，这个给你。';
                        break;
                    case '长崎素世':
                        dialogText = '这个，不需要了。';
                        break;
                    case '千早爱音':
                        dialogText = '这个手机给你，我还有个备用的！';
                        break;
                    case '要乐奈':
                        dialogText = '（猫猫很开心，开始弹奏春日影，祥子的速度提升了！）';
                        break;
                    case '椎名立希':
                        dialogText = '给。';
                        break;
                    case 'Ring':
                        dialogText = '谢谢惠顾！';
                        break;
                    case '丰川定治':
                        dialogText = '给你，拿去用吧';
                        break;
                }
            }
        } else {
            // 乐队成员的对话文本
            switch (this.currentNpc.name) {
                case '八幡海玲':
                    dialogText = '有什么我能帮到的么';
                    break;
                case '佑天寺若麦':
                    dialogText = '扣你基喵姆喵姆~今天给大家带来的是......啊，是祥子';
                    break;
                case '三角初华':
                    dialogText = '好久不见，小祥，今晚可以住在我家吗？';
                    break;
                case '若叶睦':
                    dialogText = '祥，移动';
                    break;
            }
        }
        return dialogText
    }
    
    export function creatNPCDialogButton_Logic(centerdiaX, centerdiaY){
        
        // 设置选项文本
        let option1Text = '';
        let option2Text = '再见desuwa~';
        let option3Text = '';
        let showOption2 = true;
        
        // 移除之前可能存在的按钮元素
        if (this.whitekeyButton1) {
            this.whitekeyButton1.destroy();
        }
        if (this.option1TextObj) {
            this.option1TextObj.destroy();
        }
        if (this.whitekeyButton2) {
            this.whitekeyButton2.destroy();
        }
        if (this.option2TextObj) {
            this.option2TextObj.destroy();
        }
        if (this.blackkeyButton) {
            this.blackkeyButton.destroy();
        }
        if (this.option3TextObj) {
            this.option3TextObj.destroy();
        }
        
        // 设定选项文本
        if (['高松灯', '长崎素世', '千早爱音', '椎名立希', '要乐奈', 'Ring', '丰川定治', '纯田真奈'].includes(this.currentNpc.name)) {
            // 第一阶段对话选项
            if (this.currentNpc.dialogStage === 0) {
                switch (this.currentNpc.name) {
                    case '高松灯':
                        option1Text = this.col_cucumbers >= 1 ? '我也想看星星desuwa!（黄瓜-1）' : '我也想看星星desuwa!（黄瓜不足）';
                        break;
                    case '长崎素世':
                        option1Text = this.col_cucumbers >= 1 ? '我想要你的香水desuwa~（黄瓜-1）' : '我想要你的香水desuwa~（黄瓜不足）';
                        break;
                    case '千早爱音':
                        option1Text = this.col_cucumbers >= 1 ? '想打发时间desuwa~（黄瓜-1）' : '想打发时间desuwa~（黄瓜不足）';
                        break;
                    case '椎名立希':
                        option1Text = this.col_cucumbers >= 1 ? '想买点喝的desuwa~（黄瓜-1）' : '想买点喝的desuwa~（黄瓜不足）';
                        break;
                    case '要乐奈':
                        option1Text = this.Parfait >= 1 ? '喂猫（抹茶巴菲-1）' : '喂猫（抹茶巴菲不足）';
                        break;
                    case 'Ring':
                        option1Text = this.col_cucumbers >= 1 ? '我要买一杯desuwa!（黄瓜-1）' : '我要买一杯desuwa!（黄瓜不足）';
                        break;
                    case '丰川定治':
                        option1Text = '我想开车desuwa~';
                        option2Text = '没什么';
                        break;
                    case '纯田真奈':
                        // 检查队伍中是否有三角初华
                        const hasHatsuka = this.team.some(member => member.texture && member.texture.key === '三角初华');
                        if (hasHatsuka) {
                            option1Text = '谢谢你，我就收下了。';
                            option2Text = '我不太饿，谢谢你的好意';
                        }
                        break;
                }
            } else if (this.currentNpc.dialogStage === 1) {
                // 第二阶段对话选项
                switch (this.currentNpc.name) {
                    case '高松灯':
                        option3Text = '再见desuwa~';
                        showOption2 = false;
                        break;
                    case '长崎素世':
                        option3Text = '（收下黄瓜）';
                        showOption2 = false;
                        break;
                    case '千早爱音':
                        option3Text = '再见desuwa~';
                        showOption2 = false;
                        break;
                    case '要乐奈':
                        option3Text = '离开';
                        showOption2 = false;
                        break;
                    case 'Ring':
                        option3Text = '离开';
                        showOption2 = false;
                        break;
                    case '椎名立希':
                        option3Text = '再见desuwa~';
                        showOption2 = false;
                        break;
                    case '丰川定治':
                        option3Text = '再见desuwa';
                        showOption2 = false;
                        break;
                }
            }
        } else {
                // 招募选项文本
                // 检查是否处于白月光形态
                const isWhiteMoonlightFormActive = this.whiteMoonlightFormActive || false;
                // 检查是否是白月光形态下不需要消耗黄瓜的NPC
                const isWhiteMoonlightNpc = ['若叶睦', '八幡海玲', '佑天寺若麦'].includes(this.currentNpc.name);
                
                if (this.currentNpc.name === '三角初华' || 
                    (this.currentNpc.name === '八幡海玲' && this.inventoryItemTypes && this.inventoryItemTypes['巧克力奶'] && this.inventoryItemTypes['巧克力奶'].count > 0) || 
                    (this.currentNpc.name === '若叶睦' && this.inventoryItemTypes && this.inventoryItemTypes['素世的香水'] && this.inventoryItemTypes['素世的香水'].count > 0) ||
                    (this.currentNpc.name === '佑天寺若麦' && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0) ||
                    (isWhiteMoonlightFormActive && isWhiteMoonlightNpc)) {
                    // 对于佑天寺若麦且持有爱音的手机的特殊情况，显示不同的文本
                    if (this.currentNpc.name === '佑天寺若麦' && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0) {
                        option1Text = '不加入乐队就取关desuwa！';
                    } else {
                        option1Text = '要不要加入我的乐队desuwa!（不需要黄瓜哦）';
                    }
                } else {
                    option1Text = this.col_cucumbers >= 1 ? '要不要加入我的乐队desuwa!（黄瓜-1）' : '要不要加入我的乐队desuwa!（黄瓜不足）';
                }
            }
        
        // 创建按钮
        if (this.currentNpc.dialogStage === 0) {

            // 添加blackkey按钮元素（在选项层上面）
            this.blackkeyButton = this.add.image(centerdiaX - 385, centerdiaY + 160, 'blackkey');
            this.blackkeyButton.setDepth(32); // 设置depth大于选项按钮

            // 创建选项按钮1（使用select1素材）
            this.whitekeyButton1 = this.add.image(centerdiaX - 105, centerdiaY + 128, 'select1');
            this.whitekeyButton1.setOrigin(0.5);
            this.whitekeyButton1.setDepth(31); // 增加深度，确保高于对话框
            
            // 在按钮1上添加文本（文字向右偏移80像素）
            this.option1TextObj = this.add.text(this.whitekeyButton1.x + 80, this.whitekeyButton1.y, option1Text, {
                fontSize: '24px',
                color: '#000000',
                fontFamily: 'PingFang SC, 苹方-简, Microsoft YaHei, sans-serif',
                align: 'center',
                wordWrap: {
                        width: this.whitekeyButton1.width - 40,
                        useAdvancedWrap: true
                    }
            });
            this.option1TextObj.setOrigin(0.5);
            this.option1TextObj.setDepth(32); // 增加深度，确保高于对话框

            // 创建选项按钮2

            this.whitekeyButton2 = this.add.image(centerdiaX - 105, centerdiaY + 192, 'select2');
            this.whitekeyButton2.setOrigin(0.5);
            this.whitekeyButton2.setDepth(31); // 增加深度，确保高于对话框
            
            // 在按钮2上添加文本（文字向右偏移80像素）
            this.option2TextObj = this.add.text(this.whitekeyButton2.x + 80, this.whitekeyButton2.y, option2Text, {
                fontSize: '24px',
                color: '#000000',
                fontFamily: 'PingFang SC, 苹方-简, Microsoft YaHei, sans-serif',
                align: 'center'
            });
            this.option2TextObj.setOrigin(0.5);
            this.option2TextObj.setDepth(32); // 增加深度，确保高于对话框

            

        }else if (this.currentNpc.dialogStage === 1 && ['高松灯', '长崎素世', '千早爱音', '椎名立希', '要乐奈', 'Ring', '丰川定治'].includes(this.currentNpc.name)) {

            // 原白键选项变装饰元素（在选项层上面）
            this.whitekeyButton1 = this.add.image(centerdiaX - 105, centerdiaY + 128, 'select1');
            this.whitekeyButton1.setOrigin(0.5);
            this.whitekeyButton1.setDepth(31); 

            this.whitekeyButton2 = this.add.image(centerdiaX - 105, centerdiaY + 192, 'select2');
            this.whitekeyButton2.setOrigin(0.5);
            this.whitekeyButton2.setDepth(31); 

            // 创建选项按钮黑键
            this.blackkeyButton = this.add.image(centerdiaX - 385, centerdiaY + 160, 'blackkey');
            this.blackkeyButton.setOrigin(0.5);
            this.blackkeyButton.setDepth(32); // 确保高于其他元素
            
            // 在按钮上添加文本（文字向右偏移40像素）
            this.option3TextObj = this.add.text(this.blackkeyButton.x + 40, this.blackkeyButton.y, option3Text, {
                fontSize: '24px',
                color: '#ffffff',
                fontFamily: 'PingFang SC, 苹方-简, Microsoft YaHei, sans-serif',
                align: 'center',
                wordWrap: {
                    width: this.blackkeyButton.width - 40,
                    useAdvancedWrap: true
                }
            });
            this.option3TextObj.setOrigin(0.5);
            this.option3TextObj.setDepth(33); // 增加深度，确保高于对话框
        }
    }
    
    // 显示NPC对话对话框
    export function showNPCDialog_Logic() {
        this.dialogVisible = true;
        this.physics.pause();
        this.isCompleteDialog = false;
        
        const centerdiaX = this.game.config.width / 2;
        const centerdiaY = this.game.config.height / 2;
        
        // 创建半透明背景覆盖层
        this.dialogOverlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.6);
        this.dialogOverlay.setOrigin(0, 0);
        this.dialogOverlay.setDepth(28); // 增加深度，确保高于所有其他UI元素
        
        // 创建对话框（使用用户提供的素材）
        this.dialogBox = this.add.image(centerdiaX, centerdiaY, 'dialog');
        this.dialogBox.setDepth(29); // 增加深度，确保高于所有其他UI元素
        
        // 根据素材调整对话框大小
        this.dialogBox.setScale(0.8); // 根据需要调整缩放比例
        
        // 添加NPC头像
        let npcAvatarName = this.currentNpc.name;
        // 特殊情况：Ring的聊天框显示店员的头像
        if (this.currentNpc.name === 'Ring') {
            npcAvatarName = 'Ring店员';
        }
        // 创建NPC头像并立即设置所有属性
        this.npcAvatar = this.add.image(centerdiaX + 407, centerdiaY - 121, npcAvatarName)
            .setDisplaySize(128, 128)  // 确保大小为128*128
            .setFlipX(true)          // 水平反转头像
            .setDepth(30)            // 确保头像显示在对话框上方
            .setScale(0);            // 初始缩放为0，准备动画
        
        // 添加玩家头像并立即设置所有属性
        let playerAvatarName = '丰川祥子Normal';
        // 如果是纯田真奈的对话框，且队伍中有三角初华，使用三角初华作为玩家头像
        if (this.currentNpc.name === '纯田真奈') {
            const hasHatsuka = this.team.some(member => member.texture && member.texture.key === '三角初华');
            if (hasHatsuka) {
                playerAvatarName = '三角初华';
            }
        }
        this.playerAvatar = this.add.image(centerdiaX + 407, centerdiaY + 155, playerAvatarName)
            .setDisplaySize(128, 128)  // 确保大小为128*128
            .setFlipX(true)          // 水平反转头像
            .setDepth(30)            // 确保头像显示在对话框上方
            .setScale(0);            // 初始缩放为0，准备动画
        
        // 根据NPC类型和对话阶段设置不同的台词和选项文本
        // 先设置基础对话文本
        let dialogText = '';
        dialogText = findDialogText_Logic.call(this);
        
        
        // 先设置为空文本
        this.dialogContent = this.add.text(centerdiaX - 40, centerdiaY - 170, '', {
            fontSize: '36px',
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            wordWrap: {
                width: 720,
                useAdvancedWrap: true
            },
            align: 'left',
            letterSpacing: '10px' // 直接在这里设置字间距
        });
        this.dialogContent.setOrigin(0.5);
        // 调用文字逐字显示动画
        typeText_Logic.call(this, dialogText, this.dialogContent);
        this.dialogContent.setDepth(30); // 增加深度，确保高于对话框
        
        creatNPCDialogButton_Logic.call(this, centerdiaX, centerdiaY); // 创建按钮
        
        // 设置按钮交互逻辑
        if (this.currentNpc && ['高松灯', '长崎素世', '千早爱音', '椎名立希', '要乐奈', 'Ring', '丰川定治', '纯田真奈'].includes(this.currentNpc.name)) {
            // 新角色按钮交互逻辑
            if (this.currentNpc.dialogStage === 0) {
                // 第一阶段：检查黄瓜数量
                    // 检查是否可以选择选项1
                const canSelectOption1 = 
                    this.col_cucumbers >= 1 || 
                    (this.currentNpc.name === '要乐奈' && this.Parfait >= 1) || 
                    (this.currentNpc.name === '丰川定治') ||
                    (this.currentNpc.name === '纯田真奈') ||
                    (this.currentNpc.name === '佑天寺若麦' && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0);
                
                if (canSelectOption1) {
                    this.whitekeyButton1.setInteractive();
                    this.whitekeyButton1.on('pointerdown', () => {
                            this.choice = 'select1';
                            closeDialog_Logic.call(this); // 调用closeDialog触发重新显示第二阶段对话框
                    });
                
                // 添加鼠标悬停效果
                    this.whitekeyButton1.on('pointerover', () => {
                        if (this.whitekeyButton1 && this.option1TextObj) {
                            this.tweens.add({ targets: this.whitekeyButton1, x: centerdiaX - 95, duration: 100, ease: 'Linear' });
                            this.tweens.add({ targets: this.option1TextObj, x: centerdiaX - 15, duration: 100, ease: 'Linear' });
                        }
                    });

                    this.whitekeyButton1.on('pointerout', () => {
                        if (this.whitekeyButton1 && this.option1TextObj) {
                            this.tweens.add({ targets: this.whitekeyButton1, x: centerdiaX - 105, duration: 100, ease: 'Linear' });
                            this.tweens.add({ targets: this.option1TextObj, x: centerdiaX - 25, duration: 100, ease: 'Linear' });
                        }
                    });
                }
            } 

            
            if (this.currentNpc.dialogStage === 1) {
                console.log('this.currentNpc.dialogStage==',this.currentNpc.dialogStage)
                creatNPCDialogButton_Logic.call(this, centerdiaX, centerdiaY); // 重新创建按钮
                // 第二阶段：总是可交互
                this.blackkeyButton.setInteractive();
                this.blackkeyButton.on('pointerdown', () => {
                    this.choice = 'select3';
                    // 确保currentNpc不为null
                    if (this.currentNpc) {
                        console.log('已经点击了黑键！')
                        closeDialog_Logic.call(this);
                    }
                });
                
                // 添加鼠标悬停效果
                this.blackkeyButton.on('pointerover', () => {
                    if (this.blackkeyButton && this.option3TextObj) {
                        this.tweens.add({ targets: this.blackkeyButton, x: centerdiaX - 375, duration: 100, ease: 'Linear' });
                        this.tweens.add({ targets: this.option3TextObj, x: centerdiaX - 335, duration: 100, ease: 'Linear' });
                    }
                });
                
                this.blackkeyButton.on('pointerout', () => {
                    if (this.blackkeyButton && this.option3TextObj) {
                        this.tweens.add({ targets: this.blackkeyButton, x: centerdiaX - 385, duration: 100, ease: 'Linear' });
                        this.tweens.add({ targets: this.option3TextObj, x: centerdiaX - 345, duration: 100, ease: 'Linear' });
                    }
                });

            }
        } else {
                // 原有的招募逻辑 - 优化条件结构
                // 检查是否处于白月光形态
                const isWhiteMoonlightFormActive = this.whiteMoonlightFormActive || false;
                // 检查是否是白月光形态下不需要消耗黄瓜的NPC
                const isWhiteMoonlightNpc = ['若叶睦', '八幡海玲', '佑天寺若麦'].includes(this.currentNpc.name);
                
                const hasRecruitCondition = 
                    this.currentNpc.name === '三角初华' || 
                    this.col_cucumbers >= 1 || 
                    (this.currentNpc.name === '八幡海玲' && this.inventoryItemTypes && this.inventoryItemTypes['巧克力奶'] && this.inventoryItemTypes['巧克力奶'].count > 0) || 
                    (this.currentNpc.name === '若叶睦' && this.inventoryItemTypes && this.inventoryItemTypes['素世的香水'] && this.inventoryItemTypes['素世的香水'].count > 0) ||
                    (this.currentNpc.name === '佑天寺若麦' && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0) ||
                    (isWhiteMoonlightFormActive && isWhiteMoonlightNpc);
                
                if (hasRecruitCondition) {
                    this.whitekeyButton1.setInteractive();
                    this.whitekeyButton1.on('pointerdown', () => {
                        this.choice = 'recruit';
                        closeDialog_Logic.call(this);
                    });
                    
                    // 添加鼠标悬停效果
                    this.whitekeyButton1.on('pointerover', () => {
                        if (this.whitekeyButton1 && this.option1TextObj) {
                            this.tweens.add({ targets: this.whitekeyButton1, x: centerdiaX - 95, duration: 100, ease: 'Linear' });
                            this.tweens.add({ targets: this.option1TextObj, x: centerdiaX - 15, duration: 100, ease: 'Linear' });
                        }
                    });
                    
                    this.whitekeyButton1.on('pointerout', () => {
                        if (this.whitekeyButton1 && this.option1TextObj) {
                            this.tweens.add({ targets: this.whitekeyButton1, x: centerdiaX - 105, duration: 100, ease: 'Linear' });
                            this.tweens.add({ targets: this.option1TextObj, x: centerdiaX - 25, duration: 100, ease: 'Linear' });
                        }
                    });
                }
            }

        if (this.currentNpc.dialogStage === 0) {
            this.whitekeyButton2.setInteractive(); // 总是可交互
            this.whitekeyButton2.on('pointerdown', () => {
            this.choice = 'leave';
            closeDialog_Logic.call(this);
            });
            
            // 添加鼠标悬停效果：按钮和文字分别移动
            this.whitekeyButton2.on('pointerover', () => {
                if (this.whitekeyButton2 && this.option2TextObj) {
                    // 按钮向右移动10像素到centerdiaX - 75
                    this.tweens.add({
                        targets: this.whitekeyButton2,
                        x: centerdiaX - 95,
                        duration: 100,
                        ease: 'Linear'
                    });
                    // 文字向右移动到centerdiaX + 5的位置
                    this.tweens.add({
                        targets: this.option2TextObj,
                        x: centerdiaX - 15,
                        duration: 100,
                        ease: 'Linear'
                    });
                }
            }
            );
            
            // 鼠标离开时恢复原位
            this.whitekeyButton2.on('pointerout', () => {
                if (this.whitekeyButton2 && this.option2TextObj) {
                    // 按钮移回原位centerdiaX - 85
                    this.tweens.add({
                        targets: this.whitekeyButton2,
                        x: centerdiaX - 105,
                        duration: 100,
                        ease: 'Linear'
                    });
                    // 文字移回原位到centerdiaX - 5的位置
                    this.tweens.add({
                        targets: this.option2TextObj,
                        x: centerdiaX - 25,
                        duration: 100,
                        ease: 'Linear'
                    });
                }
                
            }); 

        }
        // 调用文字逐字显示动画
        typeText_Logic.call(this, dialogText, this.dialogContent);
        
        // 根据对话阶段设置不同的提示文本
        const hintText = this.currentNpc && this.currentNpc.dialogStage === 1 ? '按空格结束对话' : '按1或2选择选项';
        this.dialogHint = this.add.text(centerdiaX, centerdiaY + 310, hintText, {
            fontSize: '24px',
            color: 'rgba(214, 11, 30, 0.7)',
            fontFamily: 'Arial, sans-serif'
        });
        this.dialogHint.setOrigin(0.5);
        this.dialogHint.setDepth(30); // 增加深度
        
        // 添加从中间弹出的动画效果
        this.dialogBox.setScale(0);
        this.dialogContent.setScale(0);
        this.whitekeyButton1.setScale(0);
        this.whitekeyButton2.setScale(0);
        this.blackkeyButton.setScale(0);
        this.dialogHint.setScale(0);
        
        // 创建动画目标数组，包含所有元素
        const animationTargets = [this.dialogBox, this.dialogContent, this.whitekeyButton1, this.whitekeyButton2, this.blackkeyButton, this.dialogHint];
        
        this.tweens.add({
            targets: animationTargets,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });
        
        // 单独为头像创建动画，先恢复scale再确保尺寸
        this.tweens.add({
            targets: [this.npcAvatar, this.playerAvatar],
            scale: 0.25,
            duration: 500,
            ease: 'Back.easeOut',
            onComplete: () => {
                // 使用setDisplaySize正确设置头像尺寸
                this.npcAvatar.setDisplaySize(128, 128);
                this.playerAvatar.setDisplaySize(128, 128);
            }
        });
        
    }
    
    // 文字逐字显示方法 - 实现从左到右依次出现并在超过宽度时换行，字间距10像素
    export function typeText_Logic(text, textObject) {
        const centerdiaX = this.game.config.width / 2;
        const centerdiaY = this.game.config.height / 2;
        const startX = centerdiaX - 500; // 起始X坐标
        const startY = centerdiaY - 200; // 起始Y坐标
        const endX = centerdiaX + 250;   // 换行X坐标阈值
        const lineHeight = 60;          // 行高像素值
        
        // 停止之前可能存在的定时器
        if (this.typeInterval) {
            this.typeInterval.remove();
        }
        
        let index = 0;
        textObject.setText('');
        textObject.setPosition(startX, startY);
        textObject.setOrigin(0, 0); // 设置原点为左上角，便于逐字排版
        // 更新文本样式，不覆盖已设置的字间距
        textObject.setStyle({
            fontSize: '36px',
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            align: 'left',
            wordWrap: {
                width: endX - startX,
                useAdvancedWrap: true
            }
            // 不在这里设置letterSpacing，避免覆盖dialogContent创建时的设置
        });
        
        // 存储每行的文本
        let lines = [''];
        let currentLine = 0;
        
        // 将定时器赋值给实例属性，便于后续清理
        this.typeInterval = this.time.addEvent({
            delay: 100, // 每个字显示的间隔时间（毫秒）
            callback: () => {
                if (index < text.length) {
                    // 获取下一个字符
                    const nextChar = text.charAt(index);
                    // 临时添加到当前行
                    const tempLine = lines[currentLine] + nextChar;
                    
                    // 临时创建一个文本对象来测量宽度，包含字间距
                    const tempText = this.add.text(0, 0, tempLine, {
                        fontSize: '36px',
                        fontFamily: 'Arial, sans-serif',
                        letterSpacing: '10px' // 直接使用与dialogContent相同的字间距设置
                    });
                    const textWidth = tempText.width;
                    tempText.destroy(); // 立即销毁临时对象
                    
                    // 检查是否需要换行
                    if (startX + textWidth > endX && lines[currentLine].length > 0) {
                        // 需要换行，创建新行
                        currentLine++;
                        lines[currentLine] = nextChar;
                    } else {
                        // 不需要换行，添加到当前行
                        lines[currentLine] = tempLine;
                    }
                    
                    // 合并所有行文本
                    const fullText = lines.join('\n');
                    // 更新文本
                    textObject.setText(fullText);
                    index++;
                } else {
                    // 文本显示完毕，停止定时器
                    if (this.typeInterval) {
                        this.typeInterval.remove();
                    }
                }
            },
            repeat: text.length - 1,
            callbackScope: this
        });
    }
    
    // 显示通关对话框
    export function showCompleteDialog_Logic() {
        this.dialogVisible = true;
        this.isCompleteDialog = true;
        this.physics.pause();
        
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;
        
        // 创建半透明背景覆盖层
        this.dialogOverlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.8);
        this.dialogOverlay.setOrigin(0, 0);
        this.dialogOverlay.setDepth(28); // 增加深度，确保高于所有其他UI元素
        
        // 创建对话框（使用用户提供的素材）
        this.dialogBox = this.add.image(centerX, centerY, 'passDialogBox');
        this.dialogBox.setDepth(29); // 增加深度，确保高于所有其他UI元素
        
        // 根据素材调整对话框大小
        this.dialogBox.setScale(0.7); // 通关对话框缩放0.7倍
        
        // 添加通关文本
        const isFinalLevel = this.level === 3; // 第三关是最后一关
        const dialogText = isFinalLevel ? '恭喜通关！' : '恭喜过关！';
        
        this.dialogContent = this.add.text(centerX + 40, centerY - 290, dialogText, {
            fontSize: '96px',
            color: '#ffcc00',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            align: 'center'
        });
        this.dialogContent.setOrigin(0.5);
        this.dialogContent.setDepth(30); // 增加深度，确保高于对话框
        
        // 初始化缩放为0，准备动画
        this.dialogContent.setScale(0);
        this.dialogBox.setScale(0);

        // 添加动画效果
        this.tweens.add({
            targets: [this.dialogBox],
            scale: 0.7,
            duration: 500,
            ease: 'Back.easeOut'
        });

        // 根据是否是最后一关和allowAccessToTheNextLevel参数决定是否显示下一关按钮
        if (!isFinalLevel && this.allowAccessToTheNextLevel) {            
            this.nextLevelButton = this.add.image(centerX, centerY + 100, 'passSelect1');
            this.nextLevelButton.setOrigin(0.5);
            this.nextLevelButton.setDepth(31); // 增加深度，确保显示在对话框之上
            this.nextLevelButton.setInteractive();
            this.nextLevelButton.setScale(0); // 初始缩放为0
            this.nextLevelButton.on('pointerdown', () => {
                this.choice = 'nextLevel';
                closeDialog_Logic.call(this);
            });
            
            // 在passSelect1按钮上添加'下一关'文本
            this.nextLevelText = this.add.text(centerX, centerY + 100, '下一关', {
                fontSize: '48px',
                color: '#1e1e1eff',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            this.nextLevelText.setOrigin(0.5);
            this.nextLevelText.setDepth(32); // 确保文本显示在按钮之上
            this.nextLevelText.setScale(0); // 初始缩放为0

            this.tweens.add({
                targets: [this.nextLevelText, this.nextLevelButton],
                scale: 1,
                duration: 500,
                ease: 'Back.easeOut'
            });

            // 添加返回主界面按钮（使用图片）
            this.returnButton = this.add.image(centerX, centerY + 330, 'passSelect2');
            this.returnButton.setOrigin(0.5);
            this.returnButton.setDepth(31); // 增加深度，确保显示在对话框之上
            this.returnButton.setInteractive();
            this.returnButton.setScale(0); // 初始缩放为0
            this.returnButton.on('pointerdown', () => {
                this.choice = 'returnMain';
                closeDialog_Logic.call(this);
            });
            
            // 在passSelect2按钮上添加'返回主界面'文本
            this.returnMainText = this.add.text(centerX, centerY + 330, '返回主界面', {
                fontSize: '48px',
                color: '#e7e7e7ff',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            this.returnMainText.setOrigin(0.5);
            this.returnMainText.setDepth(32); // 确保文本显示在按钮之上
            this.returnMainText.setScale(0); // 初始缩放为0
        
            // 添加提示文本
            this.dialogHint = this.add.text(centerX, centerY + 550, '按1选下一关，按2选返回主界面', {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif'
            });
            this.dialogHint.setOrigin(0.5);
            this.dialogHint.setDepth(32); // 增加深度，确保显示在按钮之上
            this.dialogHint.setScale(0); // 初始缩放为0

            this.tweens.add({
            targets: [this.dialogContent, this.returnButton, this.returnMainText, this.dialogHint],
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });
        }else if (isFinalLevel && this.allowAccessToTheNextLevel) {
            // 添加进入结算界面按钮（使用图片）
            this.settleButton = this.add.image(centerX, centerY + 330, 'passSelect2');
            this.settleButton.setOrigin(0.5);
            this.settleButton.setDepth(31); // 增加深度，确保显示在对话框之上
            this.settleButton.setInteractive();
            this.settleButton.setScale(0); // 初始缩放为0
            this.settleButton.on('pointerdown', () => {
                this.choice = 'jumpToSettlementScene';
                closeDialog_Logic.call(this);
            });
            
            // 在passSelect2按钮上添加'进入结算界面'文本
            this.settleText = this.add.text(centerX, centerY + 330, '进入结算界面', {
                fontSize: '48px',
                color: '#e7e7e7ff',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            this.settleText.setOrigin(0.5);
            this.settleText.setDepth(32); // 确保文本显示在按钮之上
            this.settleText.setScale(0); // 初始缩放为0
        
            // 添加提示文本
            this.dialogHint = this.add.text(centerX, centerY + 550, '按空格进入结算界面', {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif'
            });
            this.dialogHint.setOrigin(0.5);
            this.dialogHint.setDepth(32); // 增加深度，确保显示在按钮之上
            this.dialogHint.setScale(0); // 初始缩放为0

            this.tweens.add({
            targets: [this.dialogContent, this.settleButton, this.settleText, this.dialogHint],
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        })
        }else {
            // 添加返回主界面按钮（使用图片）
            this.returnButton = this.add.image(centerX, centerY + 330, 'passSelect2');
            this.returnButton.setOrigin(0.5);
            this.returnButton.setDepth(31); // 增加深度，确保显示在对话框之上
            this.returnButton.setInteractive();
            this.returnButton.setScale(0); // 初始缩放为0
            this.returnButton.on('pointerdown', () => {
            this.choice = 'returnMain';
            closeDialog_Logic.call(this);
            });
            
            // 在passSelect2按钮上添加'返回主界面'文本
            this.returnMainText = this.add.text(centerX, centerY + 330, '返回主界面', {
                fontSize: '48px',
                color: '#e7e7e7ff',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            });
            this.returnMainText.setOrigin(0.5);
            this.returnMainText.setDepth(32); // 确保文本显示在按钮之上
            this.returnMainText.setScale(0); // 初始缩放为0
        
            // 添加提示文本
            this.dialogHint = this.add.text(centerX, centerY + 550, '按2返回主界面', {
                fontSize: '16px',
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif'
            });
            this.dialogHint.setOrigin(0.5);
            this.dialogHint.setDepth(32); // 增加深度，确保显示在按钮之上
            this.dialogHint.setScale(0); // 初始缩放为0

            this.tweens.add({
            targets: [this.dialogContent, this.returnButton, this.returnMainText, this.dialogHint],
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        })
        }
        
        // 添加丰川祥子笑脸图片
        this.祥子笑脸 = this.add.image(centerX + 542, centerY + 557, '丰川祥子SmileCircle');
        this.祥子笑脸.setOrigin(0.5);
        this.祥子笑脸.setDepth(32); // 确保显示在对话框之上
        this.祥子笑脸.setScale(0); // 初始缩放为0，用于动画
        
        // 为祥子笑脸图片单独设置动画
        this.tweens.add({
            targets: [this.祥子笑脸],
            scale: 0.25,
            duration: 500,
            ease: 'Back.easeOut'
        });

        
    }
    
    // 关闭对话框
    export function closeDialog_Logic() {
        // 清理文字逐字显示定时器
        if (this.typeInterval) {
            this.typeInterval.remove();
            this.typeInterval = null;
        }
        
        // 先处理选择逻辑，判断是否需要直接进入下一阶段对话
        let shouldShowNextStageDialog = false;
        
        // NPC对话框的处理
        if (!this.isCompleteDialog && this.choice === 'select1' && this.currentNpc && ['高松灯', '长崎素世', '千早爱音', '要乐奈', '椎名立希', 'Ring', '丰川定治', '纯田真奈'].includes(this.currentNpc.name)) {
            
            // 根据角色类型获取不同道具
            switch (this.currentNpc.name) {
                case '高松灯':
                    this.col_cucumbers--;
                    this.useInventoryItem('cucumber', 1);
                    this.addInventoryItem('天文望远镜', 1);
                    break;
                case '长崎素世':
                    this.addInventoryItem('素世的香水', 1);
                    break;
                case '千早爱音':
                    this.col_cucumbers--;
                    this.useInventoryItem('cucumber', 1);
                    this.addInventoryItem('爱音的手机', 1);
                    break;
                case '要乐奈':
                    // 消耗抹茶巴菲，使得玩家获得永久双倍移动能力
                    this.Parfait--;
                    this.permanentDoubleMove = true; // 设置永久双倍移动能力
                    this.canMoveTwice = true; // 设置当前回合也可以移动两次
                    this.moveCount = 0; // 重置移动计数
                    this.useInventoryItem('抹茶巴菲', 1);
                    // 当玩家与要乐奈对话并选择第一个选项时，切换背景音乐
                    console.log('选择要乐奈对话第一个选项，切换到shadowOfSpring音乐');
                    this.switchBackgroundMusic('shadowOfSpring');
                    // 设置头像为丰川祥子Cry，保持64*64大小
                    this.player.setTexture('丰川祥子Cry');  
                    this.player.setDisplaySize(64, 64);
                    break;

                case 'Ring':
                    this.col_cucumbers--;
                    this.useInventoryItem('cucumber', 1);
                    // Ring提供抹茶巴菲道具
                    this.addInventoryItem('抹茶巴菲', 1);
                    this.Parfait++; // 增加抹茶巴菲数量
                    break;
                case '椎名立希':
                    this.col_cucumbers--;
                    this.useInventoryItem('cucumber', 1);
                    this.addInventoryItem('巧克力奶', 1);
                    break;
                case '丰川定治':
                    // 获得道具"迈巴赫钥匙"并添加到道具栏，但如果已经有则不再添加
                    if (!this.inventoryItemTypes || !this.inventoryItemTypes['迈巴赫钥匙']) {
                        this.addInventoryItem('迈巴赫钥匙', 1);
                        console.log('获得迈巴赫钥匙');
                    } else {
                        console.log('已经有迈巴赫钥匙，不再添加');
                    }
                    break;
                case '纯田真奈':
                    // 获得道具"甜甜圈"并添加到道具栏，但如果已经有则不再添加
                    if (!this.inventoryItemTypes || !this.inventoryItemTypes['甜甜圈']) {
                        this.addInventoryItem('甜甜圈', 1);
                        console.log('获得甜甜圈');
                        
                        // 点亮甜甜圈获得成就
                        const achievements = JSON.parse(localStorage.getItem('gameAchievements') || '{}');
                        achievements[10] = true; // sumimi是不会解散的！（获得道具甜甜圈）
                        localStorage.setItem('gameAchievements', JSON.stringify(achievements));
                        console.log('甜甜圈获得成就已点亮');
                    } else {
                        console.log('已经有甜甜圈，不再添加');
                    }
                    break;
            }
        
            // 标记为已离开，避免一回合内重复触发
            if (!this.leftNpcsThisTurn.includes(this.currentNpc)) {
                this.leftNpcsThisTurn.push(this.currentNpc);
            }
            
            // 只有在第一阶段(dialogStage === 0)才设置shouldShowNextStageDialog为true以显示第二阶段对话
            if (this.currentNpc.dialogStage === 0 && this.currentNpc.name !== '纯田真奈') {
                shouldShowNextStageDialog = true;
                this.currentNpc.dialogStage = 1;
            }
        }
        
        // 如果需要直接进入下一阶段对话，先清理当前对话框元素
        if (shouldShowNextStageDialog) {
            // 确定需要销毁的元素，包括所有对话框相关元素
            const elementsToDestroy = [this.dialogOverlay, this.dialogBox, this.dialogContent];
            if (this.dialogHint) elementsToDestroy.push(this.dialogHint);
            if (this.npcAvatar) elementsToDestroy.push(this.npcAvatar);
            if (this.playerAvatar) elementsToDestroy.push(this.playerAvatar);
            if (this.whitekeyButton1) elementsToDestroy.push(this.whitekeyButton1);
            if (this.whitekeyButton2) elementsToDestroy.push(this.whitekeyButton2);
            if (this.option1TextObj) elementsToDestroy.push(this.option1TextObj);
            if (this.option2TextObj) elementsToDestroy.push(this.option2TextObj);
            if (this.option3TextObj) elementsToDestroy.push(this.option3TextObj);
            if (this.blackkeyButton) elementsToDestroy.push(this.blackkeyButton);
            
            console.log('转阶段-准备销毁的元素数量：' + elementsToDestroy.length);
            
            // 创建临时组来管理所有装饰元素，确保它们被完全移除
            const decorationsGroup = this.add.group();
            
            // 先将所有元素添加到组中
            elementsToDestroy.forEach((element, index) => {
                if (element && element.scene) {
                    decorationsGroup.add(element);
                }
            });
            
            // 立即销毁元素
            console.log('开始销毁元素列表...');
            elementsToDestroy.forEach((element, index) => {
                if (element && element.destroy) {
                    console.log(`销毁元素 ${index}: ${element.texture ? element.texture.key : '无纹理元素'}`);
                    element.destroy();
                    // 额外检查并确保纹理被清除
                    if (element.texture && ['select1', 'select2'].includes(element.texture.key)) {
                        console.log(`确认销毁 ${element.texture.key} 纹理`);
                    }
                } else {
                    console.log(`跳过元素 ${index}: 无效元素或没有destroy方法`);
                }
            });
            
            // 清空组以确保所有元素被移除
            decorationsGroup.clear(true, true);
            console.log('元素销毁完成，组已清空');
            
            // 清除临时变量
            this.whitekeyButton1 = null;
            this.whitekeyButton2 = null;
            this.option1TextObj = null;
            this.option2TextObj = null;
            this.dialogContent = null;
            this.dialogHint = null;
            this.npcAvatar = null;
            this.playerAvatar = null;
            this.choice = null;

            
            // 直接显示下一阶段对话框，不关闭主对话框
            showNPCDialog_Logic.call(this);
            return;
        }
        
        // 确定需要销毁的元素
        const elementsToDestroy = [this.dialogOverlay, this.dialogBox, this.dialogContent];
        if (this.dialogHint) elementsToDestroy.push(this.dialogHint);
        if (this.npcAvatar) elementsToDestroy.push(this.npcAvatar);
        if (this.playerAvatar) elementsToDestroy.push(this.playerAvatar);
        if (this.whitekeyButton1) elementsToDestroy.push(this.whitekeyButton1);
        if (this.whitekeyButton2) elementsToDestroy.push(this.whitekeyButton2);
        if (this.option1TextObj) elementsToDestroy.push(this.option1TextObj);
        if (this.option2TextObj) elementsToDestroy.push(this.option2TextObj);
        if (this.option3TextObj) elementsToDestroy.push(this.option3TextObj);
        if (this.nextLevelButton) elementsToDestroy.push(this.nextLevelButton);
        if (this.returnButton) elementsToDestroy.push(this.returnButton);
        if (this.blackkeyButton) elementsToDestroy.push(this.blackkeyButton);
        if (this.settleButton) elementsToDestroy.push(this.settleButton);
        if (this.settleText) elementsToDestroy.push(this.settleText);
        if (this["祥子笑脸"]) elementsToDestroy.push(this["祥子笑脸"]);
        if (this.returnMainText) elementsToDestroy.push(this.returnMainText);
        
      
        
        
        // 添加缩小消失的动画效果
        const finalElementsToDestroy = elementsToDestroy; // 创建副本以避免回调中的引用问题
        this.tweens.add({
            targets: this.dialogBox, // 只对对话框进行缩放动画
            scale: 0,
            duration: 300,
            ease: 'Back.easeIn',
            onComplete: () => {
                // 移除对话框相关元素
                console.log('动画完成，开始销毁元素列表...');
                console.log(`要销毁的元素数量: ${finalElementsToDestroy.length}`);
                
                // 首先创建一个临时组来管理所有装饰元素，确保它们被完全移除
                const decorationsGroup = this.add.group();
                
                // 先将所有元素添加到组中
                finalElementsToDestroy.forEach((element, index) => {
                    if (element && element.scene) {
                        decorationsGroup.add(element);
                    }
                });
                
                // 逐个销毁元素
                finalElementsToDestroy.forEach((element, index) => {
                    if (element && element.destroy) {
                        console.log(`销毁元素 ${index}: ${element.texture ? element.texture.key : '无纹理元素'}`);
                        element.destroy();
                        // 额外检查并确保纹理被清除
                        if (element.texture && ['select1', 'select2'].includes(element.texture.key)) {
                            console.log(`确认销毁 ${element.texture.key} 纹理`);
                        }
                    } else {
                        console.log(`跳过元素 ${index}: 无效元素或没有destroy方法`);
                    }
                });
                
                // 清空组以确保所有元素被移除
                decorationsGroup.clear(true, true);
                console.log('元素销毁完成，组已清空');
                
                // 判断是否是通关对话框
                if (this.isCompleteDialog) {

                    // 根据选择执行不同操作
                    if (this.choice === 'nextLevel') {
                        // 进入下一关，传递当前道具信息
                        const nextLevel = this.level + 1;
                        // 在切换关卡前保存五个特殊道具到localStorage
                        if (this.inventoryItemTypes) {
                            const savedInventory = {};
                            if (this.inventoryItemTypes['迈巴赫钥匙']) {
                                savedInventory['迈巴赫钥匙'] = this.inventoryItemTypes['迈巴赫钥匙'];
                            }
                            if (this.inventoryItemTypes['空啤酒罐']) {
                                savedInventory['空啤酒罐'] = this.inventoryItemTypes['空啤酒罐'];
                            }
                            if (this.inventoryItemTypes['芭蕾舞鞋']) {
                                savedInventory['芭蕾舞鞋'] = this.inventoryItemTypes['芭蕾舞鞋'];
                            }
                            if (this.inventoryItemTypes['Mygo联合演出邀请函']) {
                                savedInventory['Mygo联合演出邀请函'] = this.inventoryItemTypes['Mygo联合演出邀请函'];
                            }
                            if (this.inventoryItemTypes['神秘的玩偶']) {
                                savedInventory['神秘的玩偶'] = this.inventoryItemTypes['神秘的玩偶'];
                            }
                            localStorage.setItem('gameInventory', JSON.stringify(savedInventory));
                            console.log('通关后保存了五个特殊道具到localStorage:', savedInventory);
                        }
                        // 在切换关卡前将背景音乐切换回backgroundMusic
                        console.log('切换关卡，将背景音乐切换回backgroundMusic');
                        this.switchBackgroundMusic('backgroundMusic');
                        
                        // 清除所有樱花视频（如果存在）
                        if (this.cherryBlossom) {
                            console.log('清除原始樱花视频');
                            this.cherryBlossom.destroy();
                            this.cherryBlossom = null;
                        }
                        
                        if (this.cherryBlossomInstances && this.cherryBlossomInstances.length > 0) {
                            console.log('清除所有樱花视频实例');
                            this.cherryBlossomInstances.forEach((video, index) => {
                                if (video && video.destroy) {
                                    video.destroy();
                                }
                            });
                            this.cherryBlossomInstances = [];
                        }
                        
                        // 锁定键盘输入
                        this.keyboardLocked = true;
                        
                        if(this.level === 1 && this.allowAccessToTheNextLevel){
                            // 1)：'背景板子level1'从屏幕外向下移动到屏幕中央
                            const backgroundBoard1 = this.add.image(960, -960, '背景板子level1');
                            backgroundBoard1.setDisplaySize(1920, 1920);
                            backgroundBoard1.setDepth(100); // 设置高深度，确保显示在最前面
                            
                            this.tweens.add({
                                targets: backgroundBoard1,
                                y: 960,
                                duration: 1000, // 动画持续时间1秒
                                ease: 'Linear',
                                onComplete: () => {
                                    // 2)：销毁'背景板子level1'，播放视频‘关卡短切换倒放level1’
                                    backgroundBoard1.destroy();
                                    
                                    const reverseVideo = this.add.video(this.game.config.width / 2, this.game.config.height / 2, '关卡短切换倒放level1');
                                    reverseVideo.setDisplaySize(1920, 1920);
                                    reverseVideo.setDepth(100); // 设置高深度，确保显示在最前面
                                    reverseVideo.play();
                                    
                                    reverseVideo.on('complete', () => {
                                        reverseVideo.destroy();
                                        
                                        // 3)：进入到第二关
                                        this.scene.stop('GameScene');
                                        this.scene.start('GameScene', {
                                            level: nextLevel,
                                            inventory: this.inventoryItemTypes, // 传递所有道具
                                            cucumberCount: this.col_cucumbers, // 传递黄瓜数量
                                            score: this.score, // 传递分数
                                            total_cucumber: this.total_cucumber, // 传递累计黄瓜数
                                            total_friend: this.total_friend, // 传递累计招募NPC数
                                            fromMain: this.fromMain, // 保持fromMain状态
                                            allowAccessToTheNextLevel: true,
                                            whiteMoonlightFormActive: this.whiteMoonlightFormActive, // 传递白月光形态状态
                                            showTransition: true // 标记需要显示过渡动画
                                        });
                                    });
                                }
                            });
                        }else if(this.level === 2 && this.allowAccessToTheNextLevel){
                            // 1)：'背景板子level2'从屏幕外向下移动到屏幕中央
                            const backgroundBoard2 = this.add.image(960, -960, '背景板子level2');
                            backgroundBoard2.setDisplaySize(1920, 1920);
                            backgroundBoard2.setDepth(100); // 设置高深度，确保显示在最前面
                            
                            this.tweens.add({
                                targets: backgroundBoard2,
                                y: 960,
                                duration: 1000, // 动画持续时间1秒
                                ease: 'Linear',
                                onComplete: () => {
                                    // 2)：销毁'背景板子level2'，播放视频‘关卡短切换倒放level2’
                                    backgroundBoard2.destroy();
                                    
                                    const reverseVideo = this.add.video(this.game.config.width / 2, this.game.config.height / 2, '关卡短切换倒放level2');
                                    reverseVideo.setDisplaySize(1920, 1920);
                                    reverseVideo.setDepth(100); // 设置高深度，确保显示在最前面
                                    reverseVideo.play();
                                    
                                    reverseVideo.on('complete', () => {
                                        reverseVideo.destroy();
                                        
                                        // 3)：进入到第三关
                                        this.scene.stop('GameScene');
                                        this.scene.start('GameScene', {
                                            level: nextLevel,
                                            inventory: this.inventoryItemTypes, // 传递所有道具
                                            cucumberCount: this.col_cucumbers, // 传递黄瓜数量
                                            score: this.score, // 传递分数
                                            total_cucumber: this.total_cucumber, // 传递累计黄瓜数
                                            total_friend: this.total_friend, // 传递累计招募NPC数
                                            fromMain: this.fromMain, // 保持fromMain状态
                                            allowAccessToTheNextLevel: true,
                                            whiteMoonlightFormActive: this.whiteMoonlightFormActive, // 传递白月光形态状态
                                            showTransition: true // 标记需要显示过渡动画
                                        });
                                    });
                                }
                            });
                        }else{
                            this.scene.stop('GameScene');
                            this.scene.start('GameScene', {
                                level: nextLevel,
                                inventory: this.inventoryItemTypes, // 传递所有道具
                                cucumberCount: this.col_cucumbers, // 传递黄瓜数量
                                score: this.score, // 传递分数
                                total_cucumber: this.total_cucumber, // 传递累计黄瓜数
                                total_friend: this.total_friend, // 传递累计招募NPC数
                                fromMain: this.fromMain, // 保持fromMain状态
                                whiteMoonlightFormActive: this.whiteMoonlightFormActive, // 传递白月光形态状态
                                showTransition: true // 标记需要显示过渡动画
                            });
                        }
                        
                        
                    } else if (this.choice === 'returnMain') {
                        // 返回主界面时停止所有音乐
                        console.log('返回主界面，停止所有音乐');
                        this.stopAllMusic();
                        // 只保存"迈巴赫钥匙"、"空啤酒罐"、"芭蕾舞鞋"、"Mygo联合演出邀请函"、"神秘的玩偶"道具到localStorage，其他道具清零
                        if (this.inventoryItemTypes) {
                            const savedInventory = {};
                            if (this.inventoryItemTypes['迈巴赫钥匙']) {
                                savedInventory['迈巴赫钥匙'] = this.inventoryItemTypes['迈巴赫钥匙'];
                            }
                            if (this.inventoryItemTypes['空啤酒罐']) {
                                savedInventory['空啤酒罐'] = this.inventoryItemTypes['空啤酒罐'];
                            }
                            if (this.inventoryItemTypes['芭蕾舞鞋']) {
                                savedInventory['芭蕾舞鞋'] = this.inventoryItemTypes['芭蕾舞鞋'];
                            }
                            if (this.inventoryItemTypes['Mygo联合演出邀请函']) {
                                savedInventory['Mygo联合演出邀请函'] = this.inventoryItemTypes['Mygo联合演出邀请函'];
                            }
                            if (this.inventoryItemTypes['神秘的玩偶']) {
                                savedInventory['神秘的玩偶'] = this.inventoryItemTypes['神秘的玩偶'];
                            }
                            localStorage.setItem('gameInventory', JSON.stringify(savedInventory));
                            console.log('只保存了迈巴赫钥匙、空啤酒罐、芭蕾舞鞋、Mygo联合演出邀请函、神秘的玩偶到localStorage:', savedInventory);
                        }
                        // 返回主界面
                        this.scene.start('MainScene');
                    } else if (this.choice === 'jumpToSettlementScene') {
                        
                        
                        // 停止所有音乐
                        this.stopAllMusic();
                        // 在进入结算界面前保存五个特殊道具到localStorage
                        if (this.inventoryItemTypes) {
                            const savedInventory = {};
                            if (this.inventoryItemTypes['迈巴赫钥匙']) {
                                savedInventory['迈巴赫钥匙'] = this.inventoryItemTypes['迈巴赫钥匙'];
                            }
                            if (this.inventoryItemTypes['空啤酒罐']) {
                                savedInventory['空啤酒罐'] = this.inventoryItemTypes['空啤酒罐'];
                            }
                            if (this.inventoryItemTypes['芭蕾舞鞋']) {
                                savedInventory['芭蕾舞鞋'] = this.inventoryItemTypes['芭蕾舞鞋'];
                            }
                            if (this.inventoryItemTypes['Mygo联合演出邀请函']) {
                                savedInventory['Mygo联合演出邀请函'] = this.inventoryItemTypes['Mygo联合演出邀请函'];
                            }
                            if (this.inventoryItemTypes['神秘的玩偶']) {
                                savedInventory['神秘的玩偶'] = this.inventoryItemTypes['神秘的玩偶'];
                            }
                            localStorage.setItem('gameInventory', JSON.stringify(savedInventory));
                            console.log('进入结算界面前保存了五个特殊道具到localStorage:', savedInventory);
                        }
                        

                        
                        // 显示结算界面
                        this.showSettlementScene();
                    } else {
                        // 根据fromMain参数决定返回哪里
                        if (this.fromMain) {
                            // 如果是从主界面开始游戏，返回关卡选择界面
                            this.scene.start('LevelSelect');
                        } else {
                            // 如果是从关卡选择进入的，也返回关卡选择界面
                            this.scene.start('LevelSelect');
                        }
                    }
                } else {
                        // NPC对话框的处理
                        // 修复招募条件，确保若叶睦在持有素世的香水时能够招募
                        // 检查是否处于白月光形态
                        const isWhiteMoonlightFormActive = this.whiteMoonlightFormActive || false;
                        
                        // 检查是否是白月光形态下不需要消耗黄瓜的NPC
                        const isWhiteMoonlightNpc = ['若叶睦', '八幡海玲', '佑天寺若麦'].includes(this.currentNpc.name);
                        
                        const hasRecruitCondition = 
                            this.currentNpc.name === '三角初华' || 
                            this.col_cucumbers >= 1 || 
                            (this.currentNpc.name === '八幡海玲' && this.inventoryItemTypes && this.inventoryItemTypes['巧克力奶'] && this.inventoryItemTypes['巧克力奶'].count > 0) || 
                            (this.currentNpc.name === '若叶睦' && this.inventoryItemTypes && this.inventoryItemTypes['素世的香水'] && this.inventoryItemTypes['素世的香水'].count > 0) ||
                            (this.currentNpc.name === '佑天寺若麦' && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0) ||
                            (isWhiteMoonlightFormActive && isWhiteMoonlightNpc);
                        
                        if (this.choice === 'recruit' && hasRecruitCondition && !this.currentNpc.follow && ['三角初华', '若叶睦', '八幡海玲', '佑天寺若麦'].includes(this.currentNpc.name)) {
                            // 招募NPC
                            if (this.currentNpc.name !== '三角初华' && 
                                !(this.currentNpc.name === '八幡海玲' && this.inventoryItemTypes && this.inventoryItemTypes['巧克力奶'] && this.inventoryItemTypes['巧克力奶'].count > 0) && 
                                !(this.currentNpc.name === '若叶睦' && this.inventoryItemTypes && this.inventoryItemTypes['素世的香水'] && this.inventoryItemTypes['素世的香水'].count > 0) && 
                                !(this.currentNpc.name === '佑天寺若麦' && this.inventoryItemTypes && this.inventoryItemTypes['爱音的手机'] && this.inventoryItemTypes['爱音的手机'].count > 0) &&
                                !(isWhiteMoonlightFormActive && isWhiteMoonlightNpc)) {
                                this.col_cucumbers--;
                                // 更新物品栏显示
                                this.useInventoryItem('cucumber', 1);
                            }
                            // 对于若叶睦，根据她捡的黄瓜数量计算分数和增加玩家黄瓜
                            if (this.currentNpc.name === '若叶睦') {
                                const cucumberCount = this.currentNpc.cucumberCount || 0;
                                this.score += 2 + cucumberCount;
                                // 增加玩家黄瓜数量
                                this.col_cucumbers += cucumberCount;
                                // 更新物品栏显示
                                this.addInventoryItem('cucumber', cucumberCount);
                                this.addEvent(`若叶睦：祥，我捡了${cucumberCount}根黄瓜，给你。`);
                            } else if(this.currentNpc.name === '三角初华') {
                                this.score += 1;
                            } else {
                                this.score += 2;
                            }
                            this.team.push(this.currentNpc);
                            this.currentNpc.follow = true;
                            this.total_friend++;
                            // 将招募的NPC添加到leftNpcsThisTurn数组中，避免一回合内重复触发对话框
                            if (!this.leftNpcsThisTurn.includes(this.currentNpc)) {
                                this.leftNpcsThisTurn.push(this.currentNpc);
                            }
                            console.log(`Player recruited NPC: ${this.currentNpc.name}`);
                        } else if (this.choice === 'select1' && this.currentNpc && ['高松灯', '长崎素世', '千早爱音', '要乐奈', '椎名立希'].includes(this.currentNpc.name)) {
                            // 新角色对话选择处理 - 第二阶段
                            if (this.currentNpc.dialogStage === 1) {
                                // 第二阶段选择：关闭对话框或特殊处理
                                if (this.currentNpc.name === '长崎素世') {
                                    // 长崎素世特殊处理：黄瓜+1
                                    this.col_cucumbers++;
                                    this.addInventoryItem('cucumber', 1);
                                }
                                
                                // 标记为已离开，避免一回合内重复触发
                                if (!this.leftNpcsThisTurn.includes(this.currentNpc)) {
                                    this.leftNpcsThisTurn.push(this.currentNpc);
                                }
                                
                                // 调试日志：确认在关闭前whitekeyButton元素存在
                                console.log('关闭前检查whitekeyButton元素:');
                                console.log('whitekeyButton1存在?', !!this.whitekeyButton1);
                                console.log('whitekeyButton2存在?', !!this.whitekeyButton2);
                            }
                        } else if (this.choice === 'leave' && this.currentNpc) {
                            // 当玩家选择离开时，将该NPC添加到本回合已离开的列表中
                            if (!this.leftNpcsThisTurn.includes(this.currentNpc)) {
                                this.leftNpcsThisTurn.push(this.currentNpc);
                                console.log(`Player left NPC: ${this.currentNpc.name}, won't show dialog this turn`);
                            }
                        }
                        
                        this.dialogVisible = false;
                        this.currentNpc = null;
                        this.choice = null; // 重置选择
                        this.physics.resume();
                }
                
                // 清除临时变量
                this.whitekeyButton1 = null;
                this.whitekeyButton2 = null;
                this.nextLevelButton = null;
                this.returnButton = null;
                this.settleButton = null;
                this.settleText = null;
                this["祥子笑脸"] = null;
                this.choice = null;

            }
        });

    }
