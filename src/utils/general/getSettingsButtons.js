'use strict';

const Markup = require('telegraf/markup');

module.exports = (ctx, user) => {
    try {
        let buttons = [];
        
        if (!user.to_sticker) {
            buttons = [
                [
                    Markup.callbackButton(ctx.i18n.t('button.language'), `language`),
                    Markup.callbackButton(ctx.i18n.t('button.service'), `service`)
                ],
                [Markup.callbackButton(ctx.i18n.t('button.to_sticker', { state: user.to_sticker ? ctx.i18n.t('action.a_on') : ctx.i18n.t('action.a_off') }), `to_sticker`)]
            ];
        } else {
            buttons = [
                [
                    Markup.callbackButton(ctx.i18n.t('button.language'), `language`),
                    Markup.callbackButton(ctx.i18n.t('button.service'), `service`)
                ],
                [Markup.callbackButton(ctx.i18n.t('button.to_sticker', { state: user.to_sticker ? ctx.i18n.t('action.a_on') : ctx.i18n.t('action.a_off') }), `to_sticker`)],
                // [Markup.callbackButton(
                //     ctx.i18n.t('button.add_text', { 
                //         state: user.add_text ? ctx.i18n.t('action.a_on') : ctx.i18n.t('action.a_off') 
                //     }),
                //     'add_text'
                // )],
            ];
        }

        return buttons;
    } catch (err) {
        console.error(err);
    }
};