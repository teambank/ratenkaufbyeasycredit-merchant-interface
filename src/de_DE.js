export default {
  get (key) {
    return this.de[key] ? this.de[key] : key
  },
  de: {
    Shipping: 'Lieferung',
    'Cancelled (completely)': 'Widerruf (vollständig)',
    'Cancelled (partially)': 'Widerruf (teilweise)',
    'Return (Warranty)': 'Rückgabe (Garantie / Gewährleistung)',
    'Abatement (Warranty)': 'Minderung (Garantie / Gewährleistung)',
    Refund: 'Rückabwicklung',
    Waiting: 'Wartend',
    Refunded: 'Rückerstattet',
    'Report Shipping': 'Lieferung melden',
    'In Clearing': 'in Abrechnung',
    Cleared: 'Abgerechnet',
    Customer: 'Kunde',
    'Customer No': 'Kundennummer',
    'Credit Account No': 'Kreditkontonummer',
    'Transaction Id': 'Vorgangskennung',
    'Order Amount': 'Bestellwert',
    Order: 'Bestellung',
    Clearing: 'Abrechnung',
    'n/a': 'nicht verfügbar',
    'Please select ...': 'Bitte wählen ...',
    'Reduction by': 'Minderung um',
    'Tracking number (Shipping)': 'Trackingnummer (Versanddienstleister)',
    'Revocation': 'Widerruf',
    'Partial Revocation': 'Widerruf (teilweise)',
    'Refund (Guarantee / Warranty)': 'Erstattung (Garantie / Gewährleistung)',
    'Reduction (Guarantee / Warranty)': 'Minderung (Garantie / Gewährleistung)'
  }
}
