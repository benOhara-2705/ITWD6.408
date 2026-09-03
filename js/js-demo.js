// SUPABASE SETUP
// Import the Supabase client library and create a client instance
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// Replace with your Supabase project URL
const supabaseUrl = 'https://yukpyahqpxkokroinolm.supabase.co';
// Replace with your Supabase project API key
const supabaseKey = 'sb_publishable_mKXqf_jq5XxWmElobKEGpQ_G9SowyP_';
// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// ADD COMMENT TO ITEM
let allComments = [
    { name: "Dave", comment: "This couch took me to another dimension, 10/10" },
    { name: "Odie", comment: "Woof!" },
    { name: "Jon", comment: "NOOOOOOOOOO!!!" },
];

// Load all existing comments and display them on HTML
function loadComments() {
    // Loop through all comments in the array "allComments"
    for (var i = 0; i < allComments.length; i++) {
        let name = allComments[i].name;
        let comment = allComments[i].comment;

        // Create a new HTML node/element <P> to display this comment
        let node = document.createElement("P");
        let textnode = document.createTextNode(name + ": " + comment);
        node.appendChild(textnode);//Append the content (created TextNode) to the HTML Node (child)			
        let parrent_node = document.getElementById("comments");//Get the id of parent node "comments"		
        parrent_node.appendChild(node);//Append the above child HTML node to the parent node
    }
}

loadComments();

// Add a new comment
document.getElementById("post-comment").addEventListener("click", addComment);
function addComment() {
    // Get entered value/data by user
    let enteredCommentName = document.getElementById("comment_name").value;
    let enteredCommentText = document.getElementById("comment_text").value;

    // Add this new comment to the array
    allComments.push({ name: enteredCommentName, comment: enteredCommentText });
    alert("Thank you for your comment!");

    // Display this new comment on HTML page	
    // Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
    let node = document.createElement("P");
    // Create a new TextNode
    let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
    // Append the content (created TextNode) to the HTML Node (child)
    node.appendChild(textnode);
    // Get the id of parent node "comments"
    let parrent_node = document.getElementById("comments");
    // Append the above child HTML node to the parent node
    parrent_node.appendChild(node);

    // Clear comment box
    document.getElementById("comment_name").value = "";
    document.getElementById("comment_text").value = "";
}

// DEMO TWO

var shoppingCart = (function () {
    // Private
    let cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // Public
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }

    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = Math.max(1, count);
                saveCart();
                break;
            }
        }
    };

    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                if (cart[item].count > 1) {
                    cart[item].count--;
                    saveCart();
                }
                return;
            }
        }
    };

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (var i in cart) {
            let item = cart[i];
            let itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();

// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item btn btn-primary' data-name='" + cartArray[i].name + "' "
            + (cartArray[i].count === 1 ? "disabled" : "") + ">-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "<button class='plus-item btn btn-primary' data-name='" + cartArray[i].name + "'>+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>"
            + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})

// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();


// DEMO THREE

async function createAccount() {
    const username = document.getElementById("signup_username").value.trim();
    const password = document.getElementById("signup_password").value;

    if (!username || !password) {
        alert("Please enter a username and password");
        return;
    }

    const { error } = await supabase
        .from("users")
        .insert({
            username: username,
            password: password
        });

    if (error) {
        if (error.code === "23505") {
            alert("That username is taken, please choose a different username.")
        } else {
            console.error(error);
            alert("Signup failed. (Check console for more details)")
        }
        return;
    }

    alert("Account created!")

    document.getElementById("signup_username").value = "";
    document.getElementById("signup_password").value = "";
}

async function validateAccount() {
    const username = document.getElementById("login_username").value.trim();
    const password = document.getElementById("login_password").value;

    if (!username || !password) {
        alert("Please enter a username and password");
        return;
    }

    const { data, error } = await supabase
        .from("users")
        .select("password")
        .eq("username", username)
        .maybeSingle();

    if (error) {
        console.error(error);
        alert("Login failed. (Check console for more details)")
        return;
    }

    if (!data || data.password !== password) {
        alert("Incorrect username or password");
        return;
    }

    alert("You are now logged in!");
}

window.createAccount = createAccount;
window.validateAccount = validateAccount;

// DEMO FOUR

// Change text size
function customizeText() {
    let selectedTextSize = document.getElementById("text-size").value;
    document.getElementById("abstract").style.fontSize = selectedTextSize;
    document.getElementById("detailed").style.fontSize = selectedTextSize;
}

// Change background color	
let rainbowInterval;
let rainbowIndex = 0;

function changeColor() {
    const pageContent = document.getElementById("demo-four");
    const selectedBGColor = document.getElementById("colorOption").value;
    const abstract = document.getElementById("abstract");
    const detailed = document.getElementById("detailed");

    clearInterval(rainbowInterval);

    // Reset styles
    pageContent.style.backgroundImage = "";
    pageContent.style.backgroundColor = selectedBGColor;
    pageContent.style.backgroundRepeat = "repeat";
    pageContent.style.backgroundSize = "";
    pageContent.style.color = "";
    abstract.style.color = "";
    detailed.style.color = "";

    if (selectedBGColor === "rainbow") {
        const rainbowColors = ["red", "orange", "yellow", "green", "blue", "purple"];

        rainbowInterval = setInterval(() => {
            pageContent.style.backgroundColor = rainbowColors[rainbowIndex];
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
        }, 500);
    } else if (selectedBGColor === "earth") {
        pageContent.style.backgroundImage = "url(images/earth.gif)";
        abstract.style.color = "white";
        detailed.style.color = "white";
        pageContent.style.color = "white";
    } else if (selectedBGColor !== "empty") {
        pageContent.style.backgroundColor = selectedBGColor;
    }
}

// Read More/less function
function expandText() {
    // Find the expandBtn element on HTML file
    let expandBtn = document.getElementById("expandBtn");

    // Check whether to expand or collapse text based on the text display on the button
    if (expandBtn.value.toLowerCase() == "more") {
        document.getElementById("detailed").style.display = "block";
        expandBtn.value = "LESS";
        expandBtn.textContent = "LESS";
    } else {
        document.getElementById("detailed").style.display = "none";
        expandBtn.value = "MORE";
        expandBtn.textContent = "MORE";
    }
}

window.customizeText = customizeText;
window.changeColor = changeColor;
window.expandText = expandText;

// BUTTONS SCRIPT
const toggleButtons = document.querySelectorAll('#demo-buttons button[data-bs-toggle="collapse"]');
let activeButton = null;

function resetButtons() {
    toggleButtons.forEach(button => {
        button.classList.add('btn-secondary');
        button.classList.remove('btn-primary');
    });
    activeButton = null;
}

function setActiveButton(button) {
    if (button === activeButton) {
        resetButtons();
        return;
    }

    toggleButtons.forEach(btn => {
        btn.classList.toggle('btn-primary', btn === button);
        btn.classList.toggle('btn-secondary', btn !== button);
    });

    activeButton = button;
}

toggleButtons.forEach(button => {
    button.addEventListener('click', () => setActiveButton(button));
});

resetButtons();
