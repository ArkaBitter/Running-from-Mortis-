
    export function initializeCarCanvas_Logic() {
        console.log('Initializing car canvas for level:', this.level);
        if (this.level !== 1) return;

        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) {
            console.warn('Game container not found');
            return;
        }
        // Ensure container positioned so absolute canvas is relative to it
        const containerStyle = getComputedStyle(gameContainer).position;
        if (containerStyle === 'static') {
            gameContainer.style.position = 'relative';
        }

        // 创建canvas并插入
        this.carCanvas = document.createElement('canvas');
        
        // 获取游戏实际渲染区域的尺寸和位置信息
        const gameCanvas = this.game.canvas;
        if (gameCanvas) {
            // 设置canvas尺寸为游戏canvas的实际尺寸
            const rect = gameCanvas.getBoundingClientRect();
            this.carCanvas.width = rect.width;
            this.carCanvas.height = rect.height;
            
            // 计算缩放比例
            this.canvasScaleX = rect.width / this.game.config.width;
            this.canvasScaleY = rect.height / this.game.config.height;
            
            // 设置canvas位置和样式
            this.carCanvas.style.position = 'absolute';
            this.carCanvas.style.left = gameCanvas.offsetLeft + 'px';
            this.carCanvas.style.top = gameCanvas.offsetTop + 'px';
            this.carCanvas.style.width = rect.width + 'px';
            this.carCanvas.style.height = rect.height + 'px';
            
            console.log('Canvas scale factors:', this.canvasScaleX, this.canvasScaleY);
            console.log('Canvas dimensions:', rect.width, rect.height);
        } else {
            // 降级方案：使用原始游戏尺寸
            this.carCanvas.width = this.game.config.width;
            this.carCanvas.height = this.game.config.height;
            this.canvasScaleX = 1;
            this.canvasScaleY = 1;
            this.carCanvas.style.position = 'absolute';
            this.carCanvas.style.left = '0px';
            this.carCanvas.style.top = '0px';
        }
        
        this.carCanvas.style.zIndex = '20';
        this.carCanvas.style.pointerEvents = 'none';


        this.carCtx = this.carCanvas.getContext('2d', { willReadFrequently: true });

        gameContainer.appendChild(this.carCanvas);



        console.log('Car canvas initialized:', this.carCanvas);
    }

    // ---------- 预加载工具函数 ----------
    export function _preloadImage_Logic(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = src;
        });
    }

    // ---------- 启动车辆动画（使用requestAnimationFrame timestamp） ----------
    export async function startCarAnimation_Logic(direction) {
        this.carAnimationActive = false;
        console.log('Starting car animation, direction:', direction);
        if (!this.carCanvas || !this.carCtx || this.carAnimationActive) {
            console.log('Car animation cannot start, conditions not met');
            return;
        }

        this.carAnimationActive = true;
        this.turnInProgress = true; // 锁定玩家输入

        const carWidth = 128;
        const carHeight = 64;
        const wheelRadius = 16;
        const speed = 480; // px / s
        const wheelRevsPerSec = 5; // 圈/秒

        // 计算起始 carX, carY（按你的描述调整）
        // 注意：你在描述里有 tileY=13 / 14，根据方向不同选择
        // 现在使用地图坐标，并通过缩放比例转换到canvas坐标
        let mapCarX, mapCarY;
        if (direction === 'right') {
            // “向左”图像但从左边出发向右移动（按你描述的特殊命名）
            // 使用地图坐标作为基准
            mapCarX = -carWidth / 2 - (this.tile_Width || 0); // 从左侧外一点开始（tileX < -1）
            mapCarY = 15 * this.tile_Height + this.tile_Height / 2;
        } else {
            // 从右侧外一点开始
            mapCarX = this.game.config.width + carWidth / 2 + (this.tile_Width || 0); // tileX > 30
            mapCarY = 14 * this.tile_Height + this.tile_Height / 2;
        }
        
        // 计算游戏画布的偏移量（用于居中显示）
        const gameCanvas = this.game.canvas;
        const rect = gameCanvas.getBoundingClientRect();
        const offsetX = (rect.width - this.game.config.width * this.canvasScaleX) / 2;
        const offsetY = (rect.height - this.game.config.height * this.canvasScaleY) / 2;
        
        // 创建一个函数来转换地图坐标到canvas坐标
        const mapToCanvasCoords = (mapX, mapY) => {
            const result = {
                x: mapX * this.canvasScaleX + offsetX,
                y: mapY * this.canvasScaleY + offsetY
            };
            console.log(`地图坐标(${mapX},${mapY}) 转换为 Canvas坐标(${result.x.toFixed(2)},${result.y.toFixed(2)})`);
            return result;
        };
        
        console.log('坐标转换调试 - 开始');
        console.log('游戏配置尺寸:', this.game.config.width, this.game.config.height);
        console.log('缩放比例:', this.canvasScaleX, this.canvasScaleY);
        console.log('偏移量:', offsetX, offsetY);
        console.log('地图坐标:', mapCarX, mapCarY);
        
        // 应用坐标转换到车辆位置
        const canvasCoords = mapToCanvasCoords(mapCarX, mapCarY);
        let carX = canvasCoords.x;
        let carY = canvasCoords.y - carHeight / 2; // 调整Y坐标使车辆居中在道路上
        console.log('车辆最终Canvas坐标:', carX.toFixed(2), carY.toFixed(2));
        console.log('坐标转换调试 - 结束');

        // 预加载图像（从纹理系统取不到完整加载的元素时，用这里）
        // 你可以改用 this.textures.get(...) 的 image，如果你确定它已加载并可用也可以直接使用
        let carImg, wheelImg;
        try {
            // 如果你已经有在 this.textures 中的 image，可以直接用：
            const key = direction === 'right' ? '无轮小轿车向右' : '无轮小轿车向左';
            const tex = this.textures && this.textures.get ? this.textures.get(key) : null;
            if (tex && tex.getSourceImage && tex.getSourceImage().complete && tex.getSourceImage().naturalWidth > 0) {
                carImg = tex.getSourceImage();
            } else {
                // 替换下面 URL 为你实际的图片路径或 base64
                if (key === '无轮小轿车向右'){carImg = await this._preloadImage('./assets/关卡1/标准化/无轮小轿车向右.png').catch(e => null);}
                else{carImg = await this._preloadImage('./assets/关卡1/标准化/无轮小轿车向左.png').catch(e => null);}
            }

            const texWheel = this.textures && this.textures.get ? this.textures.get('车轮子') : null;
            if (texWheel && texWheel.getSourceImage && texWheel.getSourceImage().complete && texWheel.getSourceImage().naturalWidth > 0) {
                wheelImg = texWheel.getSourceImage();
            } else {
                wheelImg = await this._preloadImage('./assets/关卡1/标准化/车轮子.png').catch(e => null);
            }
        } catch (e) {
            console.warn('Image preload failed, will use fallback shapes', e);
        }

        console.log('carImg ready:', !!carImg, 'wheelImg ready:', !!wheelImg);
        // 初始时间由 rAF 提供
        let lastTimestamp = null;
        let wheelRotation = 0;


        const animate = (timestamp) => {
            if (!this.carAnimationActive || !this.carCtx) return;

            if (!lastTimestamp) lastTimestamp = timestamp;
            const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.05); // 限制 delta 防止跳帧太大
            lastTimestamp = timestamp;

            // 更新位置与旋转（注意方向与旋转符号）
            if (direction === 'right') {
                carX += speed * deltaTime; // 向右移动（按你描述的方向命名）
                // 你要求：向左时逆时针转，向右时顺时针转 —— 这里"direction==='right'"表示使用'向右'图片但实际向右移动
                // canvas 中正角度是顺时针（y向下），因此根据视觉需求调整符号
                wheelRotation -= wheelRevsPerSec * 2 * Math.PI * deltaTime; // 逆时针
            } else {
                carX -= speed * deltaTime; // 向左移动
                wheelRotation += wheelRevsPerSec * 2 * Math.PI * deltaTime; // 顺时针
            }

            // 清空画布
            this.carCtx.clearRect(0, 0, this.carCanvas.width, this.carCanvas.height);

            // 画路面（可选）
            // 直接使用地图瓦片Y坐标计算路面位置
            const roadTileY = direction === 'right' ? 14 : 13;
            const roadCanvasPos = mapToCanvasCoords(0, roadTileY);
            const roadY = roadCanvasPos.y - 32; // 调整路面位置使其与道路对齐
            const roadHeight = 64 * this.canvasScaleY;
            this.carCtx.fillStyle = "#444";
            this.carCtx.fillRect(0, roadY, this.carCanvas.width, roadHeight);

            // 调试：打印位置
            console.log('车辆当前Canvas坐标:', carX.toFixed(2), carY.toFixed(2));

            // 碰撞检测和角色平移逻辑
            // 将汽车的canvas坐标转换回游戏中的地图坐标（tileX, tileY）
            const gameCarX = carX / this.canvasScaleX;
            const gameCarY = (carY + carHeight / 2) / this.canvasScaleY; // 调整为车辆底部的Y坐标
            const carTileX = Math.floor(gameCarX / this.tile_Width);
            const carTileY = direction === 'right' ? 14 : 13; // 根据方向确定车辆所在的tileY
            
            console.log(`车辆地图坐标: (${carTileX}, ${carTileY})`);
            
            // 检测玩家碰撞
            const playerTileX = Math.floor(this.player.x / this.tile_Width);
            const playerTileY = Math.floor(this.player.y / this.tile_Height);
            if (playerTileX === carTileX && playerTileY === carTileY && this.player.collided === 0) {
                console.log('玩家与车辆碰撞！');
                // 根据汽车方向平移玩家，使用tween实现平移动画
                const translateX = direction === 'right' ? 3 * this.tile_Width : -3 * this.tile_Width;
                const targetX = Math.max(0, Math.min(29 * this.tile_Width, this.player.x + translateX));
                let beginX = this.player.x;
                
                // 保存collided状态，避免重复触发
                this.player.collided = 1;
                this.addEvent('祥子被车辆撞飞了三格！');
                
                // 创建平移动画，添加垂直弹跳效果
                const originalY = this.player.y;
                
                // 第一阶段：快速向前移动并轻微向上
                this.tweens.add({
                    targets: this.player,
                    x: (targetX + beginX) / 2,
                    y: originalY - 50,
                    duration: 150,
                    ease: 'Power2.In', // 开始时有冲击力
                    onStart: () => {
                        console.log('玩家平移动画开始');
                        // 添加视觉反馈：透明度变化
                        this.player.alpha = 0.6;
                    },
                    onComplete: () => {
                        // 第二阶段：向下恢复
                        this.tweens.add({
                            targets: this.player,
                            x: targetX,
                            y: originalY,
                            duration: 150,
                            ease: 'Power2.Out', // 结束时平滑停止
                            onComplete: () => {
                                console.log('玩家平移动画完成');
                                // 恢复透明度
                                this.player.alpha = 1.0;
                            }
                        })
                    }
                });
            }
            
            // 检测ghost碰撞
            const ghostTileX = Math.floor(this.ghost.x / this.tile_Width);
            const ghostTileY = Math.floor(this.ghost.y / this.tile_Height);
            if (ghostTileX === carTileX && ghostTileY === carTileY && this.ghost.collided === 0) {
                console.log('莫提丝与车辆碰撞！');
                // 根据汽车方向平移ghost，使用tween实现平移动画
                const translateX = direction === 'right' ? 3 * this.tile_Width : -3 * this.tile_Width;
                const targetX = Math.max(0, Math.min(29 * this.tile_Width, this.ghost.x + translateX));
                let beginX = this.ghost.x;
                
                // 保存collided状态，避免重复触发
                this.ghost.collided = 1;
                this.addEvent('莫提丝被车辆撞飞了三格！');
                
                // 创建平移动画，添加垂直弹跳效果
                const originalY = this.ghost.y;
                
                // 第一阶段：快速向前移动并轻微向上
                this.tweens.add({
                    targets: this.ghost,
                    x: (targetX + beginX) / 2,
                    y: originalY - 50,
                    duration: 150,
                    ease: 'Power2.In', // 开始时有冲击力
                    onStart: () => {
                        console.log('莫提丝平移动画开始');
                        // 添加视觉反馈：透明度变化
                        this.ghost.alpha = 0.6;
                    },
                    onComplete: () => {
                        // 第二阶段：向下恢复
                        this.tweens.add({
                            targets: this.ghost,
                            x: targetX,
                            y: originalY,
                            duration: 150,
                            ease: 'Power2.Out', // 结束时平滑停止
                            onComplete: () => {
                                console.log('莫提丝平移动画完成');
                                // 恢复透明度
                                this.ghost.alpha = 1.0;
                            }
                        });
                    }
                });
            }
            
            // 检测所有NPC碰撞
            this.npcs.getChildren().forEach(npc => {
                if (npc.active) {
                    const npcTileX = Math.floor(npc.x / this.tile_Width);
                    const npcTileY = Math.floor(npc.y / this.tile_Height);
                    if (npcTileX === carTileX && npcTileY === carTileY && npc.collided === 0) {
                        console.log(`${npc.name}与车辆碰撞！`);
                        // 根据汽车方向平移NPC，使用tween实现平移动画
                        const translateX = direction === 'right' ? 3 * this.tile_Width : -3 * this.tile_Width;
                        const targetX = Math.max(0, Math.min(29 * this.tile_Width, npc.x + translateX));
                        let beginX = npc.x;
                        
                        // 保存collided状态，避免重复触发
                        npc.collided = 1;
                        this.addEvent(`${npc.name}被车辆撞飞了三格！`);
                        
                        // 创建平移动画，添加垂直弹跳效果
                        const originalY = npc.y;
                        
                        // 第一阶段：快速向前移动并轻微向上
                        this.tweens.add({
                            targets: npc,
                            x: (targetX + beginX) / 2,
                            y: originalY - 50,
                            duration: 150,
                            ease: 'Power2.In', // 开始时有冲击力
                            onStart: () => {
                                console.log(`${npc.name}平移动画开始`);
                                // 添加视觉反馈：透明度变化
                                if (npc.alpha !== undefined) {
                                    npc.alpha = 0.6;
                                }
                            },
                            onComplete: () => {
                                // 第二阶段：向下恢复
                                this.tweens.add({
                                    targets: npc,
                                    x: targetX,
                                    y: originalY,
                                    duration: 150,
                                    ease: 'Power2.Out', // 结束时平滑停止
                                    onComplete: () => {
                                        console.log(`${npc.name}平移动画完成`);
                                        // 恢复透明度
                                        if (npc.alpha !== undefined) {
                                            npc.alpha = 1.0;
                                        }
                                    }
                                });
                            }
                        })
                    }
                }
            });

            // carX和carY已经是canvas坐标，不需要再次转换
            const scaledCarWidth = carWidth * this.canvasScaleX;
            const scaledCarHeight = carHeight * this.canvasScaleY;
            const scaledWheelRadius = wheelRadius * this.canvasScaleX;

            // 绘制车身或占位
            if (carImg) {
                this.carCtx.drawImage(carImg, carX - scaledCarWidth / 2, carY - scaledCarHeight / 2, scaledCarWidth, scaledCarHeight);
            } else {
                this.carCtx.fillStyle = 'red';
                this.carCtx.fillRect(carX - scaledCarWidth / 2, carY - scaledCarHeight / 2, scaledCarWidth, scaledCarHeight);
                this.carCtx.fillStyle = 'white';
                this.carCtx.font = (12 * this.canvasScaleX) + 'px Arial';
                this.carCtx.fillText('Car', carX - 10 * this.canvasScaleX, carY);
            }

            // 绘制车轮 - 修正车轮位置计算
            const wheelXOffset1 = direction === 'left' ? 45 : 59;
            const wheelXOffset2 = direction === 'left' ? -38 : -34;
            const wheelYOffset = 21.5;
            
            // 车轮位置相对于车身中心的偏移
            const wheel1X = carX + wheelXOffset1 * this.canvasScaleX;
            const wheel1Y = carY + wheelYOffset * this.canvasScaleY;
            const wheel2X = carX + wheelXOffset2 * this.canvasScaleX;
            const wheel2Y = carY + wheelYOffset * this.canvasScaleY;
            
            const wheelPositions = [{x: wheel1X, y: wheel1Y}, {x: wheel2X, y: wheel2Y}];
            
            wheelPositions.forEach(pos => {
                if (wheelImg) {
                    this.carCtx.save();
                    this.carCtx.translate(pos.x, pos.y);
                    this.carCtx.rotate(wheelRotation);
                    this.carCtx.drawImage(wheelImg, -scaledWheelRadius, -scaledWheelRadius, scaledWheelRadius * 2, scaledWheelRadius * 2);
                    this.carCtx.restore();
                } else {
                    this.carCtx.beginPath();
                    this.carCtx.arc(pos.x, pos.y, scaledWheelRadius, 0, Math.PI * 2);
                    this.carCtx.fillStyle = 'blue';
                    this.carCtx.fill();
                }
            });

            // 结束条件（车完全离开另一侧）
            if ((direction === 'right' && gameCarX - carWidth/2 > this.game.config.width + 10) ||
                (direction === 'left' && gameCarX + carWidth/2 < -10)) {
                // 完成
                console.log('Car animation completed');
                this.carAnimationActive = false;

                // 清除画布并移除 debug 边框
                if (this.carCtx) this.carCtx.clearRect(0, 0, this.carCanvas.width, this.carCanvas.height);

                return;
            }

            // 继续下一帧
            requestAnimationFrame(animate);
        };

        // 从 rAF 启动，确保 timestamp 可用
        requestAnimationFrame(animate);
    }

    // 清理车辆动画资源
    export function cleanupCarAnimation_Logic() {
        // 停止动画
        if (this.carAnimationId) {
            cancelAnimationFrame(this.carAnimationId);
            this.carAnimationId = null;
        }
        
        // 移除Canvas元素
        const container = document.getElementById('car-animation-container');
        if (container) {
            document.body.removeChild(container);
        }
        
        // 重置相关属性
        this.carCanvas = null;
        this.carContext = null;
        this.carAnimationInProgress = false;
        this.keyboardLocked = false;
        
        console.log('车辆动画资源已清理');

    }

