var updateBtns = document.getElementsByClassName('update-cart')//جميع الازرار التي تحمل (update-cart)

for (i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', function(){
		var productId = this.dataset.product
		var action = this.dataset.action
		console.log('productId:', productId, 'Action:', action)
		console.log('USER:', user)

		if (user == 'AnonymousUser'){
			addCookieItem(productId, action)//حالة تسجيل الدخول 
		}else{
			updateUserOrder(productId, action)//حالة عدم تسجيل الدخول 
		}
	})
}

function updateUserOrder(productId, action){//في حالة تسجيل الدخول 
	console.log('User is authenticated, sending data...')

		var url = '/update_item/'

		fetch(url, {
			method:'POST',
			headers:{
				'Content-Type':'application/json',
				'X-CSRFToken':csrftoken,
			}, 
			body:JSON.stringify({'productId':productId, 'action':action})
		})
		.then((response) => {
		   return response.json();
		})
		.then((data) => {
		    location.reload()
		});
}

function addCookieItem(productId, action){  //في حالة عدم تسجيل الدخول
	console.log('User is not authenticated')

	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity':1}//اذا كان غير موجود اضفه

		}else{
			cart[productId]['quantity'] += 1//اذا كان موجود اضف 1 
		}
	}

	if (action == 'remove'){
		cart[productId]['quantity'] -= 1//قلل واحد

		if (cart[productId]['quantity'] <= 0){//اذاكان اقل من الصفر احذفة
			console.log('Item should be deleted')
			delete cart[productId];
		}
	}
	console.log('CART:', cart)
	document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
	
	location.reload()
}