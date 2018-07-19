const TelegramBot   = require('node-telegram-bot-api')
const Bithumb       = require('./exchange/Bithumb')
const TOKEN         = ''

const bot = new TelegramBot(TOKEN, { polling: true })
const bithumb = new Bithumb()

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, '<< 빗썸 코인 거래하기 >>', {
      reply_markup: {
        keyboard: [['현재가']]
      }
    })
})

bot.onText(/현재가/, async msg => {
    try {      
        const bithumb_ticker = await bithumb.ticker()
    
        let text = '<< 코인 가격 >> \n'
        const options = {
            parse_mode : 'MarkDown',
            reply_markup : {
                keyboard : []
            }
          }
    
        Object.keys(bithumb_ticker).forEach(key => {
            if (key == 'date') return
            if (!(key == 'BTC' || key == 'ETH')) return

            text += `${key} : ${bithumb_ticker[key].buy_price} 원 \n`;
            options.reply_markup.keyboard.push([
                { text: `${key} 코인 사기 (아직 미구현 ㅠㅠ)`, callback_data: key }
            ])
        })
        bot.sendMessage(msg.chat.id, text, options)
    } catch (err) {
        console.error(err);
    }
})

bot.on('message', (msg) => {
    var Hi = "안녕"
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.from.id, `Hello,  ${msg.from.first_name}`);
    }
    var bye = "바이"
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, `Have a nice day,  ${msg.from.first_name}`);
    }
})
