
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

		var draw = function () {
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

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},

			draw: draw
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 120,
				y: 120,
				width: 40,
				height: 40
			},

			draw: draw
		};

		hero.draw();
		monster.draw();

		document.onkeydown = function(e){
			var moveX = 0, moveY = 0;
			switch(e.keyCode){
				case 38:   //上
					moveY = -hero.rect.height;
					break;
				case 40:   //下
					moveY = hero.rect.height;
					break;
				case 37:   //左
					moveX = -hero.rect.width;
					break;
				case 39:   //右
					moveX = hero.rect.width;
					break;
				default:
					return;
			}
			var newX = hero.rect.x + moveX;
			var newY = hero.rect.y + moveY;
			if(newX==monster.rect.x && newY==monster.rect.y){
				console.log('碰到野怪了');
			}else if(newX<0 || newX>(500-hero.rect.width) || newY<0 || newY>(300-hero.rect.height)){
				console.log('到达画布边缘了');
			}else{
				context.clearRect(hero.rect.x,hero.rect.y,hero.rect.width,hero.rect.height);
				hero.rect.x = newX;
				hero.rect.y = newY;
				hero.draw();
			}
		}
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
})();