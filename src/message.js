
export default async function getPost(country){
	try {
		var url = 'https://newsapi.org/v2/top-headlines?' +
			  `country=${country}&` +
			  'apiKey=1ad36b795ee64edfa26331c9a4e0b302';
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
      throw new Error(`Unable to get news`);
    }
}