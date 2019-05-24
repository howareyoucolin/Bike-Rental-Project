import axios from 'axios';
import {updateStore, getStoreData} from './store';
import {renderForm} from './form';
import {renderCart} from './cart';


const SITE_URL = 'http://167.99.230.240/';


//Fetch data from server
axios.get(SITE_URL+'data/bikerentals.json').then((response) => {
	
	let products = response.data.products;
	
	//Store products from json into Store
	updateStore('products', products, () => {

		//Render components
		renderForm();
		renderCart();
		
		//Remove loading spinner and display app
		document.getElementById('loading').remove();
		document.getElementById('app').style.display = 'block';

	});
	
});

