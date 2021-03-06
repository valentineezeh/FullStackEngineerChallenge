/* eslint-disable no-shadow */
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
import config from './config';
import serviceLocator from '../lib/service_location';
import EmployeeController from '../controllers';
import EmployeeService from '../services/employeeService';

const winston = require('winston');
require('winston-daily-rotate-file');

dotenv.config();

/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => {

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),

    defaultMeta: { service: 'employee-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' })

    ]
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  return logger;
});

/**
 * Returns a Mongo connection instance.
 */

serviceLocator.register('mongo', () => {
  const connectionString = process.env.NODE_ENV !== 'production' ? process.env.MONGO_DB_URL_TEST : config.mongoDb.url;
  mongoose.Promise = bluebird;
  const mongo = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  mongo.then(() => {
    console.log('Mongo Connection Established', connectionString);
  }).catch((err) => {
    console.log('Mongo Connection disconnected');
    process.exit(1);
  });

  return mongo;
});

/**
 * Creates an instance of the gateway Service
 */
serviceLocator.register('EmployeeService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongoclient = servicelocator.get('mongo');
  return new EmployeeService(logger, mongoclient);
});


/**
 * Creates an instance of the gateway Controller
 */
serviceLocator.register('EmployeeController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const EmployeeService = servicelocator.get('EmployeeService');
  return new EmployeeController(
    logger, EmployeeService
  );
});

const serviceLocate = serviceLocator;

export default serviceLocate;
