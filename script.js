// Fetch country data from API
$(document).ready(function() {
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        type: 'GET',
        success: function(data) {
            displayCountryList(data);
        },
        error: function(err) {
            console.log('Error fetching countries:', err);
        }
    });
});

// Display country list on the page
function displayCountryList(countries) {
    var countryList = document.getElementById('countryList');
    countryList.innerHTML = '';

    countries.forEach(function(country) {
        var li = document.createElement('li');
        li.textContent = country.name.common;
        li.setAttribute('data-cca3', country.cca3);
        
        // Click event to show country detail
        li.addEventListener('click', function() {
            var cca3 = this.getAttribute('data-cca3');
            window.location.href = 'detail.html?country=' + cca3;
        });

        countryList.appendChild(li);
    });
}

// Function to search countries by name
function searchCountries() {
    var input, filter, ul, li, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('countryList');
    li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
