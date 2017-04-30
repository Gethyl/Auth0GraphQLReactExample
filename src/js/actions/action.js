import axios from "axios"

export const initialData = (res) => ({
	type: "INITIAL_LIST",
	news: res,
	loading:false
})

export const setProfileInStore = (res) => ({
	type: "SET_PROFILE",
	profile: res
})

export const clearProfile = () => ({
	type: "CLEAR_PROFILE",
	profile: {}
})

export const notifyUser = (res) => ({
	type: "NOTIFY_USER",
	notifyMessage: res
})
/***************************************************************************************** */
/* 																						   */
/***************************************************************************************** */
export const loadInitialData = () => {

	return (dispatch) =>{
		var myHeaders = new Headers();

		var myInit = {
			   method: 'GET',
               headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
			   },
               mode: 'no-cors',
               cache: 'default' 
			};

		axios.get("http://localhost:3000/graphql?query={news{status,source,articles{title,description,urlToImage}}}")
		//    .then(res=>
		//    		res.json()
		//    )
		   .then(json => {
			   console.log(json.data.data.news)
			   dispatch(initialData(json.data.data.news.articles))
			//    return json
		   })
	}
	
	
}

