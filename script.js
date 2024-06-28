// Fetch country data from API
$(document).ready(function () {
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        type: 'GET',
        success: function (data) {
            displayCountryList(data);
        },
        error: function (err) {
            console.log('Error fetching countries:', err);
        }
    });
});

// Display country list on the page
function displayCountryList(countries) {
    var countryList = document.getElementById('countryList');
    countryList.innerHTML = '';

    countries.forEach(function (country) {
        var li = document.createElement('li');
        li.setAttribute('data-cca3', country.cca3);
        li.classList.add('country-item'); // Add class for styling

        // Container for content (flag, name, buttons)
        var contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container'); // Add class for styling

        // Flag image
        var flagImg = document.createElement('img');
        flagImg.src = country.flags.svg;
        flagImg.alt = country.name.common + ' Flag';
        flagImg.classList.add('flag-image');
        flagImg.style.width = '80px'; // Adjust size as needed
        flagImg.style.height = '80px';
        contentContainer.appendChild(flagImg);

        // Country name
        var countryName = document.createElement('span');
        countryName.textContent = country.name.common;
        countryName.classList.add('name'); // Add class for styling
        contentContainer.appendChild(countryName);

        // Buttons container
        var buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('button-container'); // Add class for styling

        // Button for showing details
        var showDetailsBtn = document.createElement('button');
        showDetailsBtn.textContent = 'Details';
        showDetailsBtn.classList.add('details-button'); // Add class for styling
        showDetailsBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent li click when clicking button
            var cca3 = li.getAttribute('data-cca3');
            showCountryDetails(cca3);
        });
        buttonsContainer.appendChild(showDetailsBtn);

        // Button to show map (opens in new tab)
        var showMapBtn = document.createElement('button');
        showMapBtn.textContent = 'Show Map';
        showMapBtn.classList.add('map-button'); // Add class for styling
        showMapBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent li click when clicking button
            var cca3 = li.getAttribute('data-cca3');
            showCountryMap(cca3);
        });
        buttonsContainer.appendChild(showMapBtn);

        // Append content container and buttons container to li
        contentContainer.appendChild(buttonsContainer);
        li.appendChild(contentContainer);

        // Append li to country list
        countryList.appendChild(li);
    });
}



// Function to show country details
function showCountryDetails(cca3) {
    // Redirect to detail page with cca3 parameter
    window.location.href = 'detail.html?country=' + cca3;
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
