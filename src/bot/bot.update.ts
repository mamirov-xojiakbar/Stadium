import { log } from 'console';
import { Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    ctx.reply(`${ctx.from.first_name} salom Alekum`);
  }

  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    if ('photo' in ctx.message) {
      log(ctx.message.photo);
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
      );
    }
  }

  @On('video')
  async onVideo(@Ctx() ctx: Context) {
    if ('video' in ctx.message) {
      log(ctx.message.video);
      await ctx.reply(String(ctx.message.video.file_name));
    }
  }

  @On('sticker')
  async onSticker(@Ctx() ctx: Context) {
    if ('sticker' in ctx.message) {
      log(ctx.message.sticker);
      await ctx.reply('🖕');
    }
  }

  @On('animation')
  async onAnimation(@Ctx() ctx: Context) {
    if ('animation' in ctx.message) {
      log(ctx.message.animation);
      await ctx.reply('🖕');
    }
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    if ('contact' in ctx.message) {
      log(ctx.message.contact);
      await ctx.reply(String(ctx.message.contact.phone_number));
      await ctx.reply(String(ctx.message.contact.first_name));
      await ctx.reply(String(ctx.message.contact.user_id));
    }
  }

  @On('location')
  async onLocation(@Ctx() ctx: Context) {
    if ('location' in ctx.message) {
      log(ctx.message.location);
      await ctx.reply(String(ctx.message.location.latitude));
      await ctx.reply(String(ctx.message.location.longitude));
      await ctx.replyWithLocation(
        ctx.message.location.latitude,
        ctx.message.location.longitude,
      );
    }
  }

  @On('invoice')
  async onInvoice(@Ctx() ctx: Context) {
    if ('invoice' in ctx.message) {
      log(ctx.message.invoice);
      await ctx.reply(String(ctx.message.invoice.title));
    }
  }

  @On('document')
  async onDocument(@Ctx() ctx: Context) {
    if ('document' in ctx.message) {
      log(ctx.message.document);
      await ctx.reply(String(ctx.message.document.file_name));
    }
  }

  @Hears('hi')
  async hearsHi(@Ctx() ctx: Context) {
    await ctx.reply("Hey there");
  }

  @Command('help')
  async helpCommand(@Ctx() ctx: Context){
    await ctx.reply("Koooop narsa oqidim deb tasavur qil🍑")
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    log(ctx);
    if ('text' in ctx.message) {
      if (ctx.message.text == 'salom') {
        await ctx.replyWithHTML('<b>Hello</b>');
      } else {
        await ctx.replyWithHTML(`<b>Tog'ri ${ctx.message.text}</b>`);
      }
    }
  }


  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    log(ctx.botInfo);
    log(ctx.chat);
    log(ctx.chat.id);
    log(ctx.from);
    log(ctx.from.first_name);
  }
}
