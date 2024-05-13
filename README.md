# Payment-Integration
This exercise is to integrate yellow card payment api in a demo application 

API Documentation
1. Get Supported Countries (GET /countries)
Description: This endpoint retrieves a list of countries and their ISO 3166 code supported by the system.
Returns: A ResponseRecord object containing the list of countries.

2. Get Supported Channels by Country (GET /channels)
Description: This endpoint retrieves a list of active payment channels supported by a specific country.
Parameters:
country (optional): A string representing the two-letter ISO code of the country. Defaults to an empty string.
Returns: A ResponseRecord object containing the list of supported channels for the specified country.

3. Get Customer Types (GET /customer-types)
Description: This endpoint retrieves a list of available customer types within the system.
Returns: A list containing all available CustomerType enum values.

4. Get Supported Networks by Channel (GET /networks)
Description: This endpoint retrieves a list of payment networks.
Parameters:
channelId (optional): A string representing the unique identifier of the channel. Defaults to an empty string.
Returns: A ResponseRecord object containing the list of supported networks for the specified channel.

5. Validate Recipient Account (POST /validate)
Description: This endpoint validates the recipient's account details before submitting a payment request.
Parameters:
prDestinationDTO: A PRDestinationDTO object containing the recipient's account information (structure depends on the specific implementation).
Returns: A ResponseRecord object containing the validation response (success/failure and additional details).

6. Submit Payment Request (POST /submit)
Description: This endpoint submits a payment request for approval.
Parameters:
paymentRequestDTO: A PaymentRequestDTO object containing all the necessary details for the payment request (structure depends on the specific implementation).
Returns: A ResponseRecord object containing the response to the submission (success/failure and additional details).

7. Find Transactions for Approval (GET /transactions)
Description: This endpoint retrieves a list of transactions from the local database that require approval.
Parameters:
search: A Map<String, String> containing search criteria for filtering transactions (details might depend on the specific implementation).
Returns: A ResponseRecord object containing the list of transactions for approval.

8. Approve or Deny Payment Request (POST /approve)
Description: This endpoint approves or denies a previously submitted payment request.
Parameters:
sequenceId: A string representing the unique identifier of the payment request.
accept (optional): A boolean value indicating approval (true) or denial (false) of the request. Defaults to false.
Returns: A ResponseRecord object containing the response to the approval/denial action (success/failure and potentially additional details).


Challenges with Payment Integration
Error responses are not explicilty understood which makes debugging dificult
