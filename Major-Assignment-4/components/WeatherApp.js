const handleSubmit = (event) => {
    event.preventDefault();
    // Update search term state with the entered city name
    const city = event.target.elements.city.value.trim();
    setSearchTerm(city);
};

useEffect(() => {
    const API_KEY = '7d9b4b63d5d81eec58bcb613f4401d4c';
    const API_Page = `https://api.openweathermap.org`
    const API_URL = `${API_Page}/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}`;

    const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    };
    if (searchTerm) {
    fetchData();
    }
}, [searchTerm]);