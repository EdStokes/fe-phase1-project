// const spaceAPI = 'https://ll.thespacedevs.com/2.2.0/expedition';
const spacexAPI = 'https://api.le-systeme-solaire.net/rest/bodies/'

fetch(spacexAPI)
    .then(res => res.json())
    .then(data => console.log(data));