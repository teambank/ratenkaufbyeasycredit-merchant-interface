import {
  createServer,
  Model,
  Serializer
} from "miragejs"

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

export default function () {
  createServer({
    serializers: {
      application: Serializer.extend({
        keyForModel(modelName) {
          return modelName.split('-').map(a => a.capitalize()).join('');
        },
        keyForCollection(modelName) {
          return this.keyForModel(modelName);
        },
        keyForRelationship(modelName) {
          return modelName;
        }
      })
    },
    models: {
      TransactionList: Model,
    },
      seeds(server) {
        server.create("TransactionList", {"transactionId":"V3U141","status":"REPORT_CAPTURE","bookings":[],"customer":{"firstName":"Ralf","lastName":"Ratenkauf","customerNumber":"9915420238"},"creditAccountNumber":"9788122868","orderDetails":{"orderDate":"2021-11-22","currentOrderValue":589,"originalOrderValue":589},"refundDetails":[],"refundsTotalValue":0});
        server.create("TransactionList", {"transactionId":"V3UH4T","status":"REPORT_CAPTURE","bookings":[],"customer":{"firstName":"Kiril","lastName":"Petkov","customerNumber":"9767293303"},"creditAccountNumber":"9722780174","orderDetails":{"orderDate":"2021-11-22","currentOrderValue":578,"originalOrderValue":578},"refundDetails":[],"refundsTotalValue":0});
    },

    routes() {

      this.namespace = "api"

      this.get("/transactions", schema => {
        return schema.transactionLists.all()
      })
     
      this.post("/transaction", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return { success: true, attrs: attrs }
      })
    },
  })
}
