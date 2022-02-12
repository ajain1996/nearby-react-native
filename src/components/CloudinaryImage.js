export const handleImageCloud = async (imageAdd, successCallBack) => {
  // console.log("this is image add >>>>>>",imageAdd)

  try {
    console.log(imageAdd, 'handle image called');
    // console.log("handleUpload called")
    const data = new FormData();
    data.append('file', `${imageAdd}`);
    data.append('upload_preset', 'quinkpost');
    data.append('cloud_name', 'Quink-Post');
    console.log('before cloud post');

    fetch('https://api.cloudinary.com/v1_1/quink-post/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'this is data from cloudinakdfj');
        // setimage(data.secure_url);
        // localStorage.setItem("sjdgsjd", JSON.stringify(data.url));
        // const temp = { Image: data.url, Title: title };
        // localStorage.setItem("Values", JSON.stringify(temp));
        // setPreView(data.url);

        successCallBack(data.secure_url);
      })
      .catch(e => console.log(e, 'error from the n catch'));
  } catch (e) {
    console.log(e, 'error while sending in cloudinary');
  }
};
