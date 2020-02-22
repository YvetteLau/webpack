import './index.less';
import hot from './hot';
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');
console.log('wwwwwww');
console.log(hot);
document.getElementById('img').onclick = function() {
    import('./a').then(fn => fn.default());
}
if(module && module.hot) {
    module.hot.accept()
}