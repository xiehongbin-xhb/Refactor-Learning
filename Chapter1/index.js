function statement(invoice, plays) {
  let totalAmout = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style:'currencty', currency: 'USD', minimumFractionDigits: 2
  }).format;
  for(let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case "tragedy":
          thisAmount = 40000;
          if(perf.auduience > 30) {
            thisAmount += 1000 * (perf.auduience -30);
          }
          break;
      case "comedy":
        thisAmount = 30000;
        if(perf.auduience > 20) {
          thisAmount += 10000 + 500 * (perf.auduience - 20);
        }
        thisAmount += 300 * perf.auduience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    // add volume credits
    volumeCredits += Math.max(perf.auduience, 0);
    // add extra credit for every comedt attendees
    if("comedy" === play.type) volumeCredits += Math.floor(perf.auduience / 5);
    // print line for this order
    result += `${play.name}: ${format(thisAmount / 100)}(${perf.auduience}seats)\n`;
    totalAmout += thisAmount;
  }
  result += `Amount owe is ${format(totalAmout/100)}\n`;
  result += `you earned ${volumeCredits} credits\n`;
  return result;
}
const player = {
  "hamlet": { "name": "Hamlet", "type": "tragedy"},
  "as-like": { "name": "As You Like It", "type": "comedy"},
  "hamlet": { "name": "Othello", "type": "tragedy"}
}
const invoices = {
  "customer": "BigCo",
  "performaces": [
    {
      "playID": "hamlet",
      "audience": 55
    },
    {
      "playID": "as-like",
      "audience": 35
    },
    {
      "playID": "Othello",
      "audience": 40
    }
  ]
}

statement(invoices, player)