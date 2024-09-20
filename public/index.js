document.getElementById('search-button').addEventListener('click', function() {
    document.getElementById('checkin-h2').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('search-button').style.display = 'none';
    document.getElementById('loading-circle').style.display = 'block';
    setTimeout(function() {
        document.getElementById('loading-circle').style.display = 'none';
        // pick a random number between 0 and 1
        const random = Math.random();
        // if the number is less than 0.5, show the found result
        if (random < 0.5) {
            document.getElementById('found-result').style.display = 'flex';
            return;
        }
        document.getElementById('not-found-result').style.display = 'flex';
    }, 4000);
});

document.getElementById('confirm-button').addEventListener('click', function() {
    document.getElementById('found-result').style.display = 'none';
    document.getElementById('not-found-result').style.display = 'none';
    document.getElementById('checkin-h2').style.display = 'unset';
    document.getElementById('search').style.display = 'unset';
    document.getElementById('search-button').style.display = 'unset';
});