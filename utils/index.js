export const  checkImageUrl = (url) => {
    if(!url) return false;
    else{
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|gif|svg)$','i');
        return pattern.test(url);
    }
}