module.exports = (req, res, next) => {
  res.render('index/index', {
    page: 'index/index',
    title: 'Ana Sayfa'
  });
}
