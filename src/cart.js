import {updateStore, getStoreData} from './store';
import './scss/cart.scss';


export function renderCart(id='cart'){
	
	let Store = getStoreData();

	const {formData, products} = Store;
	
	//Cart total
	let total = 0;
	
	//Contruct row 1
	let row1 = '';
	if(formData.biketype == -1){
		row1 = '<div class="unit unit-error">Please select a bike type!</div>';
	}
	else{
		let data = {};
		products.map(item => {
			if(formData.biketype == item.id){
				data = item;	
			}
		});
		row1 = `
			<div class="unit">
				<img src="${data.image}" /> 
				<p>Name: ${data.name}</p>
				<p>Price: $${data.price}</p>
				<div class="clr"></div>
			</div>
		`;
		total += parseFloat(data.price);
	}
	
	//Contruct row 2
	let row2 = '';
	if(formData.accessory == -1){
		row2 = '<div class="unit unit-error">Please select a accessory!</div>';
	}
	else{
		let data = {};
		products.map(item => {
			if(formData.accessory == item.id){
				data = item;	
			}
		});
		row2 = `
			<div class="unit">
				<img src="${data.image}" /> 
				<p>Name: ${data.name}</p>
				<p>Price: $${data.price}</p>
				<div class="clr"></div>
			</div>
		`;
		total += parseFloat(data.price);
	}
	
	//Contruct row 3
	let row3 = '';
	if(formData.insurance == -1){
		row3 = '<div class="unit unit-error">Please select a insurance or no insurance!</div>';
	}
	else if(formData.insurance == 0){
		row3 = `
			<div class="unit">
				No insurance.
			</div>
		`;
	}
	else{
		let data = {};
		products.map(item => {
			if(formData.insurance == item.id){
				data = item;	
			}
		});
		row3 = `
			<div class="unit">
				<img src="${data.image}" /> 
				<p>Name: ${data.name}</p>
				<p>Price: $${data.price}</p>
				<div class="clr"></div>
			</div>
		`;
		total += parseFloat(data.price);
	}
	
	//Format total
	total = total.toFixed(2);
	
	//Render cart
	const view = `
		<div class="cartWrap">
			${row1}
			${row2}
			${row3}
			<div class="total">Total: $${total}</div>
		</div>
	`;
	
	document.getElementById(id).innerHTML = view;
	
}