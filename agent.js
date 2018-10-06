'use strict';

const start = require('./lib/alinode')

module.exports = agent => {
  const active = start(agent)
  if (!active) {
    agent.messenger.on('alinode-run', asyncConfig => {
      start(agent, asyncConfig);
    });
  }
};
