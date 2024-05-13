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
        // channelsResponse = await makeRequestWithFetchApi("/api/v1/yc/payments/channels", "GET");
        // networksResponse = await makeRequestWithFetchApi("/api/v1/yc/payments/networks", "GET");
        // customerTypesResponse = await makeRequestWithFetchApi("/api/v1/yc/payments/customer-types", "GET");
        channelsResponse = {
            "message": "Success",
            "statusCode": 200,
            "data": [
                {
                    "max": 1000000,
                    "currency": "XAF",
                    "countryCurrency": "CMXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:36:35.818Z",
                    "vendorId": "c339d25c-308a-42bf-ba51-d3d37e098264",
                    "country": "CM",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.732Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "79da4d6e-1c42-4aac-ae7d-422730528f96",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "UGX",
                    "countryCurrency": "UGUGX",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:28:16.332Z",
                    "vendorId": "01697a95-f421-4d22-b3ce-bdb8551ce065",
                    "country": "UG",
                    "feeUSD": 0,
                    "min": 15000,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "46cf71c9-42c9-4815-8f1f-12989296aadf",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZAR",
                    "countryCurrency": "ZAZAR",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-16T08:00:23.389Z",
                    "vendorId": "f56013bf-d18d-4963-b65e-b0b072e0aee1",
                    "country": "ZA",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "eft",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "81018280-e320-4c81-9b2f-6f636c2239d8",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XAF",
                    "countryCurrency": "GAXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:07:19.702Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "GA",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "0cc05476-c25a-46c4-9c71-23c39ed87348",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "CDUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:07:35.462Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CD",
                    "feeUSD": 0,
                    "min": 5.5,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "542ed7b7-9844-4602-9766-41a2489aa063",
                    "balancer": {}
                },
                {
                    "max": 5000000,
                    "currency": "NGN",
                    "countryCurrency": "NGNGN",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T14:16:07.387Z",
                    "vendorId": "ec2109e2-ff57-4a07-b400-7818907ce2f9",
                    "country": "NG",
                    "widgetStatus": "active",
                    "feeUSD": 0,
                    "min": 2500,
                    "channelType": "p2p",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "fe8f4989-3bf6-41ca-9621-ffe2bc127569",
                    "balancer": {}
                },
                {
                    "max": 5000000,
                    "currency": "NGN",
                    "countryCurrency": "NGNGN",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T14:15:58.265Z",
                    "vendorId": "ec2109e2-ff57-4a07-b400-7818907ce2f9",
                    "country": "NG",
                    "widgetStatus": "active",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "p2p",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "af944f0c-ba70-47c7-86dc-1bad5a6ab4e4",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "MWK",
                    "countryCurrency": "MWMWK",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:37:55.006Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "MW",
                    "feeUSD": 0,
                    "min": 5000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "aa11c087-d0c8-4f8d-b566-3625a7581a1f",
                    "balancer": {}
                },
                {
                    "max": 1000000,
                    "currency": "XAF",
                    "countryCurrency": "CMXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:39:07.709Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CM",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "218a9dfe-5031-46c9-a0a7-1a578cfb2f2d",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "TZS",
                    "countryCurrency": "TZTZS",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:46:36.851Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "TZ",
                    "feeUSD": 0,
                    "min": 2500,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "fc7a5bc2-9100-473e-8c01-df563494ee73",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "GHS",
                    "successThreshold": 75,
                    "countryCurrency": "GHGHS",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2023-08-22T09:55:18.786Z",
                    "vendorId": "619a3cac-cd4c-41dd-bb52-2fdd8ccc0cb8",
                    "country": "GH",
                    "feeUSD": 0,
                    "min": 20,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "manual",
                    "estimatedSettlementTime": 8000,
                    "id": "edaec219-7559-421e-aa4c-267c3b018b64",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "TGXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-31T11:59:27.977Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "TG",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "603c84e5-d219-444b-a5bb-40f756291ebe",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "BWP",
                    "countryCurrency": "BWBWP",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:38:20.216Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "BW",
                    "feeUSD": 0,
                    "min": 150,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "1239227d-f33a-4d7a-8520-0a0cf41988fb",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "CIXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:54:58.943Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "CI",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "33a82864-6460-43d7-9fc0-911f9bd8d50a",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZMW",
                    "countryCurrency": "ZMZMW",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-11T08:31:32.973Z",
                    "vendorId": "03ab95fc-df93-47e0-b51b-010b86ac28f1",
                    "country": "ZM",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "spenn",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "ff3fad5f-05f6-4425-9085-794d71890493",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "RWF",
                    "countryCurrency": "RWRWF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:59:30.891Z",
                    "vendorId": "c339d25c-308a-42bf-ba51-d3d37e098264",
                    "country": "RW",
                    "feeUSD": 0,
                    "min": 1500,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "695c718c-aab7-4670-b81f-b1da6191f37f",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "SNXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:40:05.257Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "SN",
                    "feeUSD": 0,
                    "min": 6500,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "5ff735fb-c0e5-4828-9c03-1bb189de5622",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "BFXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-31T13:58:52.802Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "BF",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "fbd1276a-8709-44e0-ac1d-9b41656591cd",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZMW",
                    "countryCurrency": "ZMZMW",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:43:47.371Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "ZM",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "ddc30e71-58e4-4bb4-a22b-ef0293f176e4",
                    "balancer": {}
                },
                {
                    "max": 5000,
                    "currency": "GHS",
                    "countryCurrency": "GHGHS",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:06:09.999Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "GH",
                    "feeUSD": 0,
                    "min": 20,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "0cb199c5-318f-4734-b7fb-71e23061e203",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XAF",
                    "countryCurrency": "GAXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:42:05.115Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "GA",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "65a69867-81e2-44c7-a97b-fcaaf5f38359",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "CDUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:25:10.310Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CD",
                    "feeUSD": 0,
                    "min": 5.5,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "1937a7bd-c9c3-4ed9-b74e-ac11c97ef104",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "KES",
                    "countryCurrency": "KEKES",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:25:28.158Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "KE",
                    "feeUSD": 0,
                    "min": 300,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "b7140c26-0c93-460b-85cf-bdb53af66ca0",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "RWF",
                    "countryCurrency": "RWRWF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:45:15.170Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "RW",
                    "feeUSD": 0,
                    "min": 1500,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "71764ae2-6620-4e9d-9474-4c94877366b9",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "UDX",
                    "countryCurrency": "UGUDX",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:40:41.012Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "UG",
                    "feeUSD": 0,
                    "min": 15000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "3dea1c86-f4cc-4d12-8144-0bd17aa56806",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "MWK",
                    "countryCurrency": "MWMWK",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:44:05.805Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "MW",
                    "feeUSD": 0,
                    "min": 2000,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "158f471c-62ac-469f-9127-012b3bc648e1",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XAF",
                    "countryCurrency": "CGXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:07:53.128Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CG",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "5968d5d4-103b-4333-98e2-b400968c6927",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "BWUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:45:58.170Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "BW",
                    "feeUSD": 0,
                    "min": 15,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "4f4b9db8-9c41-46b0-a189-1222f588ec12",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "BWUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:41:52.455Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "BW",
                    "feeUSD": 0,
                    "min": 15,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "3afcad16-1f7c-469b-853e-57c216ef2f36",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "TGXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-31T11:59:56.562Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "TG",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "3955a441-fa81-4bee-a3ce-f958a530be80",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "TZS",
                    "countryCurrency": "TZTZS",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:39:49.952Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "TZ",
                    "feeUSD": 0,
                    "min": 2500,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "1a57c6c1-5cc4-421a-8a39-b7818467e765",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZMW",
                    "countryCurrency": "ZMZMW",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-11T09:31:44.406Z",
                    "vendorId": "619a3cac-cd4c-41dd-bb52-2fdd8ccc0cb8",
                    "country": "ZM",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "44e12ee6-be82-4f74-8af1-9fb36b553700",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "USUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:40:20.116Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "US",
                    "feeUSD": 0,
                    "min": 2,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "019c78ad-33bd-48ec-851e-076c4e5d64af",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "SNXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-11T08:53:24.801Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "SN",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "030d5d5e-95a5-45b8-8340-d9d56bdb25f6",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "CDF",
                    "countryCurrency": "CDCDF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:39:37.631Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CD",
                    "feeUSD": 0,
                    "min": 10000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "993f9ce7-f5ab-47f0-9ded-1169b25d8ae0",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "KES",
                    "successThreshold": 75,
                    "countryCurrency": "KEKES",
                    "status": "active",
                    "feeLocal": 1,
                    "createdAt": "2023-08-16T09:46:22.833Z",
                    "vendorId": "43a4e873-3b1f-456a-9eaa-85020b74404f",
                    "country": "KE",
                    "widgetStatus": "inactive",
                    "feeUSD": 1,
                    "min": 300,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-19T14:14:28.284Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "6bf61778-3bee-4e39-bdc6-b0f1087b843f",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "CDF",
                    "countryCurrency": "CDCDF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:55:39.183Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "CD",
                    "feeUSD": 0,
                    "min": 10000,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "ca4367f8-c228-4fd1-a6f2-90b08b2c0db1",
                    "balancer": {}
                },
                {
                    "max": 10000,
                    "currency": "ZAR",
                    "countryCurrency": "ZAZAR",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T12:12:50.117Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "ZA",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "7c6e1ef6-ac88-40f8-8a0d-d077d0aa7851",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZAR",
                    "countryCurrency": "ZAZAR",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T12:00:31.541Z",
                    "vendorId": "8ac3fe05-5ccd-4e73-a962-9f4763b626e7",
                    "country": "ZA",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "eft",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "6d2353d0-9c75-4be2-8fad-ddfb2e4a2e0e",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XAF",
                    "countryCurrency": "CMXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T14:20:29.610Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CM",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "bd64a5e7-7e16-4459-aaab-4c349bc615d7",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "UGUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:43:06.720Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "UG",
                    "feeUSD": 0,
                    "min": 5,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "08a80804-0fe7-486d-bce0-ead90ee3b409",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZMW",
                    "countryCurrency": "ZMZMW",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:54:32.751Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "ZM",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "f436afb5-d034-4d18-b9d5-e8125e6ddfe4",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "CIXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:54:06.425Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "CI",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "2452c27c-7c49-442c-b6f8-cde03f03f9ba",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XAF",
                    "countryCurrency": "CMXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:42:12.583Z",
                    "vendorId": "c339d25c-308a-42bf-ba51-d3d37e098264",
                    "country": "CM",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "9c2a8aa3-0de6-4409-bd20-6363884e927e",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "CIXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:24:06.411Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CI",
                    "feeUSD": 0,
                    "min": 17000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "0a9df144-564e-474e-a920-2f636000c4ce",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "UGX",
                    "countryCurrency": "UGUGX",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:54:05.073Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "UG",
                    "feeUSD": 0,
                    "min": 15000,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "5de46c23-6461-4950-871f-a971490772cf",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "CDF",
                    "countryCurrency": "CDCDF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:54:38.170Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "CD",
                    "feeUSD": 0,
                    "min": 10000,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "0bad92c4-c3d1-4c1d-882c-482d6bd34d8e",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "KES",
                    "countryCurrency": "KEKES",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:44:39.231Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "KE",
                    "feeUSD": 0,
                    "min": 300,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "de274d59-46b3-49a8-8836-3c0cc5b73a4f",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "RWF",
                    "countryCurrency": "RWRWF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:46:37.400Z",
                    "vendorId": "03ab95fc-df93-47e0-b51b-010b86ac28f1",
                    "country": "RW",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "spenn",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "a74fc73d-d694-49c2-9876-1ccfb0ad4074",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "GHS",
                    "countryCurrency": "GHGHS",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:30:59.275Z",
                    "vendorId": "ca6de2f6-0f8f-4a3b-b449-7f57304a6fed",
                    "country": "GH",
                    "feeUSD": 0,
                    "min": 20,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "415ae56f-24f9-476a-9f18-6a656b952db2",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZAR",
                    "countryCurrency": "ZAZAR",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:59:54.147Z",
                    "vendorId": "f56013bf-d18d-4963-b65e-b0b072e0aee1",
                    "country": "ZA",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "eft",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "97a6cf0d-55b3-45b3-bcf6-c0597fe556a8",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XAF",
                    "countryCurrency": "CGXAF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:38:37.113Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CG",
                    "feeUSD": 0,
                    "min": 1000,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "6fef21a2-b8f3-4515-bef5-63597ea0307f",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "RWF",
                    "countryCurrency": "RWRWF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:51:06.569Z",
                    "vendorId": "03ab95fc-df93-47e0-b51b-010b86ac28f1",
                    "country": "RW",
                    "feeUSD": 0,
                    "min": 1200,
                    "channelType": "spenn",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "50cb0d66-254d-4194-93c3-643ff283f282",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "SNXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:05:51.682Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "SN",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "580bf12c-01f8-4039-a3b1-d1bd9f698849",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "BJXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-31T09:52:15.371Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "BJ",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "1997a129-32f1-4aa7-8f2a-edaf3a0bb0a5",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "UGUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:06:26.041Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "UG",
                    "feeUSD": 0,
                    "min": 5,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "c4b4a440-3f4d-4f1c-84fe-2184ba183889",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "SNXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:55:19.715Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "SN",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "50d03c41-2c8a-4a31-a2ca-d05a924d7816",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZAR",
                    "countryCurrency": "ZAZAR",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-15T16:07:02.979Z",
                    "vendorId": "690018c1-3c7f-41f0-84b0-24ab0fc02cd8",
                    "country": "ZA",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "yellowCardPin",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "aa4f26af-eab5-44ca-a7fc-b74aa0ade73c",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "GHS",
                    "countryCurrency": "GHGHS",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:31:20.375Z",
                    "vendorId": "ca6de2f6-0f8f-4a3b-b449-7f57304a6fed",
                    "country": "GH",
                    "feeUSD": 0,
                    "min": 20,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "2cb75e87-7a02-48cb-bee8-93f38b96dbc9",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "USD",
                    "countryCurrency": "USUSD",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:01:43.838Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "US",
                    "feeUSD": 0,
                    "min": 20,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "32feff9f-b32d-4e11-94ed-135280adae85",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "CDF",
                    "countryCurrency": "CDCDF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:08:05.148Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CD",
                    "feeUSD": 0,
                    "min": 10000,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "58f33225-f76b-457c-a0f1-c8a5009e6030",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "KES",
                    "successThreshold": 75,
                    "countryCurrency": "KEKES",
                    "status": "active",
                    "feeLocal": 1,
                    "createdAt": "2023-08-16T09:46:02.615Z",
                    "vendorId": "43a4e873-3b1f-456a-9eaa-85020b74404f",
                    "country": "KE",
                    "widgetStatus": "inactive",
                    "feeUSD": 1,
                    "min": 300,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-19T14:14:28.284Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "71700f34-c42a-4b61-96a4-db79f6d5684b",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "RWF",
                    "countryCurrency": "RWRWF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T11:38:53.229Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "RW",
                    "feeUSD": 0,
                    "min": 1500,
                    "channelType": "bank",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "05ec29bc-a6c0-4045-8ef1-8701fa991d12",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "BFXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-31T13:58:34.600Z",
                    "vendorId": "31a4c715-ed44-4a6c-8281-fc7031a0fa75",
                    "country": "BF",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "9c94cad1-ffc4-4211-ae69-e62c72827d01",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "BWP",
                    "countryCurrency": "BWBWP",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:49:39.048Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "BW",
                    "feeUSD": 0,
                    "min": 150,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "602060c6-b4af-49a4-b8fd-2fdd0dbf13ce",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "UGX",
                    "countryCurrency": "UGUGX",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T09:30:14.274Z",
                    "vendorId": "01697a95-f421-4d22-b3ce-bdb8551ce065",
                    "country": "UG",
                    "feeUSD": 0,
                    "min": 15000,
                    "channelType": "momo",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "4a5e6cec-a02e-47a3-8b2f-071a5c50be64",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "ZAR",
                    "countryCurrency": "ZAZAR",
                    "status": "active",
                    "feeLocal": 10,
                    "createdAt": "2022-10-06T14:14:55.636Z",
                    "vendorId": "8ac3fe05-5ccd-4e73-a962-9f4763b626e7",
                    "country": "ZA",
                    "feeUSD": 0,
                    "min": 100,
                    "channelType": "eft",
                    "rampType": "withdraw",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "62092e43-b2bc-49e2-ba1b-9bce3a853ff6",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "XOF",
                    "countryCurrency": "CIXOF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T10:02:14.480Z",
                    "vendorId": "93c71084-3d5b-417a-ba98-5f300c75e7fb",
                    "country": "CI",
                    "feeUSD": 0,
                    "min": 500,
                    "channelType": "bank",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "df908115-1cba-4c09-ab21-e9e34f76809e",
                    "balancer": {}
                },
                {
                    "max": 0,
                    "currency": "RWF",
                    "countryCurrency": "RWRWF",
                    "status": "active",
                    "feeLocal": 0,
                    "createdAt": "2022-08-10T12:28:38.631Z",
                    "vendorId": "c339d25c-308a-42bf-ba51-d3d37e098264",
                    "country": "RW",
                    "feeUSD": 0,
                    "min": 1500,
                    "channelType": "momo",
                    "rampType": "deposit",
                    "updatedAt": "2024-03-22T10:00:20.733Z",
                    "apiStatus": "active",
                    "settlementType": "instant",
                    "estimatedSettlementTime": 60,
                    "id": "4f740b63-f327-481e-afe4-79ae4d4d9f9c",
                    "balancer": {}
                }
            ],
            "dateTime": "2024-05-12T08:54:27.0298624Z"
        };

        networksResponse = {
            "message": "Success",
            "statusCode": 200,
            "data": [
                {
                    "code": "589000",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "41109c18-9604-4389-8472-44ff4378c6cb",
                    "country": "ZA",
                    "name": "Finbond Mutual Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "450905",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "0d19d67e-5946-4289-bac1-ad147d7c84ad",
                    "country": "ZA",
                    "name": "Mercantile Bank Limited",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "MTN_MOMO_ZMB",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "b1fcd635-3231-435a-9c57-ef954751b0c6",
                        "a57cf139-fdae-4cb4-b614-92e1fb13eea6"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T16:59:32.789Z",
                    "id": "69affaa2-fbec-4e28-abd0-7444232721be",
                    "country": "ZM",
                    "name": "MTN",
                    "countryAccountNumberType": "ZMPHONE"
                },
                {
                    "code": "586611",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "696ad043-827c-42cc-b41b-46270fca7899",
                    "country": "ZA",
                    "name": "Central Bank Of Lesotho",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "201419",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "471310ac-3604-4a36-b75f-819ebb58ae88",
                    "country": "ZA",
                    "name": "FirstRand Bank Limited",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "87373",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "a0db3097-e94c-4bd9-b67e-f3557976c6f2",
                    "country": "ZA",
                    "name": "Standard Bank Namibia",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "198765",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "9388a1f2-8a29-4bf6-83a0-e4280de53baa",
                    "country": "ZA",
                    "name": "Nedbank (South Africa)",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "221",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "3d4d08c1-4811-4fee-9349-a302328e55c1",
                    "country": "NG",
                    "name": "Stanbic Ibtc Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "350005",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "eff2baef-8676-4ef6-915c-10c9f001d9d3",
                    "country": "ZA",
                    "name": "Citi Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "282672",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "ec2fe23d-8c72-4a40-aaa2-76921703dddd",
                    "country": "ZA",
                    "name": "First National Bank Namibia",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "Mobile Wallet",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "695c718c-aab7-4670-b81f-b1da6191f37f",
                        "4f740b63-f327-481e-afe4-79ae4d4d9f9c"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T16:59:32.789Z",
                    "id": "a67435ea-450e-46b7-9138-4eb4f7c12c1b",
                    "country": "RW",
                    "name": "Mobile Wallet",
                    "countryAccountNumberType": "RWPHONE"
                },
                {
                    "code": "730020",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "29dfd792-d66d-4121-9235-324b2edf28ed",
                    "country": "ZA",
                    "name": "Standard Chartered Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "157852",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "3a88a3b7-d0c1-4c50-bd07-89e868b02846",
                    "country": "ZA",
                    "name": "Peach",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "057",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "6df48502-1ebe-473f-be17-e2cae4dd67ee",
                    "country": "NG",
                    "name": "Zenith Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "471001",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "3921cd57-f596-4166-b326-32985cb70491",
                    "country": "ZA",
                    "name": "Meeg Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "058",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "31cfcc77-8904-4f86-879c-a0d18b4b9365",
                    "country": "NG",
                    "name": "Guaranty Trust Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "030",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "8ff2ece4-3a97-4f86-9c21-db6db8c477b4",
                    "country": "NG",
                    "name": "Heritage Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "MTN",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "415ae56f-24f9-476a-9f18-6a656b952db2",
                        "b7140c26-0c93-460b-85cf-bdb53af66ca0"
                    ],
                    "accountNumberType": "phone",
                    "id": "995eb625-e23b-4d0b-bd90-18ce44cc17a3",
                    "country": "GH",
                    "name": "MTN",
                    "countryAccountNumberType": "GHPHONE"
                },
                {
                    "code": "084",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "d1843b02-d571-4959-82ab-071ff0db237e",
                    "country": "NG",
                    "name": "Enterprise Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "261251",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "8607a7ba-c910-410c-a6b1-f73c425dd3b7",
                    "country": "ZA",
                    "name": "Rand Merchant Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "MTN",
                    "updatedAt": "2023-06-08T15:33:10.072Z",
                    "status": "active",
                    "channelIds": [
                        "edaec219-7559-421e-aa4c-267c3b018b64"
                    ],
                    "createdAt": "2023-03-22T18:07:08.974Z",
                    "accountNumberType": "phone",
                    "id": "1b23d4e3-e4eb-4cfe-adf1-3058721978de",
                    "country": "GH",
                    "name": "MTN Mobile Money",
                    "countryAccountNumberType": "GHPHONE"
                },
                {
                    "code": "GLO",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "415ae56f-24f9-476a-9f18-6a656b952db2",
                        "2cb75e87-7a02-48cb-bee8-93f38b96dbc9"
                    ],
                    "accountNumberType": "phone",
                    "id": "e981768b-19b3-4ef5-ad03-a2195f0d87df",
                    "country": "GH",
                    "name": "Glo",
                    "countryAccountNumberType": "GHPHONE"
                },
                {
                    "code": "232",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "8e1bd085-5ed0-4adf-a16d-be819e599940",
                    "country": "NG",
                    "name": "Sterling Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "AIR",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "415ae56f-24f9-476a-9f18-6a656b952db2",
                        "2cb75e87-7a02-48cb-bee8-93f38b96dbc9"
                    ],
                    "accountNumberType": "phone",
                    "id": "fff0ac9b-b870-4270-ac96-0f57602f9b2f",
                    "country": "GH",
                    "name": "AirtelTigo",
                    "countryAccountNumberType": "GHPHONE"
                },
                {
                    "code": "587000",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "20ce6610-b6ce-4896-844c-cc51a6cbeca4",
                    "country": "ZA",
                    "name": "Hsbc Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "AIRTEL_OAPI_ZMB",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "b1fcd635-3231-435a-9c57-ef954751b0c6",
                        "a57cf139-fdae-4cb4-b614-92e1fb13eea6"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T16:59:32.789Z",
                    "id": "20823163-f55c-4fa5-8cdb-d59c5289a137",
                    "country": "ZM",
                    "name": "Airtel",
                    "countryAccountNumberType": "ZMPHONE"
                },
                {
                    "code": "Mobile Wallet",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "79da4d6e-1c42-4aac-ae7d-422730528f96",
                        "9c2a8aa3-0de6-4409-bd20-6363884e927e"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T16:59:32.789Z",
                    "id": "cc2883ed-e431-444d-9264-8b7c1684b998",
                    "country": "CM",
                    "name": "Mobile Wallet",
                    "countryAccountNumberType": "CMPHONE"
                },
                {
                    "code": "044",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "5f1af11b-305f-4420-8fce-65ed2725a409",
                    "country": "NG",
                    "name": "Access Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "430000",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "ad54749f-be0c-45ec-9a77-edfa3848099e",
                    "country": "ZA",
                    "name": "African Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "800000",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "d12062c8-6ed7-479a-80cd-ebbff16ef1b4",
                    "country": "ZA",
                    "name": "Albaraka Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "432000",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "dd16186e-9fc4-4537-a59f-91686c6413fa",
                    "country": "ZA",
                    "name": "Jp Morgan Chase Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "AIRTEL_UGANDA",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "46cf71c9-42c9-4815-8f1f-12989296aadf",
                        "4a5e6cec-a02e-47a3-8b2f-071a5c50be64"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T17:03:11.214Z",
                    "id": "04a3083a-567c-4a2b-aa39-fa8f19e64341",
                    "country": "UG",
                    "name": "Airtel Mobile Money",
                    "countryAccountNumberType": "UGPHONE"
                },
                {
                    "code": "490991",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "d79e89b6-ca84-4bf2-aed7-c48e297c2f22",
                    "country": "ZA",
                    "name": "Mtn Banking",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "082",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "125df772-0bd9-4ad2-8b10-ff377f8cfad1",
                    "country": "NG",
                    "name": "Keystone Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "679000",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "0941a3e5-6f9a-4e93-83b0-72de9a34d82b",
                    "country": "ZA",
                    "name": "Bidvest Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "032",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "fa316206-dacc-4e87-a80a-5f539a719c56",
                    "country": "NG",
                    "name": "Union Bank of Nigeria",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "035",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "135e8f0b-3c9a-404c-9b98-65c4d3af4d0f",
                    "country": "NG",
                    "name": "Wema Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "632005",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "7c56fe9b-e36f-4c0b-9baa-d734b8633dff",
                    "country": "ZA",
                    "name": "Absa Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "462005",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "09c5d41b-e062-4b2f-b031-818732337358",
                    "country": "ZA",
                    "name": "Old Mutual",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "470010",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "d80b8a29-c084-4624-8f89-3339be2161eb",
                    "country": "ZA",
                    "name": "Capitec Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "214",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "600a5df5-c28c-435c-b3be-19dbed0ee402",
                    "country": "NG",
                    "name": "First City Monument Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "790005",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "70b4c91a-0dfd-457c-8604-10fa28fcb00d",
                    "country": "ZA",
                    "name": "Unibank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "MTN_UGANDA",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "46cf71c9-42c9-4815-8f1f-12989296aadf",
                        "4a5e6cec-a02e-47a3-8b2f-071a5c50be64"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T17:03:11.214Z",
                    "id": "9916cc93-1925-4e67-bf55-962e9eab24da",
                    "country": "UG",
                    "name": "MTN Mobile Money",
                    "countryAccountNumberType": "UGPHONE"
                },
                {
                    "code": "584000",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "856ae78b-e29c-45d4-bc17-7988dc0bfbbb",
                    "country": "ZA",
                    "name": "Grinrod Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "033",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "75faa922-8a18-4c54-a357-6d6a670379a3",
                    "country": "NG",
                    "name": "United Bank for Africa",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "updatedAt": "2023-06-08T15:48:04.015Z",
                    "status": "active",
                    "channelIds": [
                        "aa11c087-d0c8-4f8d-b566-3625a7581a1f",
                        "218a9dfe-5031-46c9-a0a7-1a578cfb2f2d",
                        "1239227d-f33a-4d7a-8520-0a0cf41988fb",
                        "5ff735fb-c0e5-4828-9c03-1bb189de5622",
                        "ddc30e71-58e4-4bb4-a22b-ef0293f176e4",
                        "65a69867-81e2-44c7-a97b-fcaaf5f38359",
                        "1937a7bd-c9c3-4ed9-b74e-ac11c97ef104",
                        "b7140c26-0c93-460b-85cf-bdb53af66ca0",
                        "5feda1af-f05e-413f-a472-ab587fe31480",
                        "3dea1c86-f4cc-4d12-8144-0bd17aa56806",
                        "1a57c6c1-5cc4-421a-8a39-b7818467e765",
                        "019c78ad-33bd-48ec-851e-076c4e5d64af",
                        "993f9ce7-f5ab-47f0-9ded-1169b25d8ae0",
                        "08a80804-0fe7-486d-bce0-ead90ee3b409",
                        "08a80804-0fe7-486d-bce0-ead90ee3b409",
                        "0a9df144-564e-474e-a920-2f636000c4ce",
                        "6fef21a2-b8f3-4515-bef5-63597ea0307f",
                        "05ec29bc-a6c0-4045-8ef1-8701fa991d12"
                    ],
                    "createdAt": "2022-12-19T00:50:34.598Z",
                    "accountNumberType": "bank",
                    "id": "28281f21-4705-431f-a752-9a485628c76a",
                    "country": "ALL",
                    "name": "Manual Input",
                    "countryAccountNumberType": "ALLBANK"
                },
                {
                    "code": "51001",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "8372b386-cfeb-4f14-8aab-2cd3729c4869",
                    "country": "ZA",
                    "name": "Standard Bank (South Africa)",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "580105",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "beb8b374-5f59-4afd-8133-10c08294fa0c",
                    "country": "ZA",
                    "name": "Investec Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "076",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "6ef18cb4-1c34-4129-84c4-e626a6a73d10",
                    "country": "NG",
                    "name": "Skye Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "050",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "754202b6-da04-5f18-a86a-e5b2dd86bbb5",
                    "country": "NG",
                    "name": "Ecobank Nigeria",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "410506",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "2688c2a6-2903-41de-b512-77ae1946850b",
                    "country": "ZA",
                    "name": "Bank of Athens",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "215",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "5dcfa62b-5cfa-4e59-aae4-95f7fecdeaa6",
                    "country": "NG",
                    "name": "Unity Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "063",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "b1a1bf8a-15fa-4454-a0fa-38a813a56c5a",
                    "country": "NG",
                    "name": "Diamond Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "590000",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "b747826c-1384-42a1-9eaf-c1b47e0d675d",
                    "country": "ZA",
                    "name": "Barclays Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "023",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "d5212d1c-e9bb-4db6-8dc0-aefe3a925a65",
                    "country": "NG",
                    "name": "Citibank Nigeria",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "280061",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "6a67c771-bc70-4ca2-a1e3-de633fb44507",
                    "country": "ZA",
                    "name": "First National Bank Lesotho",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "460005",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "5cf565d5-cf10-473d-8586-b713383cfe99",
                    "country": "ZA",
                    "name": "SA Post Bank (Post Office)",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "068",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "98b219a0-2f80-4f2a-9d7d-487d348f9ea4",
                    "country": "NG",
                    "name": "Standard Chartered Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "678910",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "6e06071b-86ef-44f7-b052-e6dab3383be1",
                    "country": "ZA",
                    "name": "Tyme Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "VOD",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "415ae56f-24f9-476a-9f18-6a656b952db2",
                        "2cb75e87-7a02-48cb-bee8-93f38b96dbc9"
                    ],
                    "accountNumberType": "phone",
                    "id": "a84f929b-7b0a-475f-b735-db8feba4fe8e",
                    "country": "GH",
                    "name": "Vodafone",
                    "countryAccountNumberType": "GHPHONE"
                },
                {
                    "code": "431010",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "97641d84-6b7c-405c-8aa2-5795758af247",
                    "country": "ZA",
                    "name": "Ubank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "280164",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "f88442aa-acda-4bbf-863a-ce4f14bee064",
                    "country": "ZA",
                    "name": "First National Bank Swaziland",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "250655",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "dc9beb81-3398-4dc1-bc84-70cc7c61b5fc",
                    "country": "ZA",
                    "name": "First National Bank (South Africa)",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "222026",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "23031ff8-896e-48c1-8181-97e8afd7eaf8",
                    "country": "ZA",
                    "name": "RMB Private Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "410506",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "0e718e23-d176-48da-893d-610ada51fbd5",
                    "country": "ZA",
                    "name": "South African Bank of Athens Limited",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "588000",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "d6489301-247f-4c7e-930f-440549aaf250",
                    "country": "ZA",
                    "name": "Vbs Mutual Bank",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "M PESA",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "8618a32a-4080-426f-b474-b4ca740bfd0a",
                        "cebda160-9966-4485-8d36-6205d516b050",
                        "6bf61778-3bee-4e39-bdc6-b0f1087b843f",
                        "71700f34-c42a-4b61-96a4-db79f6d5684b"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T16:59:32.789Z",
                    "id": "7ea6df5c-6bba-46b2-a7e6-f511959e7edb",
                    "country": "KE",
                    "name": "Mobile Wallet",
                    "countryAccountNumberType": "KEPHONE"
                },
                {
                    "code": "070",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "d2bbb2b8-0db8-4b33-bd7e-3fe792839fb7",
                    "country": "NG",
                    "name": "Fidelity Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "679000",
                    "updatedAt": "2023-09-25T14:48:05.578Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.578Z",
                    "accountNumberType": "bank",
                    "id": "572e73ba-890d-4320-abca-fa8e73cddb09",
                    "country": "ZA",
                    "name": "Discovery Bank Limited",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "683000",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "8d198bdb-e007-4646-b945-48192a91dc79",
                    "country": "ZA",
                    "name": "Sasfin Bank Limited",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "980172",
                    "updatedAt": "2023-09-25T14:48:05.577Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:48:05.577Z",
                    "accountNumberType": "bank",
                    "id": "64e2e540-cad7-4a0d-8a36-866009a1fc0c",
                    "country": "ZA",
                    "name": "Bank Of Namibia",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "011",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "790567b6-da04-5f18-a86a-e5b2dd86bbb5",
                    "country": "NG",
                    "name": "First Bank of Nigeria",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "801000",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "3e5cc193-e17d-40b2-ba77-44a8ca095c34",
                    "country": "ZA",
                    "name": "State Bank Of India",
                    "countryAccountNumberType": "ZABANK"
                },
                {
                    "code": "014",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "fe8f4989-3bf6-41ca-9621-ffe2bc127569"
                    ],
                    "accountNumberType": "bank",
                    "id": "d659aee4-674a-40dc-b5b3-31387d4b5d1c",
                    "country": "NG",
                    "name": "Mainstreet Bank",
                    "countryAccountNumberType": "NGBANK"
                },
                {
                    "code": "Mobile Wallet",
                    "updatedAt": "2023-06-08T15:18:44.135Z",
                    "status": "active",
                    "channelIds": [
                        "656d4e72-7849-4fd6-b0a0-8631c8adf704"
                    ],
                    "accountNumberType": "phone",
                    "createdAt": "2023-03-22T16:59:32.789Z",
                    "id": "7692c976-15ee-41fc-a8d2-0d74afc4a16a",
                    "country": "TZ",
                    "name": "Mobile Wallet",
                    "countryAccountNumberType": "TZPHONE"
                },
                {
                    "code": "460005",
                    "updatedAt": "2023-09-25T14:50:51.758Z",
                    "status": "active",
                    "channelIds": [
                        "81018280-e320-4c81-9b2f-6f636c2239d8"
                    ],
                    "createdAt": "2023-09-25T14:50:51.758Z",
                    "accountNumberType": "bank",
                    "id": "8b4514c1-c472-4a66-9390-af634d72d46b",
                    "country": "ZA",
                    "name": "Postbank",
                    "countryAccountNumberType": "ZABANK"
                }
            ],
            "dateTime": "2024-05-12T08:55:31.5161597Z"
        };


        customerTypesResponse  =  [
                "retail",
                "institution"
            ];

        if(channelsResponse?.statusCode == 200){
            // console.log("Channels : ",channelsResponse?.data)
            reloadTransactionTypes();
            reloadChannels();
        }

        if(customerTypesResponse.length > 0){
            reloadCustomerTypes();

        }

        if(networksResponse?.statusCode == 200){
            reloadNetworks()
        }
        // console.log("the transactionType for this", tr);
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
        inputField.value  = "";
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
            $("#retail_customer_type").removeClass("d-none");
            $("#institution_customer_type").addClass("d-none");
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