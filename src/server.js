import { Server, Model } from 'miragejs'

export function makeServer({ environment = "development" } = {}) {

let server = new Server({
  environment,

    models: {
      transaction: Model,
    },

  seeds(server) {
    server.create("transaction", {
      "kundennummer": "9496542688",
      "vorgangskennungFachlich": "TKRJ5T",
      "vorgangskennungShop": "4434.3852.1512",
      "kundeVorname": "Eimer",
      "kundeNachname": "privat",
      "kreditkontonummer": "9000967896",
      "bestelldatum": "2020-01-20",
      "bestellwertAktuell": 0,
      "haendlerstatusV2": "IN_ABRECHNUNG",
      "bestellwertUrspruenglich": 530.22,
      "widerrufenerBetrag": 530.22,
      "lieferdatum": "2020-01-30",
      "abrechnungsdatum": null,
      "rueckabwicklunngGebuchtAm": "2020-01-30",
      "rueckabwicklungEingegebenAm": "2020-01-30",
      "rueckabwicklungsdatum": "2020-01-30"
    })
    server.create("transaction", {
      "kundennummer": "9415819657",
      "vorgangskennungFachlich": "V314WJ",
      "vorgangskennungShop": "271",
      "kundeVorname": "Ralf",
      "kundeNachname": "Ratenkauf",
      "kreditkontonummer": "9604315238",
      "bestelldatum": "2020-08-18",
      "bestellwertAktuell": 603.95,
      "haendlerstatusV2": "LIEFERUNG_MELDEN",
      "bestellwertUrspruenglich": 603.95,
      "widerrufenerBetrag": 0,
      "lieferdatum": null,
      "abrechnungsdatum": null,
      "rueckabwicklunngGebuchtAm": null,
      "rueckabwicklungEingegebenAm": null,
      "rueckabwicklungsdatum": null
    })
  },

  routes() {

    this.namespace = "api"

    this.get("/transactions", schema => {
      return schema.transactions.all().models
    })
    
  },
  })

  return server
}
