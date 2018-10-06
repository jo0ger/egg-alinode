'use strict';

const start = require('./lib/alinode');

module.exports = agent => {
  agent.messenger.on('alinode-run', asyncConfig => {
    start(agent, asyncConfig);
  });
};
