document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
        const rating = this.getAttribute('data-value');
        document.getElementById('rating').value = rating;
    });
})

function searchCompany() {
    const name = document.getElementById('companyName').value;
    if (!name) {
        alert('Please enter a company name');
        return;
    }

    fetch(`/search?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('result');
            resultsDiv.innerHTML = '';  // Clear previous results

            if (data.error || data.message) {
                resultsDiv.innerHTML = `<p>${data.message || data.error}</p>`;
                return;
            }

            data.forEach(review => {
                resultsDiv.innerHTML += `
                        <div>
                            <h3>${review.name}</h3>
                            <p><strong>Pros:</strong> ${review.pro}</p>
                            <p><strong>Cons:</strong> ${review.con}</p>
                            <p><strong>Rating:</strong> ${review.rating} ★</p>
                        </div>
                        <hr>
                    `;
            });
        })
        .catch(error => console.error('Error:', error));
}