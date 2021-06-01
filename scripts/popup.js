function getLastSync()
{
    chrome.storage.sync.get("token",function(res){
        document.getElementById("token").value = res.token;
        getItems();
    });
}

function fillData(data)
{
    console.log(data);
    var list = document.getElementById("list");
    list.innerHTML = "";
    data.forEach(element => {
        list.innerHTML += "<li>"+element.name+"</li>";
    });
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date+' '+time;
    document.getElementById("lastSync").innerText = "Last sync: " + dateTime;
    chrome.storage.sync.set({"lastSync":dateTime});
}

function getItems()
{
    var token = document.getElementById('token').value;
    fetch('https://localhost:44367/api/CategoriesAPI?accessToken='+token)
        .then(response => response.json())
        .then(data => {
            fillData(data);
        }); 
    chrome.storage.sync.set({"token":token});
}

function getToken()
{
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    chrome.storage.sync.get("token",function(res){
        document.getElementById("token").value = res.token;
    });
}

const getList = document.getElementById('getList');
getList.addEventListener('click', getItems);

document.getElementById('getToken').addEventListener('click', getToken);

$(document).ready(function() {
    getLastSync();
});
