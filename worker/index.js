const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function geometricSequence(k) {
  return 1 * Math.pow(3, k);
}

sub.on('message', (channel, k) => {
  redisClient.hset('kValues', k, [geometricSequence(k), Date.now()].toString());
});
sub.subscribe('insert');
