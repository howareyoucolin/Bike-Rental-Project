import {updateStore, getStoreData} from './store';
import {renderCart} from './cart';
import './scss/form.scss';


//Init form value to Store 
updateStore(
	'formData', {
		biketype: -1,
		accessory:-1,
		insurance:-1,
	}
);


export function renderForm(id='form'){
	
	let Store = getStoreData();
	
	const {formData} = Store;
	
	//Set options for different selects
	let biketype_options = '';
	let accessory_options = '';
	let insurance_options = '';
	
	Store.products.map(item => {
		switch(item.product_type){
			case 'bike':
				let selected1 = (item.id == formData.biketype)?'selected':'';
				biketype_options += `<option value="${item.id}" ${selected1}>${item.name}($${item.price})</option>`;
				break;
			case 'accessory':
				let selected2 = (item.id == formData.accessory)?'selected':'';
				accessory_options += `<option value="${item.id}" ${selected2}>${item.name}($${item.price})</option>`;
				break;
			case 'addon':
				let selected3 = (item.id == formData.insurance)?'selected':'';
				insurance_options += `<option value="${item.id}" ${selected3}>${item.name}($${item.price})</option>`;
				selected3 = (0 == formData.insurance)?'selected':'';
				insurance_options += `<option value="0" ${selected3}>No insurance</option>`;
				break;
		}
	});
	
	const disabled = (formData.biketype == -1 || formData.accessory == -1 || formData.insurance == -1)?'disabled':'';
	
	//Render form
	const view = `
		<div class="form-wrap">
			<label>Bike Type</label>
			<select id="select-biketype" class="form-select">
				<option value="-1">Please select</option>
				${biketype_options}
			</select>
			<label>accessory</label>
			<select id="select-accessory" class="form-select">
				<option value="-1">Please select</option>
				${accessory_options}
			</select>
			<label>Insurance</label>
			<select id="select-insurance" class="form-select">
				<option value="-1">Please select</option>
				${insurance_options}
			</select>
			<button class="btn btn-primary form-submit" ${disabled} >Submit</button>
		</div>
	`;
	
	document.getElementById(id).innerHTML = view;
	
}


//Document listen to onchange event for <select>s
const onchangeHandler = (ev) => {
	
	if(ev.target.classList.contains('form-select')){
		updateStore(
			'formData', {
				biketype:  document.getElementById('select-biketype').value,
				accessory: document.getElementById('select-accessory').value,
				insurance: document.getElementById('select-insurance').value,
			},
			//Callback
			() => {
				renderForm();
				renderCart();
			}
		);
	}
	
}
document.getElementById('form').addEventListener('change', onchangeHandler);


//Document listen to click event for submit button
const onclickHandler = (ev) => {

	if(ev.target.classList.contains('form-submit')){
		
		//Remove the event handler from the document
		document.getElementById('form').removeEventListener('change', onchangeHandler);
		document.getElementById('form').removeEventListener('click', onclickHandler);
		
		//Remove app and display thank you page
		document.getElementById('app').remove();
		document.getElementById('thank-you').innerHTML = '<h1>Thank you very much!</h1>';
		renderCart('receipt');
		
	}

}
document.getElementById('form').addEventListener('click', onclickHandler);


