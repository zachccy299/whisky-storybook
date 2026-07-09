const sharp = require('sharp');
const fs = require('fs');
const dir = 'public/whiskyprocessimage';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.startsWith('c_'));
console.log('找到', files.length, '張圖片，開始壓縮...');
Promise.all(files.map(f => 
  sharp(dir+'/'+f)
    .resize(1200, null, {withoutEnlargement: true})
    .jpeg({quality: 70})
    .toFile(dir+'/c_'+f)
    .then(() => console.log('完成:', f))
)).then(() => console.log('全部壓縮完成！'));
