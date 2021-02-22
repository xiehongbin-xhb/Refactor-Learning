// Extract Function
// rename variables

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
function amountFor(aPerformace) {
  let result = 0;
  switch (playFor(aPerformance).type) {
    case "tragedy":
      result = 40000;
      if (aPerformace.auduience > 30) {
        result += 1000 * (aPerformace.auduience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformace.auduience > 20) {
        result += 10000 + 500 * (aPerformace.auduience - 20);
      }
      result += 300 * aPerformace.auduience;
      break;
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}

function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
  return result;
}
function statement(invoice, plays) {
  let totalAmout = 0;
  
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)}(${perf.auduience}seats)\n`;
    totalAmout += amountFor(perf);
  }

  result += `Amount owe is ${usd(totalAmout)}\n`;
  result += `you earned ${totalVolumeCredits()} credits\n`;
  return result;
}
function usd(aNumber) {
  // 对返回的数据进行格式化，取2位小数， 加上 美元符号
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', currency: "USD",
    minimumIntegerDigits: 2
  }).format(aNumber / 100)
}
function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    
  }
}