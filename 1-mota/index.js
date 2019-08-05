
(function () {
	// 我是汪洋老师
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}


	// 我是袁鑫老师
	function drawHero(context, heroImg, allSpriteImg) {

		function Hero(imgPos, rect){
			this.img = heroImg;
			this.context = context;
			this.imgPos = {
				x: imgPos.x,
				y: imgPos.y,
				width: 32,
				height: 32
			};
			this.rect = {
				x: rect.x,
				y: rect.y,
				width: 40,
				height: 40
			};
		}
		Hero.prototype.draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}

		function Monster(imgPos,rect){
			Hero.call(this,imgPos,rect)
			this.img = allSpriteImg;
		}
		Monster.prototype = Object.create(Hero.prototype);

		var hero = new Hero({x: 0, y: 0}, {x: 0, y: 0});
		hero.draw();
		var monsters = [new Monster({x: 858, y: 529}, {x: 120, y: 120}), new Monster({x: 858, y: 462}, {x: 80, y: 0})];
		monsters.forEach(item => {
			item.draw();
		});

		document.onkeydown = function(e){
			var moveX = 0, moveY = 0;
			var imgPosX, imgPosY;
			switch(e.keyCode){
				case 38:   //上
					moveY = -hero.rect.height;
					imgPosX = 0;
					imgPosY = 96;
					break;
				case 40:   //下
					moveY = hero.rect.height;
					imgPosX = 0;
					imgPosY = 0;
					break;
				case 37:   //左
					moveX = -hero.rect.width;
					imgPosX = 0;
					imgPosY = 32;
					break;
				case 39:   //右
					moveX = hero.rect.width;
					imgPosX = 0;
					imgPosY = 64;
					break;
				default:
					return;
			}
			heroMove(moveX, moveY, imgPosX, imgPosY);
		}
		function heroMove(moveX, moveY, imgPosX, imgPosY){
			var newX = hero.rect.x + moveX;
			var newY = hero.rect.y + moveY;
			var meetMonster = false;
			monsters.forEach(item => {
				if(newX==item.rect.x && newY==item.rect.y){
					meetMonster = true;
					console.log('碰到野怪了');
					return;
				}
			});
			if(meetMonster) return;
			if(newX<0 || newX>(500-hero.rect.width) || newY<0 || newY>(300-hero.rect.height)){
				console.log('到达画布边缘了');
				return;
			}

			context.clearRect(hero.rect.x,hero.rect.y,hero.rect.width,hero.rect.height);
			hero.rect.x = newX;
			hero.rect.y = newY;
			hero.imgPos.x = imgPosX;
			hero.imgPos.y = imgPosY;
			hero.draw();
		}
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
})();