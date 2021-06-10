# ratenkauf by easyCredit Transaction Manager

The ratenkauf by easyCredit Transaction Manager enables merchants to manage payment transactions from any eCommerce store backend. It is integrated as backend widget and shipped as part of the store plugins for the following eCommerce systems:

* Magento 1
* Magento 2
* Shopware 5
* Shopware 6
* wooCommerce

# Getting started

Download one of the mentioned plugins and both, the transaction manager and the status widget, will be already integrated.

# Usage / Integration

**If you use one of the eCommerce systems mentioned above, just install the corresponding plugin and stop reading.** If you want to integrate the widget in a new system, read on.

The transaction manager and the status widget are built as a single [Vue.js](https://vuejs.org/) app and can be used in any website by adding an HTML tag and endpoints for the transaction management.

## General Configuration

To get the transactions from the eCommerce system the system needs to offer a transaction endpoint implemented as REST API. Authentication can be implemented using the `request_config` parameter which is passed to [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options). 
The specified endpoints need to authenticate with ratenkauf by easyCredit internally. 

    <script>
    var ratenkaufbyeasycreditOrderManagementConfig = {
      endpoints: {
        get: 'https://url.to/wp-json/easycredit/v1/transaction',
        list: 'https://url.to/wp-json/easycredit/v1/transactions',
        post: 'https://url.to/wp-json/easycredit/v1/transaction'
      },
      request_config: {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 12345678' // possibly needed for authentication
        }
      }
    }
    </script>

## Transaction Manager

To add the transaction manager use the following custom tag:

<img src="https://raw.githubusercontent.com/teambank/ratenkaufbyeasycredit-merchant-interface/master/examples/easycredit-merchant-manager.png" alt="Transaction manager component" width="400">

```
<easycredit-merchant-manager id="VF12345" date="2021-01-01" />
```

## Status Widget

To add the status widget use the following custom tag:

<img src="https://raw.githubusercontent.com/teambank/ratenkaufbyeasycredit-merchant-interface/master/examples/easycredit-merchant-status-widget.png" alt="Status Widget component" width="400">

```
<easycredit-merchant-status-widget id="VF12345" date="2021-01-01" />
```

Both widgets take the same arguments where as: 

* **id** is the id for the transaction ("Vorgangsnummer").
*  **date** is the transaction date. The date is used to determine the transaction state in comparison to the current date (> 1 day: "Waiting", < 1 day: "Not available").

# Building / Developing

The app can be built like any other [Vue.js](https://vuejs.org/) app:

    yarn install
    yarn run serve
    yarn run build

# License

* [MIT](https://opensource.org/licenses/MIT)

# Security
If you have discovered a security vulnerability, please email [opensource@teambank.de](mailto:opensource@teambank.de).
