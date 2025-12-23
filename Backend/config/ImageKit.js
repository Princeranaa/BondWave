const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  privateKey: process.env.privateKey, // This is the default and can be omitted
  publicKey: process.env.publicKey,
  urlEndpoint: process.env.urlEndpoint,
});

exports.uploadFile = async (file, fileName) => {
  const response = await imageKit.upload({
    file: file,
    fileName: fileName,
    folder: "BondWave"
  });
  return response;
};
