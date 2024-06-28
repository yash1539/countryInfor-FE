$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var countryCca3 = urlParams.get('country');

    if (countryCca3) {
        fetchCountryDetail(countryCca3);
    } else {
        // Handle case where no country cca3 code is provided
        console.log('No country cca3 code provided.');
    }
});

function fetchCountryDetail(cca3) {
    $.ajax({
        url: 'https://restcountries.com/v3.1/alpha/' + cca3,
        type: 'GET',
        success: function(data) {
            displayCountryDetail(data);
        },
        error: function(err) {
            console.log('Error fetching country detail:', err);
        }
    });
}

function displayCountryDetail(country) {
    var countryDetailDiv = document.getElementById('countryDetail');
    var html = `
        <h3>${country.name.common}</h3>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Area:</strong> ${country.area} km²</p>
    `;
    countryDetailDiv.innerHTML = html;
}
