function toggleMap(map) {
    document.getElementById('googleMap').style.display = 'none';
    document.getElementById('wazeMap').style.display = 'none';
    
    if (map === 'google') {
        document.getElementById('googleMap').style.display = 'block';
    } else if (map === 'waze') {
        document.getElementById('wazeMap').style.display = 'block';
    }
}

function toggleFullscreen() {

    const googleMap = document.getElementById('googleMap');
    const wazeMap = document.getElementById('wazeMap');
    let visibleIframe = null;

    if (googleMap.style.display === 'block') {
        visibleIframe = googleMap;
    } else if (wazeMap.style.display === 'block') {
        visibleIframe = wazeMap;
    }

    if (visibleIframe) {
        if (visibleIframe.requestFullscreen) {
            visibleIframe.requestFullscreen();
        } else if (visibleIframe.mozRequestFullScreen) { // Firefox
            visibleIframe.mozRequestFullScreen();
        } else if (visibleIframe.webkitRequestFullscreen) { // Chrome, Safari e Opera
            visibleIframe.webkitRequestFullscreen();
        } else if (visibleIframe.msRequestFullscreen) { // IE/Edge
            visibleIframe.msRequestFullscreen();
        }
    }
}

document.querySelector('.iframe-buttons > :first-child ').click() //  GOOGLE MAPS BY DEFAULT