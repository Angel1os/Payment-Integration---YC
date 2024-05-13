// Sample data for channelId and networkId
let channelsResponse = {};

let networksResponse = {};

let customerTypesResponse = [];

function afterChannels(){
    reloadChannels();
    reloadTransactionTypes();
}

/*function fetchData(){

    // Fetch Channels
    makeRequest("/api/v1/yc/payments/channels", "GET", null, channelsResponse, afterChannels);
    console.log("Request channels : ", channelsResponse);

    // Fetch Networks
    makeRequest("/api/v1/yc/payments/networks", "GET", null, networksResponse, reloadNetworks);
    console.log("Request networks : ", networksResponse);

    // Fetch Customer Type
    makeRequest("/api/v1/yc/payments/customer-types", "GET", null, customerTypesResponse, reloadCustomerTypes);
    console.log("Request customerTypes : ", customerTypesResponse);

}*/



async function makeRequestWithFetchApi(url = "", method = "GET") {
    let requestOptions = {
        method: method.toUpperCase(),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log("the request data coming", data);
        return data;
    } catch (error) {
        console.error("The Request Error:", error.message);
        throw error; // Rethrow the error if needed
    }
}

async function getData() {
    try {
        channelsResponse = await makeRequestWithFetchApi("/api/v1/yc/payments/channels", "GET");
        networksResponse = await makeRequestWithFetchApi("/api/v1/yc/payments/networks", "GET");
        customerTypesResponse = await makeRequestWithFetchApi("/api/v1/yc/payments/customer-types", "GET");

        if(channelsResponse?.statusCode == 200){
            reloadTransactionTypes();
            reloadChannels();
        }

        if(customerTypesResponse.length >0){
            reloadCustomerTypes();

        }

        if(networksResponse?.statusCode == 200){
            reloadNetworks()
        }
        // console.log("the channelsResponse for this", channelsResponse);
        console.log("the networksResponse for this", networksResponse);
        // console.log("the customerTypesResponse for this", customerTypesResponse);
    } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error("Error fetching data:", error.message);
    }
}









function reloadNetworks(channelIdSelect = $("#channelId"), networkIdSelect = $("#networkId")) {
    networkIdSelect.html("");
    let selectedNetwork = networkIdSelect.val() ?? "";
    console.log("Selected Network : ", selectedNetwork);
    networkIdSelect.append($('<option>', {
        value: "",
        text: "Select Network",
        selected: true
    }));
    $.each(networksResponse?.data, function (index, item) {
        let selectedChannel = channelIdSelect.val() ?? "";
        if (selectedChannel == null || selectedChannel.trim() == "" ||
            (item?.channelIds != undefined && item?.channelIds?.includes(selectedChannel))) {
            networkIdSelect.append($('<option>', {
                value: item.id,
                text: item.name
            }));
        }
    });
    networkIdSelect.change();
}


function reloadTransactionTypes(transactionTypeSelect = $("#transactionType")) {
    transactionTypeSelect.html("");
    let types = new Set(channelsResponse?.data?.map(item => item?.rampType?.toUpperCase()));
    types.forEach(type =>
        transactionTypeSelect.append($('<option>', {
            value: type,
            text: type
        })));
}


function reloadCustomerTypes(customerTypeSelect = $("#customerType")) {
    customerTypeSelect.html("");

    customerTypeSelect.append($('<option>', {
        value: "",
        text: "Select Customer Type"
    }));

    let types = customerTypesResponse?.map(item => item);
    console.log("the type for the customertype",types)
    if(types != null && types != undefined){
        types?.forEach(type =>
            customerTypeSelect.append($('<option>', {
                value: type,
                text: type?.toUpperCase()
            })));
    }
}


