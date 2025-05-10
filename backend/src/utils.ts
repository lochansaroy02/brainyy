

export const generateHash = (len: number) => {
    let options = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let optionLength = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * optionLength);
        ans += options[randomIndex];

    }
    return ans;
}
