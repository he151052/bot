const TelegramBot = require('node-telegram-bot-api');

// Lấy token từ biến môi trường hoặc sử dụng token mặc định (để thử nghiệm)
const token = process.env.TELEGRAM_BOT_TOKEN || '7568357254:AAG93FU-wPTekjavywIXfWFners-PsCGYKM'; // Thay bằng token bot của bạn
const bot = new TelegramBot(token, { polling: true });

let messageCount = 0;          // Số lượng tin nhắn đã đếm
let isCountingEnabled = true;  // Trạng thái bật/tắt đếm tin nhắn
let messageQueue = [];         // Hàng đợi tin nhắn
let isProcessingQueue = false; // Trạng thái xử lý hàng đợi

// Hàm xử lý tin nhắn trong hàng đợi
function processQueue() {
    if (isProcessingQueue || !isCountingEnabled || messageQueue.length === 0) return;

    isProcessingQueue = true;
    const msg = messageQueue.shift(); // Lấy tin nhắn đầu tiên trong hàng đợi
    messageCount++;

    // Gửi phản hồi với số đếm hiện tại
    bot.sendMessage(msg.chat.id, `ok tin ${messageCount}`).then(() => {
        isProcessingQueue = false;
        processQueue(); // Tiếp tục xử lý tin nhắn tiếp theo trong hàng đợi
    }).catch(() => {
        isProcessingQueue = false;
        processQueue(); // Nếu lỗi, tiếp tục với tin nhắn tiếp theo
    });
}

// Xử lý lệnh từ người dùng
bot.on('message', (msg) => {
    if (msg.text.toLowerCase() === 'stop') {
        isCountingEnabled = false;
        bot.sendMessage(msg.chat.id, 'Bot đã dừng đếm tin nhắn.');
        messageQueue = []; // Xóa hàng đợi khi dừng
        return;
    }

    if (msg.text.toLowerCase() === 'start') {
        isCountingEnabled = true;
        messageCount = 0; // Đặt lại số đếm về 0
        bot.sendMessage(msg.chat.id, 'Bot đã bắt đầu đếm tin nhắn từ 1.');
        return;
    }

    // Nếu đang bật đếm, thêm tin nhắn vào hàng đợi và xử lý
    if (isCountingEnabled) {
        messageQueue.push(msg);
        processQueue();
    }
});

//  token = '7568357254:AAG93FU-wPTekjavywIXfWFners-PsCGYKM'; // Thay 'YOUR_BOT_TOKEN' bằng token của bot từ BotFather

// const TelegramBot = require('node-telegram-bot-api');
// const token = '7568357254:AAG93FU-wPTekjavywIXfWFners-PsCGYKM'; // Thay bằng token bot của bạn
// const bot = new TelegramBot(token, { polling: true });

// let messageCount = 0;          // Số lượng tin nhắn đã đếm
// let isCountingEnabled = true;  // Trạng thái bật/tắt đếm tin nhắn
// let messageQueue = [];         // Hàng đợi tin nhắn
// let isProcessingQueue = false; // Trạng thái xử lý hàng đợi

// // Hàm xử lý tin nhắn trong hàng đợi
// function processQueue() {
//     if (isProcessingQueue || !isCountingEnabled || messageQueue.length === 0) return;

//     isProcessingQueue = true;
//     const msg = messageQueue.shift(); // Lấy tin nhắn đầu tiên trong hàng đợi
//     messageCount++;

//     // Gửi phản hồi với số đếm hiện tại
//     bot.sendMessage(msg.chat.id, `ok tin ${messageCount}`).then(() => {
//         isProcessingQueue = false;
//         processQueue(); // Tiếp tục xử lý tin nhắn tiếp theo trong hàng đợi
//     }).catch(() => {
//         isProcessingQueue = false;
//         processQueue(); // Nếu lỗi, tiếp tục với tin nhắn tiếp theo
//     });
// }

// // Xử lý lệnh từ người dùng
// bot.on('message', (msg) => {
//     if (msg.text.toLowerCase() === 'stop') {
//         isCountingEnabled = false;
//         bot.sendMessage(msg.chat.id, 'Bot đã dừng đếm tin nhắn.');
//         messageQueue = []; // Xóa hàng đợi khi dừng
//         return;
//     }

//     if (msg.text.toLowerCase() === 'start') {
//         isCountingEnabled = true;
//         messageCount = 0; // Đặt lại số đếm về 0
//         bot.sendMessage(msg.chat.id, 'Bot đã bắt đầu đếm tin nhắn từ 1.');
//         return;
//     }

//     // Nếu đang bật đếm, thêm tin nhắn vào hàng đợi và xử lý
//     if (isCountingEnabled) {
//         messageQueue.push(msg);
//         processQueue();
//     }
// });

