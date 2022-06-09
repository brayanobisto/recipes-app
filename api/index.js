//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
    //Las dietas se precargan en la base de datos
    Diet.bulkCreate([
      { name: 'gluten free' },
      { name: 'dairy free' },
      { name: 'vegetarian' },
      { name: 'lacto ovo vegetarian' },
      { name: 'pescatarian' },
      { name: 'vegan' },
      { name: 'fodmap friendly' },
      { name: 'paleolithic' },
      { name: 'primal' },
      { name: 'whole 30' },
    ])
      .then(() => console.log('The diets has been created in the database'))
      .catch((error) => console.log(error));
  });
});
