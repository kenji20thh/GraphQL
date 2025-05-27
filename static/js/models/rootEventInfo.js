const overview_query = `query overview($userId: Int!, $rootEventId: Int!) {
  level: transaction(
    limit: 1
    order_by: {amount: desc}
    where: {userId: {_eq: $userId}, type: {_eq: "level"}, eventId: {_eq: $rootEventId}}
  ) {
    amount
  }
}`;

export class overview {
  #level = 0;
  get level() {
    return this.#level;
  }
  set level(v) {
    this.#level = v[0].amount;
  }
}
