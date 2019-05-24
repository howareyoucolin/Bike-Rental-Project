//Init an empty object to store data for the whole app
let Store = {};

/**
* Handles Store update in a immutable way and provide a callback function once it's updated
* @param String name of the key,
* @param Oject object data to be saved to the key,
* @return callback function / void
*/
export function updateStore(key,value,callback){
	//Immutable data
	Store = {
		...Store,
		[key]: value,
	}
	//Serve as a subscribe function in Redux
	if(typeof callback === "function"){
		callback(Store);
		return;
	}
	return;
}

/**
* Provide the most updated Store data
* @return Store object
*/
export function getStoreData(){
	return Store;
}