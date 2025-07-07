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

const result = document.getElementById('result');
const input = document.getElementById('length');
const upper = document.getElementById('uppercase');
const number = document.getElementById('numbers');
const special = document.getElementById('special');

const generatePassword = document.querySelector('.generate');
const resetPassword = document.querySelector('.reset');
const togglePassword = document.querySelector('.toggle');

let hasClicked = false;

const password = (len, upper, nums, special) => {
    const baseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const upperCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numCharacters = "0123456789";
    const specialCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    let characters = baseCharacters;

    if(upper) characters += upperCharacters;
    if(nums) characters += numCharacters;
    if(special) characters += specialCharacters;

    let password = '';

    for(let i = 0; i < len; i++) {
        password += characters.charAt(Math.floor(Math.random()*characters.length));
    }

    return password;
}


generatePassword.addEventListener('click', () => {

    if(input.value) {

        result.textContent = password(input.value, upper.checked,
            number.checked, special.checked);
        window.currPassword = result.textContent;

    } else {
        result.textContent = 'Please enter a password length';
    }

});

togglePassword.addEventListener('click', () => {
    const image = document.getElementById('image');

    if(input.value) {
        hasClicked ? hasClicked = false : hasClicked = true;
        hasClicked ? image.src = 'public/hidden.png' : image.src = 'public/eye.png';


        let password = '';
        for(let i = 0; i < input.value; i++) {
            password += "*";
        }

        hasClicked ? result.textContent = password : result.textContent = currPassword;
    }

});

resetPassword.addEventListener('click', () => {
    result.textContent = 'Your password will appear here';
    upper.checked = false;
    number.checked = false;
    special.checked = false;
    input.value = '';
});

////Email Validator

const emailResult = document.getElementById("email-result");
const emailInput = document.getElementById("email");
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let counter = 1;

const validateEmail = document.querySelector(".validate");
const copyToClipboard = document.querySelector(".clip");

validateEmail.addEventListener('click', () => {
    if (regex.test(emailInput.value)) {
        emailResult.textContent = "Valid Email Address";
        emailResult.style.color = "green";
        emailManager(emailInput.value);
    }
    else {
        emailResult.textContent = "Invalid Email Address";
        emailResult.style.color = "red";
    }
});

const emailManager = (email) => {
    const newEmailItem = document.createElement("li");
    newEmailItem.classList.add("item");
    newEmailItem.draggable = true;
    newEmailItem.textContent = email;
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "public/delete.png";
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
        newEmailItem.remove();
        counter--;
    });
    newEmailItem.appendChild(deleteButton);
    const emailList = document.getElementById("list");
    emailList.appendChild(newEmailItem);
    counter++;
};

copyToClipboard.addEventListener('click', () => {
    if (regex.test(emailInput.value)) {
        navigator.clipboard.writeText(emailInput.value);
        emailResult.textContent = "Copied to Clipboard!";
        emailResult.style.color = "blue";
    }
    else {
        emailResult.textContent = "Invalid Email Address";
        emailResult.style.color = "red";
    }
});

const list = document.querySelector(".list");
let dragging = null;
if (list) {
    list.addEventListener('dragstart', function (e) {
        const target = e.target;
        if (target && target.classList.contains('item')) {
            dragging = target;
            target.classList.add('dragging');
        }
    });
    list.addEventListener('dragend', function (e) {
        if (dragging) {
            dragging.classList.remove('dragging');
        }
        document.querySelectorAll('.item').forEach(function (item) { return item.classList.remove('over'); });
        dragging = null;
    });
    list.addEventListener('dragover', function (e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        document.querySelectorAll('.item').forEach(function (item) { return item.classList.remove('over'); });
        if (afterElement && dragging) {
            afterElement.classList.add('over');
            list.insertBefore(dragging, afterElement);
        }
        else if (dragging) {
            list.appendChild(dragging);
        }
    });
}
const getDragAfterElement = (container, y) => {
    const items = Array.prototype.slice.call(container.querySelectorAll('.item:not(.dragging)'));
    return items.reduce(function (closest, child) {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
};