function reloadChannels(transactionTypeSelect = $("#transactionType"), channelIdSelect = $("#channelId")) {
    channelIdSelect.html("");
    const channelByTransactionType = []
    let selectedTransactionType = transactionTypeSelect?.val() ?? "";
    console.log("Selected Transaction Type : ", selectedTransactionType);
    $.each(channelsResponse?.data, function (index, item) {
        if (selectedTransactionType == "" ||
            item?.rampType?.toUpperCase() == selectedTransactionType) {
            channelByTransactionType.push(item)
            channelIdSelect.append($('<option>', {
                value: item.id,
                text: item?.channelType + " - " + item?.country + " - " + item?.currency
            }));
        }
    });
    localStorage.setItem("channelByTransactionType",JSON.stringify(channelByTransactionType) )
}


function setRequiredProperty(inputField = HTMLInputElement, on = true) {
    // let inputField = $(item);
    console.log("Element : ", inputField);
    if(on && !inputField.hasAttribute("required")){
        // If the required attribute is not present, add it
       inputField.setAttribute("required", "required");
    }
    else if(!on && inputField.hasAttribute("required")){
        // If the required attribute is present, remove it
        inputField.removeAttribute("required");
        inputField.val("");
    }
}

$(document).ready(function () {

    // Populate channelId select dropdown
    getData().then(() => console.log("Done fetching Data"));
    // Populate networkId select dropdown

    /*fetchData()
        .then((e) => {
            console.log("Building Select Elements - ", e);
/!*
            reloadCustomerTypes();

            reloadTransactionTypes();

            reloadChannels();

            reloadNetworks();*!/
        });*/


    // let transactionTypeSelect = $("#transactionType");
    $("#dob")?.prop("max", new Date().toISOString().split("T")[0]);

    // let channelIdSelect = $("#channelId");


    // let networkIdSelect = $("#networkId");

    // Update networkName when networkId is changed
    $("#networkId").change(function () {
        let selectedNetworkId = $(this).val();
        let selectedNetwork = networksResponse?.data?.filter(item => item?.id === selectedNetworkId);
        console.log("CHANGE EVENT \nSelected Network : ", selectedNetwork);
        let size = selectedNetwork?.length;
        $("#networkName").val(size > 0 ? selectedNetwork[0]?.name : "");
        $("#accountType").val(size > 0 ? selectedNetwork[0].accountNumberType : "");
        $("#accountBank").val(size > 0 ? selectedNetwork[0].code : "");
        $("#destinationCountry").val(size > 0 ? selectedNetwork[0].country : "");

    });

    $("#isoCountry").on("change",function (){
        const channelByTransacType = localStorage.getItem("channelByTransactionType")
        const CBYTrac = JSON.parse(channelByTransacType)
        console.log("filtered channel data",CBYTrac)
        let selectedIsoCountry = $(this).val()
        let countryChannels = CBYTrac.filter(channel =>channel.country === selectedIsoCountry)
        $("#channelId").empty();
        $.each(countryChannels, function (index, item) {
            $("#channelId").append($('<option>', {
                value: item.id,
                text: item?.channelType + " - " + item?.currency
            }));
        });
        console.log("the selectedIsoCountry",selectedIsoCountry)
        console.log("the countryChannels",countryChannels)

    })


    // Update networkName when networkId is changed
    $("#transactionType").change(function () {
        reloadChannels();
    });


    // Update networkName when networkId is changed
    $("#channelId").change(function () {
        reloadNetworks();
    });

    // Alternating the Amount and LocalAmount
    $("#amount").change(function () {
        let item = $("#localAmount");
        item.val("");
        setRequiredProperty(item[0], false);
        setRequiredProperty($("#amount")[0], true);
    });

    $("#localAmount").change(function () {
        let item = $("#amount");
        item.val("");
        setRequiredProperty(item[0], false);
        setRequiredProperty($("#localAmount")[0], true);
    });

    $("#customerType").change(function () {
        let type = $("#customerType").val() ?? "";
        if(type.toUpperCase() === "INSTITUTION"){
            $("#institution_customer_type").removeClass("d-none");
            $("#retail_customer_type").addClass("d-none");
            makeInputsRequired("#retail_customer_type", false)
            makeInputsRequired("#institution_customer_type", true);
        }
        else if(type.toUpperCase() === "RETAIL"){
            $("#institution_customer_type").addClass("d-none");
            $("#retail_customer_type").removeClass("d-none");
            makeInputsRequired("#retail_customer_type", true)
            makeInputsRequired("#institution_customer_type", false);
        }
        else {
            $("#institution_customer_type").addClass("d-none");
            $("#retail_customer_type").addClass("d-none");
            makeInputsRequired("#retail_customer_type", false)
            makeInputsRequired("#institution_customer_type", false);
        }
    });


    function makeInputsRequired(parentId = "", on = true){
        try{
            if(parentId.trim() == ""){
                return;
            }
            let selects = $(parentId).find("select");
            console.log("Selects : ", selects);
            $.each(selects, (index, item) => {
                setRequiredProperty(item, on);
            });
            let inputs = $(parentId).find("input");

            console.log("Inputs : ", inputs);
            $.each(inputs, (index, item) => {
                setRequiredProperty(item, on);
            });

        }catch (e){
            console.error(e);
        }
    }

});

