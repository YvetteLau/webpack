import A from './a';
import './css/main/index.css';

A();
console.log(DEV)
document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default());
}

fetch("/api/user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

console.log($, _map)

$('#login').click(function() {
    location.href = '/login.html';
});