async function addReview(event){
    event.preventDefault();
    const companyDetails = {
        name: event.target.name.value,
        pros: event.target.pros.value,
        cons: event.target.cons.value,
        rating: event.target.rating.value,
    };
    console.log(companyDetails);
    try {
        const response = await axios.post('http://localhost:4000/addReview', companyDetails);
        
        alert('Review Added Successfully');
    } catch (error) {
        console.log(error);
    }
};

async function search(event) {
    event.preventDefault();
    // Get company name from form or URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const companyName = event.target ? event.target.search.value : decodeURIComponent(urlParams.get('search'));

    if (!companyName) {
        console.log('No company name provided');
        return;
    }

    const companyReview = document.getElementById('review');
    companyReview.innerHTML = ""; // Clear previous results
    
    console.log('Searching for:', companyName);
    try {
        let response = await axios.get(`http://localhost:4000/getReviews/${encodeURIComponent(companyName)}`);
        console.log('Response:', response.data);
        const name = document.createElement('p');
        name.id = "reviewName";
        name.textContent = `Company: ${companyName}`;
        const rating = document.createElement('p');
        rating.id = "averageRating";
        companyReview.appendChild(name);
        companyReview.appendChild(rating);
        
        const totalReview = response.data.length;
        let totalRatings = 0;

        if (totalReview === 0) {
            companyReview.innerHTML = `<h1>No Review For This Company</h1>`;
            return;
        }

        response.data.forEach((review) => {
            let reviews = `
            <div>
                <p style="font-size:25px;color:#05386b">Pros</p>
                <p>${review.pros}</p>
                <p style="font-size:25px;color:#05386b">Cons</p>
                <p>${review.cons}</p>
                <p style="font-size:20px;color:#05386b">Rating: ${review.rating}</p>
            </div>
            <hr>
            `;
            totalRatings += Number(review.rating);
            companyReview.innerHTML += reviews;
        });

        let avgRating = totalRatings / totalReview;
        document.getElementById('averageRating').textContent = 'Average Rating: ' + avgRating.toFixed(1);

    } catch (error) {
        console.error('Search error:', error);
        companyReview.innerHTML = `<h1>Error fetching reviews</h1>`;
    }
}

// Check for URL parameters on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        search({ preventDefault: () => {}, target: { search: { value: searchParam } } });
    }
});
