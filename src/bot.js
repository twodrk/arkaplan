const Telegraf = require('telegraf');
const config = require('./config');
const bot = new Telegraf(config.token, { handlerTimeout: config.handler_timeout });

const rateLimit = require('telegraf-ratelimit')
const session = require('telegraf/session');

const path = require('path');
const TelegrafI18n = require('telegraf-i18n');
const i18n = new TelegrafI18n({
    directory: path.resolve(__dirname, './locales'),
    defaultLanguage: 'en',
    defaultLanguageOnMissing: true
});

const connect = require('./database/connect');
const resetTokens = require('./utils/database/resetTokens');
const {
    handleStart,
    handleCallback,
    handleSettings,
    handleLanguage,
    handleBack,
    handleProcessMedia,
    handleToSticker,
    handleProcessText,
    handleChangeService,
    handleReset,
    handleStatistics,
    handleProcessFileId
} = require('./handlers');

bot.use(i18n.middleware());
bot.use(session());
bot.use(rateLimit(require('./config').limit));
bot.context.getString = require('./utils/general/getString');

bot.start(handleStart());

bot.on('photo', handleProcessMedia());
bot.on('document', handleProcessMedia());

bot.command('settings', handleSettings());
bot.command('reset', handleReset());
bot.command('stats', handleStatistics());
// bot.command('history', handleHistory());

bot.action('to_sticker', handleToSticker());
bot.action('service', handleChangeService());
bot.action(/change_service:(.*)/, handleChangeService());
bot.action('language', handleLanguage());
bot.action(/set_lang:(.*)/, handleLanguage());
bot.action(/back:(.*)/, handleBack());
bot.action('yes', handleReset());
bot.action('no', handleReset());

bot.hears(config.buttons, handleSettings());
bot.hears(/file_id/, handleProcessFileId());

bot.on('text', handleProcessText());
bot.on('callback_query', handleCallback());

bot.launch().then(async () => {
    console.log('[Bot] I have been started');
    await connect();
    await resetTokens();
});