function makeRequest(url ="", method = "GET",  payloadString = null, saveResponse = null, callback = () => {}) {
    let xhr = new XMLHttpRequest();
    xhr.open(method.toUpperCase(), url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        try{
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Handle successful response
                console.log("Request successful");
                if(saveResponse != null){
                    saveResponse = JSON.parse(xhr?.response);
                    callback();
                }
            } else {
                // Handle error response
                console.error("The Request Error:", xhr?.responseText);
            }
        }catch (e){
            console.error(e);
        }
    };
    payloadString !== null
        ? xhr.send(payloadString)
        : xhr.send();
}

function submitForm() {
    // Extract values from form fields
    let channelId = document.getElementById("channelId").value;
    let name = document.getElementById("name").value;
    let country = document.getElementById("destinationCountry").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;
    let idNumber = document.getElementById("idNumber").value;
    let idType = document.getElementById("idType").value;
    let accountNumber = document.getElementById("accountNumber").value;
    let accountType = document.getElementById("accountType").value;
    let networkId = document.getElementById("networkId").value;
    let accountBank = document.getElementById("accountBank").value;
    let destinationCountry = document.getElementById("destinationCountry").value;
    let accountName = document.getElementById("accountName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let customerType = document.getElementById("customerType").value;
    let amount = document.getElementById("amount").value;
    let localAmount = document.getElementById("localAmount").value;
    let reason = document.getElementById("reason").value;
    let businessId = document.getElementById("businessId")?.value;
    let businessName = document.getElementById("businessName")?.value;
    let transactionType = document.getElementById("transactionType")?.value;

    // Construct the payload object
    let payload = {
        "channelId": channelId,
        // "sequenceId": "38f063e6-a575-44d7-828b-25d17fee84f0",
        "amount": amount,
        "localAmount": localAmount,
        "customerType": customerType,
        "reason": reason,
        "sender": {
            "name": name,
            "country": country,
            "phone": phone,
            "address": address,
            "dob": dob,
            "email": email,
            "idNumber": idNumber,
            "idType": idType,
            "businessId": businessId,
            "businessName": businessName
        },
        "destination": {
            "accountNumber": accountNumber,
            "accountType": accountType,
            "networkId": networkId,
            "accountBank": accountBank,
            "networkName": $("#networkId option:selected").text(),
            "country": destinationCountry,
            "accountName": accountName,
            "phoneNumber": phoneNumber
        },
        "forceAccept": false,
        "customerType": customerType,
        "transactionType": transactionType
    };

    console.log("the payload",payload)
    // Make an AJAX call to the desired endpoint
  let url = "/api/v1/yc/payments/submit"
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

// Make the POST request using fetch
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Response data:', data);
            window.location.href = "/payments";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


$("#submitFormData").on("submit",function (e){
    e.preventDefault()
        submitForm()
})