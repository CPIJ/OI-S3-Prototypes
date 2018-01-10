module.exports = () => {
    Number.prototype.map = function (start1, stop1, start2, stop2) {
        return ((this - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    }
}