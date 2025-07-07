import './style.css'
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const wrap = document.querySelector('.wrap');
const containers = document.querySelectorAll('.wrap .container');

let index = 0;
const totalContainers = containers.length;

const initCarousel = () => {
    containers.forEach((container, index) => {
        container.classList.remove('active');
    });

    containers[index].classList.add('active');
    //wrap.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener('click', () => {
    index = (index + 1) % totalContainers;
    initCarousel();
});

prev.addEventListener('click', () => {
    index = (index - 1 + totalContainers) % totalContainers;
    initCarousel();
})

////COUNTER

let c = 0, ci = 0, cd = 0;
const count = document.getElementById("count");
const incCount = document.getElementById("incCount");
const decCount = document.getElementById("decCount");
const dec = document.querySelector(".dec");
const inc = document.querySelector(".inc");
const primeCheck = document.querySelector(".primeCheck");

dec.addEventListener('click', () => {
    if(c > 0) {
        cd++;
        c--;
    }
    update();
});

inc.addEventListener('click', () => {
    c++;
    ci++;
    update();
});

primeCheck.addEventListener('click', () => {
    const res = document.getElementById("prime-result");
    if(isNaN(c) || c <= 1) {
        res.textContent = "Please enter a number greater than 1";
        res.style.color = "red";
        return;
    }
    let isPrime = true;
    for(let i = 2; i < Math.sqrt(c); i++) {
        if(c % i === 0) {
            isPrime = false;
            break;
        }
    }
    if(isPrime) {
        res.textContent = `${c} is a prime number`;
        res.style.color = "green";
    } else {
        res.textContent = `${c} is not a prime number`;
        res.style.color = "blue";
    }

});

const update = () => {
    count.textContent = c;
    incCount.textContent = ci;
    decCount.textContent = cd;
}

////PASSWORD