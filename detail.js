$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var countryCca3 = urlParams.get('country');

    if (countryCca3) {
        fetchCountryDetail(countryCca3);
    } else {
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
    console.log("d",country);
    var html = `
        <h3>${country[0].name.common}</h3>
        <p><img src="${country[0].flags.svg}" alt="${country[0].name.common} Flag" class="flag-image"></p>
        <p><strong>Capital:</strong> ${country[0].capital}</p>
        <p><strong>Population:</strong> ${country[0].population}</p>
        <p><strong>Region:</strong> ${country[0].region}</p>
        <p><strong>Subregion:</strong> ${country[0].subregion}</p>
        <p><strong>Area:</strong> ${country[0].area} km²</p>
        <p><a href="${country[0].maps.googleMaps}" target="_blank">Show Map</a></p>
    `;
    countryDetailDiv.innerHTML = html;
}
