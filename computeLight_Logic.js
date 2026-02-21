    export function computeLight_Logic(levelData) {
        // 检查是否处于白月光形态，如果是则保持全场明亮
        if (this.whiteMoonlightFormActive) {
            const mapData = levelData['level' + this.level];
            const width = mapData.width;
            const height = mapData.height;
            
            // 将所有地块设置为明亮状态
            this.brightTiles = Array.from({ length: height }, () => Array(width).fill(true));
            // 清除所有阴影效果
            this.shadowGroup.clear(true, true);
            console.log('白月光形态激活，保持全场明亮');
            return;
        }
        
        const mapData = levelData['level' + this.level];
        const tiles = mapData.tiles;
        const width = mapData.width;
        const height = mapData.height;

        this.brightTiles = Array.from({ length: height }, () => Array(width).fill(false));
        this.shadowGroup.clear(true, true);
        
        // 定义可以阻挡月光的tile编号
        const lightBlockingTiles = this.lightBlockingTiles;
        // 定义可通行的tile（会被照亮或产生阴影）
        const passableTiles = this.validTiles;
        // 定义其他需要根据光照状态决定亮度的tile编号
        const otherDarkableTiles = [10, 11];

        switch (this.moonlightDirection) {
            case 'up':
                for (let x = 0; x < width; x++) {
                    let lit = true;
                    for (let y = 0; y < height; y++) {
                        // 阻挡月光的tile根据当前光照状态决定亮度
                        if (lightBlockingTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
        
                            lit = false; // 但后面的tile会被遮挡
                        }
                        // 可通行的tile根据是否被遮挡来决定亮度
                        else if (passableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                        // 其他需要根据光照状态决定亮度的tile
                        else if (otherDarkableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                    }
                }
                break;
            case 'right':
                for (let y = 0; y < height; y++) {
                    let lit = true;
                    for (let x = width - 1; x >= 0; x--) {
                        // 阻挡月光的tile根据当前光照状态决定亮度
                        if (lightBlockingTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                            lit = false; // 但后面的tile会被遮挡
                        }
                        // 可通行的tile根据是否被遮挡来决定亮度
                        else if (passableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                        // 其他需要根据光照状态决定亮度的tile
                        else if (otherDarkableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                    }
                }
                break;
            case 'down':
                for (let x = 0; x < width; x++) {
                    let lit = true;
                    for (let y = height - 1; y >= 0; y--) {
                        // 阻挡月光的tile根据当前光照状态决定亮度
                        if (lightBlockingTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                            lit = false; // 但后面的tile会被遮挡
                        }
                        // 可通行的tile根据是否被遮挡来决定亮度
                        else if (passableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                        // 其他需要根据光照状态决定亮度的tile
                        else if (otherDarkableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                    }
                }
                break;
            case 'left':
                for (let y = 0; y < height; y++) {
                    let lit = true;
                    for (let x = 0; x < width; x++) {
                        // 阻挡月光的tile根据当前光照状态决定亮度
                        if (lightBlockingTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                            lit = false; // 但后面的tile会被遮挡
                        }
                        // 可通行的tile根据是否被遮挡来决定亮度
                        else if (passableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                        // 其他需要根据光照状态决定亮度的tile
                        else if (otherDarkableTiles.includes(tiles[y][x])) {
                            this.brightTiles[y][x] = lit;
                            if (!lit) {
                                const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                                shadow.alpha = 0.5;
                                shadow.setDepth(5); // 设置深度低于角色和NPC
                                this.shadowGroup.add(shadow);
                            }
                        }
                    }
                }
                break;
        }
        
    }

    export function computeSearchLight_Logic(levelData){
        const mapData = levelData['level' + this.level];
        const tiles = mapData.tiles;
        const width = mapData.width;
        const height = mapData.height;
        const lightBlockingTiles = this.lightBlockingTiles;
        // 第三关专属探照灯效果
        if (this.level === 3) {
            // 定义六个探照灯的位置
            const downlights = [
                { x: 9, y: 9 },
                { x: 11, y: 9 },
                { x: 13, y: 9 },
                { x: 16, y: 9 },
                { x: 18, y: 9 },
                { x: 20, y: 9 }
            ];
            
            // 获取当前回合数
            const currentRound = this.turn;
            // 计算当前周期位置（每20回合为一个循环）
            const cyclePosition = currentRound % 20;
            // 根据周期位置确定应该亮的探照灯
            let activeSpotlightY;
            
            if (cyclePosition >= 1 && cyclePosition <= 5) {
                activeSpotlightY = 12; // 1-5回合：(12,26)亮
            } else if (cyclePosition >= 6 && cyclePosition <= 10) {
                activeSpotlightY = 16; // 6-10回合：(16,26)亮
            } else if (cyclePosition >= 11 && cyclePosition <= 15) {
                activeSpotlightY = 20; // 11-15回合：(20,26)亮
            } else {
                activeSpotlightY = 24; // 16-20回合：(24,26)亮
            }
            
            // 新增的四个向左照射的探照灯位置数组
            const leftlights = [
                { x: 26, y: 12 },
                { x: 26, y: 16 },
                { x: 26, y: 20 },
                { x: 26, y: 24 }
            ];
            
            // 新增的四个向右照射的探照灯位置数组
            const rightlights = [
                { x: 3, y: 14 },
                { x: 3, y: 18 },
                { x: 3, y: 22 },
                { x: 3, y: 26 }
            ];
            
            // 根据周期位置确定应该亮的向右照射探照灯
            let activeSpotlightRightY;            
            if (cyclePosition >= 1 && cyclePosition <= 5) {
                activeSpotlightRightY = 14; // 1-5回合：(3,14)亮
            } else if (cyclePosition >= 6 && cyclePosition <= 10) {
                activeSpotlightRightY = 18; // 6-10回合：(3,18)亮
            } else if (cyclePosition >= 11 && cyclePosition <= 15) {
                activeSpotlightRightY = 22; // 11-15回合：(3,22)亮
            } else {
                activeSpotlightRightY = 26; // 16-20回合：(3,26)亮
            }
            
            // 对每个探照灯，向下照射，宽度为1格
            downlights.forEach(searchlight => {
                const { x, y } = searchlight;
                let canIlluminate = true;
                // 探照灯本身是亮的
                this.brightTiles[y][x] = true;
                // 从探照灯下方的格子开始向下遍历，跳过探照灯自身所在的阻挡tile
                for (let currentY = y + 1; currentY < height; currentY++) {
                    // 检查当前格子是否在地图范围内
                    if (x >= 0 && x < width && currentY >= 0 && currentY < height) {
                        // 如果可以照射，设置当前格子为明亮
                        if (canIlluminate) {
                            this.brightTiles[currentY][x] = true;
                            
                            // 检查当前格子是否阻挡光线
                            if (lightBlockingTiles.includes(tiles[currentY][x])) {
                                canIlluminate = false;
                                break;
                            }
                        }
                    }
                }
            });
            
            // 对每个新探照灯，向左照射，宽度为1格，并且根据回合数控制开关
            leftlights.forEach(spotlight => {
                const { x, y } = spotlight;
                
                // 只有当前回合应该亮的探照灯才会照射
                if (y !== activeSpotlightY) return;
                // 探照灯本身是亮的
                this.brightTiles[y][x] = true;

                let canIlluminate = true;
                
                // 从x-1开始，向左照射
                for (let currentX = x - 1; currentX >= 0; currentX--) {
                    // 检查当前位置是否在地图范围内
                    if (currentX < 0 || currentX >= mapData.width) break;
                    
                    // 检查是否被阻挡
                    if (this.lightBlockingTiles.includes(mapData.tiles[y][currentX])) {
                        // 标记该位置为照亮，然后停止照射
                        if (!this.brightTiles[y]) {
                            this.brightTiles[y] = [];
                        }
                        this.brightTiles[y][currentX] = true;
                        canIlluminate = false;
                        break;
                    }
                    
                    // 如果没有被阻挡，标记为照亮
                    if (canIlluminate) {
                        if (!this.brightTiles[y]) {
                            this.brightTiles[y] = [];
                        }
                        this.brightTiles[y][currentX] = true;
                    }
                }
            });
            
            // 对每个向右照射的探照灯，向右照射，宽度为1格，并且根据回合数控制开关
            rightlights.forEach(spotlight => {
                const { x, y } = spotlight;
                
                // 只有当前回合应该亮的探照灯才会照射
                if (y !== activeSpotlightRightY) return;
                // 探照灯本身是亮的
                this.brightTiles[y][x] = true;

                let canIlluminate = true;
                
                // 从x+1开始，向右照射
                for (let currentX = x + 1; currentX < width; currentX++) {
                    // 检查当前位置是否在地图范围内
                    if (currentX < 0 || currentX >= mapData.width) break;
                    
                    // 检查是否被阻挡
                    if (this.lightBlockingTiles.includes(mapData.tiles[y][currentX])) {
                        // 标记该位置为照亮，然后停止照射
                        if (!this.brightTiles[y]) {
                            this.brightTiles[y] = [];
                        }
                        this.brightTiles[y][currentX] = true;
                        canIlluminate = false;
                        break;
                    }
                    
                    // 如果没有被阻挡，标记为照亮
                    if (canIlluminate) {
                        if (!this.brightTiles[y]) {
                            this.brightTiles[y] = [];
                        }
                        this.brightTiles[y][currentX] = true;
                    }
                }
            });
            
            // 重新计算阴影，移除探照灯照亮区域的阴影
            this.shadowGroup.clear(true, true);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // 如果格子是黑暗的，添加阴影
                    if (!this.brightTiles[y][x]) {
                        const shadow = this.add.sprite(x * this.tile_Width + this.tile_Width / 2, y * this.tile_Height + this.tile_Height / 2, 'dark');
                        shadow.alpha = 0.5;
                        shadow.setDepth(5); // 设置深度低于角色和NPC
                        this.shadowGroup.add(shadow);
                    }
                }
            }
        }
    }